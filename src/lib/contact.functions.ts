import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { z } from "zod";

type EnvBindings = {
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
};

// Надеждно извличане на ключовете директно от Cloudflare Worker контекста или process.env
function getBindings(): EnvBindings {
  try {
    const request = getWebRequest();
    // Проверяваме дали Cloudflare предава env през контекста на заявката
    const cfEnv = (request as any)?.env || (globalThis as any)?.__env__;
    if (cfEnv && (cfEnv.TURNSTILE_SECRET_KEY || cfEnv.RESEND_API_KEY)) {
      return cfEnv;
    }
  } catch {
    // игнорираме грешката при липсващ уеб контекст
  }

  // Fallback към process.env ако всичко друго е празно
  const envSource = (typeof process !== "undefined" && process.env) ? process.env : {};
  return {
    TURNSTILE_SITE_KEY: envSource.TURNSTILE_SITE_KEY || envSource.VITE_TURNSTILE_SITE_KEY,
    TURNSTILE_SECRET_KEY: envSource.TURNSTILE_SECRET_KEY,
    RESEND_API_KEY: envSource.RESEND_API_KEY,
  };
}

export const getContactConfig = createServerFn({ method: "GET" }).handler(
  async () => {
    const bindings = getBindings();

    const siteKey = bindings.TURNSTILE_SITE_KEY;
    const secret = bindings.TURNSTILE_SECRET_KEY;
    const resend = bindings.RESEND_API_KEY;

    console.log("[contact] ENV CHECK", {
      hasSiteKey: Boolean(siteKey),
      hasSecret: Boolean(secret),
      hasResend: Boolean(resend),
    });

    return {
      siteKey,
      enabled: Boolean(siteKey && secret && resend),
    };
  },
);

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(3).max(40),
  company: z.string().trim().max(160).optional().default(""),
  projectType: z.enum(["photo", "mapping", "3d", "other"]),
  message: z.string().trim().min(1).max(5000),
  lang: z.enum(["bg", "en"]),
  token: z.string().min(1),
});

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c]!,
  );

type Result = {
  success: boolean;
  status: number;
  error?: string;
  details?: string;
};

const fail = (
  status: number,
  error: string,
  details: unknown,
): Result => ({
  success: false,
  status,
  error,
  details:
    typeof details === "string" ? details : JSON.stringify(details),
});

export const sendInquiry = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => schema.parse(d))
  .handler(async ({ data }): Promise<Result> => {
    // Step 1: Read bindings safely
    const bindings = getBindings();
    const siteKey = bindings.TURNSTILE_SITE_KEY;
    const secret = bindings.TURNSTILE_SECRET_KEY;
    const resendKey = bindings.RESEND_API_KEY;

    if (!siteKey || !secret || !resendKey) {
      const missing = [
        !siteKey && "TURNSTILE_SITE_KEY",
        !secret && "TURNSTILE_SECRET_KEY",
        !resendKey && "RESEND_API_KEY",
      ].filter(Boolean);

      console.error("[contact] Missing Environment Variables", {
        missing,
        hasSiteKey: Boolean(siteKey),
        hasSecret: Boolean(secret),
        hasResend: Boolean(resendKey),
      });

      return fail(
        500,
        "Missing Environment Variables",
        missing.join(", "),
      );
    }

    // Step 2: Verify Cloudflare Turnstile
    let turnstileResult: {
      success: boolean;
      "error-codes"?: string[];
    } & Record<string, unknown>;

    try {
      const verify = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            secret,
            response: data.token,
          }),
        },
      );

      turnstileResult = await verify.json();
    } catch (e) {
      console.error("[contact] Turnstile request failed", e);
      return fail(502, "Turnstile verification failed", String(e));
    }

    if (!turnstileResult.success) {
      console.error(
        "[contact] Turnstile verification failed",
        turnstileResult,
      );

      return fail(
        403,
        "Turnstile verification failed",
        turnstileResult,
      );
    }

    // Step 3: Prepare the email
    const types: Record<string, string> = {
      photo: "Photo & Video",
      mapping: "Mapping",
      "3d": "3D",
      other: "Other",
    };

    const rows: [string, string][] = [
      ["Name", data.name],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Company", data.company || "—"],
      ["Project type", types[data.projectType]],
      ["Language", data.lang.toUpperCase()],
    ];

    const html = `<h2>New AirProPix Website Inquiry</h2><table>${rows
      .map(
        ([k, val]) =>
          `<tr><td><b>${k}</b></td><td>${esc(val)}</td></tr>`,
      )
      .join("")}</table><p><b>Message</b></p><p style="white-space:pre-wrap">${esc(data.message)}</p>`;

    const text =
      rows.map(([k, val]) => `${k}: ${val}`).join("\n") +
      `\n\nMessage:\n${data.message}`;

    // Step 4: Send email through Resend
    let res: Response;

    try {
      res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "AirProPix Contact <noreply@airpropix.com>",
          to: ["contact@airpropix.com"],
          reply_to: data.email,
          subject: `New Inquiry from ${data.name}`,
          html,
          text,
        }),
      });
    } catch (e) {
      console.error("[contact] Resend request failed", e);
      return fail(502, "Resend API Error", String(e));
    }

    if (!res.ok) {
      const raw = await res.text();
      let resendError: unknown = raw;

      try {
        resendError = JSON.parse(raw);
      } catch {
        // Keep the original response text
      }

      console.error(
        "[contact] Resend API Error",
        res.status,
        resendError,
      );

      return fail(res.status, "Resend API Error", resendError);
    }

    return { success: true, status: 200 };
  });