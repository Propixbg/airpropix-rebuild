import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/$lang", params: { lang: "bg" } });
  },
  head: () => ({
    meta: [
      { title: "AirProPix — Фото и видео, картографиране и 3D" },
      { name: "description", content: "Професионално фото и видео, дрон картографиране и 3D решения." },
      { property: "og:title", content: "AirProPix" },
      { property: "og:description", content: "Фото и видео, картографиране и 3D." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
