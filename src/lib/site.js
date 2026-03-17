export const SITE_NAME = "AI Tech Tactics";
export const SITE_URL = "https://aitechtactics.com";
export const SITE_DESCRIPTION =
  "Free browser-based tools for image, PDF, text, media, and AI workflows. Fast, private, and designed for practical everyday use.";
export const SITE_OG_IMAGE = "/summary_large_image.png";
export const ORGANIZATION_LOGO = "/logo.png";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
