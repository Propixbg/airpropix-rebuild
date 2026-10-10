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
    const secret = process.env["TURNSTILE_SECRET_KEY"];
    const resendKey = process.env["RESEND_API_KEY"];
    if (!secret || !resendKey) return { ok: false as const, reason: "not_configured" };

    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: data.token }),
    });
    const v = (await verify.json()) as { success: boolean };
    if (!v.success) return { ok: false as const, reason: "captcha" };

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

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env["RESEND_FROM"] ?? "Air Pro Pix <noreply@airpropix.com>",
        to: [process.env["CONTACT_TO"] ?? "contact@airpropix.com"],
        reply_to: data.email,
        subject: `New Inquiry from ${data.name} (${types[data.projectType]})`,
        html,
        text,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return { ok: false as const, reason: "send" };
    }
    return { ok: true as const };
  });
