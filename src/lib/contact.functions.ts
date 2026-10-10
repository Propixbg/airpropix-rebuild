import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getContactConfig = createServerFn({ method: "GET" }).handler(async () => {
  return {
    siteKey: process.env["TURNSTILE_SITE_KEY"] ?? null,
    enabled: Boolean(
      process.env["TURNSTILE_SITE_KEY"] && process.env["TURNSTILE_SECRET_KEY"] && process.env["RESEND_API_KEY"],
    ),
  };
});

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
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export const sendInquiry = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => schema.parse(d))
  .handler(async ({ data }) => {
    // Step 1: environment variables
    const secret = process.env["TURNSTILE_SECRET_KEY"];
    const resendKey = process.env["RESEND_API_KEY"];
    if (!secret || !resendKey) {
      const missing = [!resendKey && "RESEND_API_KEY", !secret && "TURNSTILE_SECRET_KEY"].filter(Boolean);
      console.error("[contact] Missing Environment Variables", missing);
      return { success: false as const, status: 500, error: "Missing Environment Variables", details: missing as unknown };
    }

    // Step 2: Turnstile verification
    let turnstileResult: { success: boolean; "error-codes"?: string[] } & Record<string, unknown>;
    try {
      const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: data.token }),
      });
      turnstileResult = await verify.json();
    } catch (e) {
      console.error("[contact] Turnstile request failed", e);
      return { success: false as const, status: 502, error: "Turnstile verification failed", details: String(e) as unknown };
    }
    if (!turnstileResult.success) {
      console.error("[contact] Turnstile verification failed", turnstileResult);
      return { success: false as const, status: 403, error: "Turnstile verification failed", details: turnstileResult as unknown };
    }

    // Step 3: Resend
    const types = { photo: "Photo & Video", mapping: "Mapping", "3d": "3D", other: "Other" };
    const rows: [string, string][] = [
      ["Name", data.name],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Company", data.company || "—"],
      ["Project type", types[data.projectType]],
      ["Language", data.lang.toUpperCase()],
    ];
    const html = `<h2>New AirProPix Website Inquiry</h2><table>${rows
      .map(([k, val]) => `<tr><td><b>${k}</b></td><td>${esc(val)}</td></tr>`)
      .join("")}</table><p><b>Message</b></p><p style="white-space:pre-wrap">${esc(data.message)}</p>`;
    const text = rows.map(([k, val]) => `${k}: ${val}`).join("\n") + `\n\nMessage:\n${data.message}`;

    let res: Response;
    try {
      res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
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
      return { success: false as const, status: 502, error: "Resend API Error", details: String(e) as unknown };
    }
    if (!res.ok) {
      const raw = await res.text();
      let resendError: unknown = raw;
      try { resendError = JSON.parse(raw); } catch { /* keep text */ }
      console.error("[contact] Resend API Error", res.status, resendError);
      return { success: false as const, status: res.status, error: "Resend API Error", details: resendError };
    }
    return { success: true as const, status: 200 };
  });
