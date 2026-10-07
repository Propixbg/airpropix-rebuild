import { createFileRoute, notFound } from "@tanstack/react-router";
import { content, type Lang } from "@/lib/content";
import { SitePage } from "@/components/site/SitePage";

const SITE = "https://airpropix.com";

function jsonLd(lang: Lang, description: string) {
  const bg = lang === "bg";
  const svc = (name: string) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name, areaServed: { "@type": "Country", name: "Bulgaria" } } });
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${SITE}/#business`,
        name: "AirProPix",
        url: SITE,
        description,
        telephone: "+359892061977",
        email: "contact@airpropix.com",
        address: { "@type": "PostalAddress", addressLocality: "Sofia", addressCountry: "BG" },
        areaServed: { "@type": "Country", name: "Bulgaria" },
        sameAs: [
          "https://www.instagram.com/airpropix",
          "https://www.facebook.com/airpropix",
          "https://www.youtube.com/@airpropix",
          "https://www.tiktok.com/@airpropix",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: bg ? "Услуги" : "Services",
          itemListElement: (bg
            ? ["Заснемане на недвижими имоти", "Архитектура и интериор", "Заснемане на събития", "Корпоративно заснемане", "Продуктово заснемане", "Дрон фото и видео", "Ортофотоплан", "Облак от точки", "Цифров модел на терена", "3D печат за бизнеса", "3D персонализирани продукти за събития"]
            : ["Real estate photography", "Architecture & interiors", "Event photography & video", "Corporate visuals", "Product photography & video", "Drone photo & video", "Orthophoto", "Point cloud", "Digital terrain model", "3D printing for business", "3D personalized event products"]
          ).map(svc),
        },
      },
      { "@type": "WebSite", "@id": `${SITE}/#website`, url: SITE, name: "AirProPix", inLanguage: ["bg", "en"], publisher: { "@id": `${SITE}/#business` } },
    ],
  };
}

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (params.lang !== "bg" && params.lang !== "en") throw notFound();
  },
  head: ({ params }) => {
    const lang = (params.lang === "en" ? "en" : "bg") as Lang;
    const m = content[lang].meta;
    return {
      meta: [
        { title: m.title },
        { name: "description", content: m.description },
        { property: "og:title", content: m.title },
        { property: "og:description", content: m.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE}/${lang}` },
        { name: "twitter:title", content: m.title },
        { name: "twitter:description", content: m.description },
        { property: "og:locale", content: lang === "bg" ? "bg_BG" : "en_US" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "canonical", href: `${SITE}/${lang}` },
        { rel: "alternate", hrefLang: "bg", href: `${SITE}/bg` },
        { rel: "alternate", hrefLang: "en", href: `${SITE}/en` },
        { rel: "alternate", hrefLang: "x-default", href: `${SITE}/bg` },
      ],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd(lang, m.description)) }],
    };
  },
  component: LangPage,
});

function LangPage() {
  const { lang } = Route.useParams();
  return <SitePage lang={lang as Lang} />;
}
