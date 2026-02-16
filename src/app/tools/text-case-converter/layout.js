export const metadata = {
  title:
    "Text Case Converter Online – Uppercase, Lowercase, Title & Sentence Case",
  description:
    "Convert text instantly to UPPERCASE, lowercase, Title Case, or Sentence case online for free. Fast, secure, and browser-based.",
  keywords: [
    "text case converter",
    "uppercase converter",
    "lowercase converter",
    "title case converter",
    "sentence case converter",
    "change text case online",
  ],
  alternates: {
    canonical: "https://yourdomain.com/tools/text-case-converter",
  },
  openGraph: {
    title:
      "Text Case Converter Online – Uppercase, Lowercase, Title & Sentence Case",
    description:
      "Convert text to uppercase, lowercase, title case, or sentence case instantly. 100% free and secure.",
    url: "https://yourdomain.com/tools/text-case-converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Text Case Converter Online",
    description:
      "Convert text to uppercase, lowercase, title case, or sentence case instantly for free.",
  },
};

export default function TextCaseLayout({ children }) {
  return <>{children}</>;
}
