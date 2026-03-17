export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/tools/", "/blog/", "/comparisons/"],
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: "https://aitechtactics.com/sitemap.xml",
  };
}
