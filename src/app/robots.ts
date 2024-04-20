import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.API_PATH;
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/api/og/*"],
      disallow: "/admin/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
