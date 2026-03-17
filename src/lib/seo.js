import { absoluteUrl, ORGANIZATION_LOGO, SITE_NAME, SITE_OG_IMAGE, SITE_URL } from "./site";

function truncate(text, max) {
  if (!text || text.length <= max) return text;
  const sliced = text.slice(0, max - 1).trimEnd();
  const breakPoint = sliced.lastIndexOf(" ");
  return `${(breakPoint > 30 ? sliced.slice(0, breakPoint) : sliced).trimEnd()}…`;
}

export function buildTitle(title, max = 60) {
  return truncate(title, max);
}

export function buildDescription(description, max = 160) {
  return truncate(description, max);
}

export function buildMetadata({
  title,
  description,
  path = "/",
  type = "website",
  image = SITE_OG_IMAGE,
  keywords,
}) {
  const fullTitle = buildTitle(title);
  const fullDescription = buildDescription(description);
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title: fullTitle,
    description: fullDescription,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: SITE_NAME,
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [imageUrl],
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(ORGANIZATION_LOGO),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function softwareSchema({ name, description, path, category = "UtilitiesApplication" }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory: category,
    operatingSystem: "Web Browser",
    url: absoluteUrl(path),
    description: buildDescription(description),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function articleSchema({ title, description, path, image, datePublished, dateModified, author, keywords }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: buildDescription(description),
    image: image?.startsWith("http") ? image : absoluteUrl(image || SITE_OG_IMAGE),
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: absoluteUrl(path),
    keywords,
  };
}
