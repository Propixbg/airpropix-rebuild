import { createFileRoute, notFound } from "@tanstack/react-router";
import { content, type Lang } from "@/lib/content";
import { SitePage } from "@/components/site/SitePage";

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
        { property: "og:locale", content: lang === "bg" ? "bg_BG" : "en_US" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "alternate", hrefLang: "bg", href: "/bg" },
        { rel: "alternate", hrefLang: "en", href: "/en" },
      ],
    };
  },
  component: LangPage,
});

function LangPage() {
  const { lang } = Route.useParams();
  return <SitePage lang={lang as Lang} />;
}
