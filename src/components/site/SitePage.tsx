import { useState } from "react";
import { ArrowRight, ArrowUpRight, Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react";
import logo from "@/assets/airpropix-logo.png.asset.json";
import { content, type Lang } from "@/lib/content";
import { img, type ImgKey } from "@/lib/images";
import { Header } from "./Header";
import { ContactForm } from "./ContactForm";

function Pic({ k, alt, className = "", eager = false, sizes }: { k: ImgKey; alt: string; className?: string; eager?: boolean; sizes?: string }) {
  return (
    <img
      src={img[k]}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      sizes={sizes}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

function SectionHead({ label, title, text, id }: { label: string; title: string; text?: string; id?: string }) {
  return (
    <div className="grid gap-6 md:grid-cols-12 md:items-end">
      <div className="md:col-span-7">
        <p className="eyebrow mb-4">{label}</p>
        <h2 id={id} className="text-3xl leading-[1.1] md:text-5xl">{title}</h2>
      </div>
      {text && <p className="text-lg text-muted-foreground md:col-span-5">{text}</p>}
    </div>
  );
}

export function SitePage({ lang }: { lang: Lang }) {
  const t = content[lang];
  const [filter, setFilter] = useState<"all" | "photo" | "mapping" | "3d">("all");
  const work = t.work.items.filter((w) => filter === "all" || w.cat === filter);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
        Skip
      </a>
      <Header t={t} lang={lang} />
      <main id="main">
        {/* HERO */}
        <section id="top" className="relative overflow-hidden pt-28 md:pt-32">
          <div className="container-x relative">
            <p className="eyebrow animate-rise">{t.hero.eyebrow}</p>
            <h1 className="animate-rise mt-6 max-w-5xl text-[2.4rem] leading-[1.02] sm:text-6xl lg:text-7xl">
              {t.hero.line1}
              <br />
              <span className="text-slate">{t.hero.line2}</span>
            </h1>
            <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
              <p className="animate-rise text-lg text-muted-foreground md:col-span-6">{t.hero.text}</p>
              <div className="flex flex-wrap gap-3 md:col-span-6 md:justify-end">
                <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-medium text-primary-foreground transition-opacity hover:opacity-90">
                  {t.hero.cta} <ArrowRight size={18} aria-hidden />
                </a>
                <a href="#work" className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3.5 font-medium transition-colors hover:border-foreground">
                  {t.hero.secondary}
                </a>
              </div>
            </div>
            <div className="relative mt-12 overflow-hidden rounded-2xl border bg-paper md:mt-16">
              <div className="aspect-[4/3] sm:aspect-[16/9]">
                <Pic k="hero" alt={t.hero.alt} eager sizes="100vw" />
              </div>
              <ul className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 md:bottom-6 md:left-6">
                {t.hero.tags.map((tag, i) => (
                  <li key={tag} className="rounded-full bg-background/90 px-4 py-2 text-sm font-medium backdrop-blur">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* IDEA */}
        <section aria-labelledby="idea-h" className="py-24 md:py-32">
          <div className="container-x">
            <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border bg-border min-[440px]:grid-cols-2 md:grid-cols-4">
              {t.idea.words.map((w, i) => (
                <li key={w} className="flex flex-col justify-between gap-6 bg-background p-6 md:gap-10 md:p-8">
                  <span className="h-px w-8 bg-gold" aria-hidden />
                  <span className="font-display text-xl font-bold uppercase tracking-tight md:text-2xl lg:text-3xl">{w}.</span>
                </li>
              ))}
            </ol>
            <div className="mt-14 grid gap-6 md:grid-cols-12">
              <h2 id="idea-h" className="text-3xl md:col-span-7 md:text-5xl">{t.idea.statement}</h2>
              <p className="text-lg text-muted-foreground md:col-span-5">{t.idea.text}</p>
            </div>
          </div>
        </section>

        {/* PHOTO & VIDEO */}
        <section id="photo" aria-labelledby="photo-h" className="border-t bg-paper py-24 md:py-32">
          <div className="container-x">
            <SectionHead id="photo-h" label={t.photo.label} title={t.photo.title} text={t.photo.text} />
            <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {t.photo.cats.map((c) => (
                <li key={c.title} className="group">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                    <Pic k={c.img} alt={c.alt} className="img-zoom" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
                  </div>
                  <h3 className="mt-5 text-lg">{c.title}</h3>
                  <p className="mt-2 text-muted-foreground">{c.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* EVENTS GALLERY */}
        <section aria-labelledby="events-h" className="py-24 md:py-32">
          <div className="container-x">
            <SectionHead id="events-h" label={t.events.label} title={t.events.title} text={t.events.text} />
            <ul className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {t.events.items.map((e, i) => (
                <li
                  key={e.title}
                  className={`group relative overflow-hidden rounded-xl bg-muted ${
                    i === 0 || i >= 5 ? "col-span-2 aspect-[4/3] md:aspect-auto md:h-96" : "aspect-[3/4] md:aspect-auto md:h-96"
                  }`}
                >
                  <Pic k={e.img} alt={e.alt} className="img-zoom" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1.5 text-sm font-medium backdrop-blur">{e.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* MAPPING */}
        <section id="mapping" aria-labelledby="mapping-h" className="border-t bg-paper py-24 md:py-32">
          <div className="container-x">
            <SectionHead id="mapping-h" label={t.mapping.label} title={t.mapping.title} text={t.mapping.text} />
            <ol className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-3">
              {t.mapping.steps.map((s, i) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="rounded-full border bg-background px-4 py-2 text-sm">
                    {s}
                  </span>
                  {i < t.mapping.steps.length - 1 && <ArrowRight size={14} className="text-slate" aria-hidden />}
                </li>
              ))}
            </ol>

            {/* Orthophoto feature */}
            <div className="mt-16 grid overflow-hidden rounded-2xl border bg-background lg:grid-cols-12">
              <div className="relative aspect-[4/3] lg:col-span-8 lg:aspect-auto">
                <Pic k="outOrtho" alt={t.mapping.orthoAlt} sizes="(min-width:1024px) 66vw, 100vw" />
              </div>
              <div className="flex flex-col justify-center gap-5 p-8 lg:col-span-4 lg:p-10">
                <p className="eyebrow">GIS · GEOREF</p>
                <h3 className="text-2xl md:text-3xl">{t.mapping.orthoTitle}</h3>
                <p className="text-muted-foreground">{t.mapping.orthoText}</p>
                <p className="border-l-2 border-gold pl-4 text-sm text-muted-foreground">{t.mapping.orthoNote}</p>
              </div>
            </div>

            <h3 className="mt-24 text-2xl md:text-4xl">{t.mapping.problemsTitle}</h3>
            <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {t.mapping.problems.map((p, i) => (
                <li key={p.title} className="group">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                    <Pic k={p.img} alt={p.alt} className="img-zoom" />
                  </div>
                  <h4 className="mt-5 font-display text-lg">{p.title}</h4>
                  <p className="mt-2 text-muted-foreground">{p.text}</p>
                </li>
              ))}
            </ul>

            <h3 className="mt-24 text-2xl md:text-4xl">{t.mapping.outputsTitle}</h3>
            <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.mapping.outputs.map((o) => (
                <li key={o.title} className="group overflow-hidden rounded-xl border bg-background">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <Pic k={o.img} alt={o.alt} className="img-zoom" />
                  </div>
                  <div className="p-5">
                    <h4 className="font-display text-base">{o.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{o.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3D BUSINESS */}
        <section id="3d" aria-labelledby="b3d-h" className="py-24 md:py-32">
          <div className="container-x">
            <SectionHead id="b3d-h" label={t.b3d.label} title={t.b3d.title} text={t.b3d.text} />
            <h3 className="mt-20 text-2xl md:text-4xl">{t.b3d.problemsTitle}</h3>
            <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {t.b3d.problems.map((p, i) => (
                <li key={p.title} className="group">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                    <Pic k={p.img} alt={p.alt} className="img-zoom" />
                  </div>
                  <h4 className="mt-5 font-display text-lg">{p.title}</h4>
                  <p className="mt-2 text-muted-foreground">{p.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-14 max-w-3xl border-l-2 border-gold pl-5 text-lg">{t.b3d.note}</p>
          </div>
        </section>

        {/* 3D EVENTS */}
        <section aria-labelledby="evp-h" className="border-t bg-accent/40 py-24 md:py-32">
          <div className="container-x">
            <SectionHead id="evp-h" label={t.evp.label} title={t.evp.title} text={t.evp.text} />
            <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {t.evp.items.map((e, i) => (
                <li key={e.title} className={`group ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                  <div className={`overflow-hidden rounded-xl bg-muted ${i === 0 ? "aspect-square" : "aspect-square"}`}>
                    <Pic k={e.img} alt={e.alt} className="img-zoom" />
                  </div>
                  <h3 className={`mt-3 ${i === 0 ? "text-xl" : "text-sm md:text-base"}`}>{e.title}</h3>
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-3xl text-lg text-muted-foreground">{t.evp.audience}</p>
          </div>
        </section>

        {/* WHY */}
        <section aria-labelledby="why-h" className="bg-ink py-24 text-ink-foreground md:py-32">
          <div className="container-x grid gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <h2 id="why-h" className="text-4xl leading-[1.05] md:text-6xl">{t.why.title}</h2>
              <p className="mt-8 text-lg opacity-75">{t.why.text}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {t.why.verbs.map((v) => (
                  <li key={v} className="rounded-full border border-ink-foreground/25 px-4 py-2">{v}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-end md:col-span-5">
              <p className="font-display text-2xl text-gold md:text-3xl">{t.why.second}</p>
              <p className="mt-4 opacity-75">{t.why.secondText}</p>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" aria-labelledby="work-h" className="py-24 md:py-32">
          <div className="container-x">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow mb-4">{t.work.label}</p>
                <h2 id="work-h" className="text-3xl md:text-5xl">{t.work.title}</h2>
              </div>
              <div role="group" aria-label={t.work.title} className="flex flex-wrap gap-2">
                {([
                  ["all", t.work.filters.all],
                  ["photo", t.work.filters.photo],
                  ["mapping", t.work.filters.mapping],
                  ["3d", t.work.filters.d3],
                ] as const).map(([k, label]) => (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={filter === k}
                    onClick={() => setFilter(k)}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      filter === k ? "border-primary bg-primary text-primary-foreground" : "hover:border-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {work.map((w) => (
                <li key={w.title} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                  <Pic k={w.img} alt={w.alt} className="img-zoom" />
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-lg bg-background/92 px-4 py-3 backdrop-blur">
                    <span className="font-medium">{w.title}</span>
                    <span className="eyebrow">{w.cat === "photo" ? t.work.filters.photo : w.cat === "mapping" ? t.work.filters.mapping : "3D"}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* PROCESS */}
        <section aria-labelledby="process-h" className="border-t bg-paper py-24 md:py-32">
          <div className="container-x">
            <p className="eyebrow mb-4">{t.process.label}</p>
            <h2 id="process-h" className="text-3xl md:text-5xl">{t.process.title}</h2>
            <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-5">
              {t.process.steps.map((s, i) => (
                <li key={s.t} className="flex flex-col gap-6 bg-background p-6">
                  <span className="h-px w-8 bg-gold" aria-hidden />
                  <div>
                    <h3 className="text-base">{s.t}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-12 font-display text-2xl md:text-4xl">{t.process.line}</p>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" aria-labelledby="about-h" className="py-24 md:py-32">
          <div className="container-x grid gap-10 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="eyebrow mb-4">{t.about.label}</p>
              <h2 id="about-h" className="text-3xl md:text-5xl">{t.about.title}</h2>
            </div>
            <div className="md:col-span-6">
              <p className="text-lg text-muted-foreground">{t.about.text}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {t.about.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 border-t pt-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" aria-labelledby="contact-h" className="border-t bg-paper py-24 md:py-32">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="contact-h" className="text-4xl md:text-6xl">{t.contact.title}</h2>
              <p className="mt-6 text-lg text-muted-foreground">{t.contact.text}</p>
              <ul className="mt-10 space-y-4">
                <li>
                  <a href="tel:+359892061977" className="inline-flex items-center gap-3 text-lg hover:underline">
                    <Phone size={18} className="text-gold" aria-hidden /> {t.contact.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${t.contact.email}`} className="inline-flex items-center gap-3 text-lg hover:underline">
                    <Mail size={18} className="text-gold" aria-hidden /> {t.contact.email}
                  </a>
                </li>
              </ul>
              <div className="mt-10 border-t pt-8">
                <p className="eyebrow mb-4">{t.social.label}</p>
                <div className="flex items-center gap-3">
                  {[
                    { href: "https://www.instagram.com/airpropix", label: "Instagram", Icon: Instagram },
                    { href: "https://www.facebook.com/airpropix", label: "Facebook", Icon: Facebook },
                    { href: "https://www.youtube.com/@airpropix", label: "YouTube", Icon: Youtube },
                  ].map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`AirProPix on ${label}`}
                      title={label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-gold hover:text-gold"
                    >
                      <Icon size={20} aria-hidden />
                    </a>
                  ))}
                  <span className="ml-2 font-mono text-sm text-slate">{t.social.handle}</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ContactForm t={t} lang={lang} />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="container-x flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <img src={logo.url} alt="AirProPix" width={690} height={137} loading="lazy" className="h-6 w-auto" />
            <p className="eyebrow mt-4">{t.footer.tagline}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm md:items-end">
            <a href="https://www.tiktok.com/@airpropix" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
              {t.footer.follow}: TikTok @airpropix <ArrowUpRight size={14} aria-hidden />
            </a>
            <p className="text-muted-foreground">© {new Date().getFullYear()} AirProPix. {t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
