import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/airpropix-logo.png.asset.json";
import type { Content, Lang } from "@/lib/content";

export function Header({ t, lang }: { t: Content; lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const links = [
    ["#top", t.nav.home],
    ["#photo", t.nav.photo],
    ["#mapping", t.nav.mapping],
    ["#3d", t.nav.d3],
    ["#work", t.nav.work],
    ["#about", t.nav.about],
    ["#contact", t.nav.contact],
  ] as const;
  const other: Lang = lang === "bg" ? "en" : "bg";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b bg-background/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <a href="#top" className="shrink-0" aria-label="AirProPix">
          <img src={logo.url} alt="AirProPix" width={690} height={137} className="h-6 w-auto md:h-7" />
        </a>
        <nav aria-label="Main" className="hidden items-center gap-6 xl:flex">
          {links.slice(1).map(([href, label]) => {
            const key = href === "#photo" ? "photo" : href === "#mapping" ? "mapping" : href === "#3d" ? "d3" : null;
            if (!key) return (
              <a key={href} href={href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{label}</a>
            );
            return (
              <div key={href} className="group relative">
                <a href={href} aria-haspopup="true" className="inline-flex items-center gap-1 py-5 text-sm text-muted-foreground transition-colors hover:text-foreground group-focus-within:text-foreground">
                  {label}
                  <ChevronDown size={14} aria-hidden className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                </a>
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="min-w-60 rounded-lg bg-background py-2 shadow-lg">
                    {t.nav.sub[key].map(([h, l]) => (
                      <li key={l}>
                        <a href={h} className="block px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{l}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/$lang"
            params={{ lang: other }}
            className="eyebrow rounded-full border px-3 py-1.5 transition-colors hover:border-foreground hover:text-foreground"
            aria-label={other === "en" ? "English" : "Български"}
          >
            {other.toUpperCase()}
          </Link>
          <a
            href="#contact"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            {t.nav.cta}
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t bg-background xl:hidden">
          <ul className="container-x flex flex-col py-6">
            {links.map(([href, label], i) => (
              <li key={href} className="border-b">
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-4 font-display text-2xl font-semibold"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="container-x pb-10">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex w-full justify-center rounded-full bg-primary px-5 py-4 font-medium text-primary-foreground"
            >
              {t.nav.cta}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
