import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, CheckCircle2 } from "lucide-react";
import { getContactConfig, sendInquiry } from "@/lib/contact.functions";
import type { Content, Lang } from "@/lib/content";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

type FKey = "name" | "email" | "phone" | "company" | "message" | "captcha";
type Vals = { name: string; email: string; phone: string; company: string; projectType: string; message: string };
type Status = "idle" | "sending" | "success" | "error";
const fieldCls =
  "w-full rounded-md border border-input bg-card px-4 py-3 text-base outline-none transition-colors focus:border-foreground aria-[invalid=true]:border-destructive";

export function ContactForm({ t, lang }: { t: Content; lang: Lang }) {
  const f = t.form;
  const getCfg = useServerFn(getContactConfig);
  const send = useServerFn(sendInquiry);
  const [cfg, setCfg] = useState<{ siteKey: string | null; enabled: boolean } | null>(null);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState<Partial<Record<FKey, string>>>({});
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

  useEffect(() => {
    getCfg().then(setCfg).catch(() => setCfg({ siteKey: null, enabled: false }));
  }, [getCfg]);

  useEffect(() => {
    if (!cfg?.siteKey || !widgetRef.current) return;
    const render = () => {
      if (!window.turnstile || !widgetRef.current || widgetId.current) return;
      widgetId.current = window.turnstile.render(widgetRef.current, {
        sitekey: cfg.siteKey,
        language: lang,
        callback: (tok: string) => setToken(tok),
        "expired-callback": () => setToken(""),
      });
    };
    if (window.turnstile) return render();
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = render;
    document.head.appendChild(s);
  }, [cfg, lang]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const v = Object.fromEntries(fd.entries()) as unknown as Vals;
    const errs: Partial<Record<FKey, string>> = {};
    for (const k of ["name", "email", "phone", "message"] as const) if (!v[k]?.trim()) errs[k] = f.required;
    if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) errs.email = f.invalidEmail;
    if (cfg?.enabled && !token) errs.captcha = f.captcha;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (!cfg?.enabled) {
      setStatus("error");
      setMsg(f.error);
      return;
    }
    setStatus("sending");
    try {
      const r = await send({
        data: {
          name: v.name, email: v.email, phone: v.phone, company: v.company ?? "",
          projectType: v.projectType as "photo", message: v.message, lang, token,
        },
      });
      if (r.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setMsg(r.reason === "captcha" ? f.captcha : f.error);
        window.turnstile?.reset(widgetId.current);
        setToken("");
      }
    } catch {
      setStatus("error");
      setMsg(f.error);
    }
  }

  if (status === "success")
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-xl border bg-card p-8">
        <CheckCircle2 className="text-gold" size={32} aria-hidden />
        <p className="font-display text-xl">{f.success}</p>
      </div>
    );

  const field = (name: FKey, label: string, type = "text", required = true, auto?: string) => (
    <div>
      <label htmlFor={`f-${name}`} className="mb-1.5 block text-sm font-medium">
        {label}
        {!required && <span className="text-muted-foreground"> ({f.optional})</span>}
      </label>
      <input
        id={`f-${name}`} name={name} type={type} autoComplete={auto} required={required}
        aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `e-${name}` : undefined}
        className={fieldCls}
      />
      {errors[name] && <p id={`e-${name}`} className="mt-1 text-sm text-destructive">{errors[name]}</p>}
    </div>
  );

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5 rounded-xl border bg-card p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", f.name, "text", true, "name")}
        {field("email", f.email, "email", true, "email")}
        {field("phone", f.phone, "tel", true, "tel")}
        {field("company", f.company, "text", false, "organization")}
      </div>
      <fieldset>
        <legend className="mb-2 text-sm font-medium">{f.type}</legend>
        <div className="flex flex-wrap gap-2">
          {(["photo", "mapping", "3d", "other"] as const).map((k, i) => (
            <label key={k} className="cursor-pointer">
              <input type="radio" name="projectType" value={k} defaultChecked={i === 0} className="peer sr-only" />
              <span className="inline-flex rounded-full border px-4 py-2 text-sm transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
                {k === "photo" ? f.types.photo : k === "mapping" ? f.types.mapping : k === "3d" ? f.types.d3 : f.types.other}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="f-message" className="mb-1.5 block text-sm font-medium">{f.message}</label>
        <textarea id="f-message" name="message" rows={5} required aria-invalid={!!errors.message} className={fieldCls} />
        {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message}</p>}
      </div>
      {cfg?.siteKey && <div ref={widgetRef} />}
      {errors.captcha && <p className="text-sm text-destructive">{errors.captcha}</p>}
      {status === "error" && <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{msg}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" && <Loader2 className="animate-spin" size={18} aria-hidden />}
        {status === "sending" ? f.sending : f.submit}
      </button>
    </form>
  );
}
