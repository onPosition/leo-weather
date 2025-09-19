import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Leo weather",
    short_name: "Leo weather",
    description: "A Progressive Web App built with Next.js",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
    ],
  };
}
