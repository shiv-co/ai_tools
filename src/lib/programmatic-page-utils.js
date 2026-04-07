import {
  compressionSizes,
  conversions,
  imageDimensions,
  programmaticSlugs,
  socialPlatforms,
} from "@/data/programmatic-pages";

const socialPlatformCopy = {
  instagram: { label: "Instagram", dimensions: "1080 x 1080" },
  "instagram-post": { label: "Instagram Post", dimensions: "1080 x 1080" },
  "instagram-story": { label: "Instagram Story", dimensions: "1080 x 1920" },
  "instagram-reel-cover": { label: "Instagram Reel Cover", dimensions: "1080 x 1920" },
  whatsapp: { label: "WhatsApp", dimensions: "1080 x 1080" },
  "whatsapp-status": { label: "WhatsApp Status", dimensions: "1080 x 1920" },
  facebook: { label: "Facebook", dimensions: "1200 x 630" },
  "facebook-post": { label: "Facebook Post", dimensions: "1200 x 630" },
  "facebook-cover": { label: "Facebook Cover", dimensions: "1640 x 624" },
  linkedin: { label: "LinkedIn", dimensions: "1200 x 627" },
  "linkedin-post": { label: "LinkedIn Post", dimensions: "1200 x 627" },
  "linkedin-banner": { label: "LinkedIn Banner", dimensions: "1584 x 396" },
  twitter: { label: "Twitter", dimensions: "1600 x 900" },
  "twitter-header": { label: "Twitter Header", dimensions: "1500 x 500" },
  "youtube-thumbnail": { label: "YouTube Thumbnail", dimensions: "1280 x 720" },
  "youtube-banner": { label: "YouTube Banner", dimensions: "2560 x 1440" },
  "pinterest-pin": { label: "Pinterest Pin", dimensions: "1000 x 1500" },
  "pinterest-story-pin": { label: "Pinterest Story Pin", dimensions: "1080 x 1920" },
  tiktok: { label: "TikTok", dimensions: "1080 x 1920" },
  "tiktok-cover": { label: "TikTok Cover", dimensions: "1080 x 1920" },
  snapchat: { label: "Snapchat", dimensions: "1080 x 1920" },
  telegram: { label: "Telegram", dimensions: "1280 x 1280" },
  discord: { label: "Discord", dimensions: "1280 x 720" },
  shopify: { label: "Shopify Product", dimensions: "2048 x 2048" },
  amazon: { label: "Amazon Product", dimensions: "2000 x 2000" },
  etsy: { label: "Etsy Listing", dimensions: "2000 x 2000" },
  ebay: { label: "eBay Listing", dimensions: "1600 x 1600" },
  "passport-photo": { label: "Passport Photo", dimensions: "600 x 600" },
  "profile-picture": { label: "Profile Picture", dimensions: "400 x 400" },
  "website-hero": { label: "Website Hero", dimensions: "1920 x 1080" },
};

function titleCase(value) {
  const upperMap = {
    jpg: "JPG",
    png: "PNG",
    webp: "WebP",
    avif: "AVIF",
    heic: "HEIC",
    jpeg: "JPEG",
    jfif: "JFIF",
    ico: "ICO",
    tif: "TIF",
    tiff: "TIFF",
    svg: "SVG",
    bmp: "BMP",
    gif: "GIF",
    pjpeg: "PJPEG",
    pjp: "PJP",
    jpe: "JPE",
    apng: "APNG",
  };

  return value
    .split("-")
    .map((part) => upperMap[part] || part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normalizeInputFormat(format) {
  if (["jpg", "jpeg", "jfif", "jpe", "pjpeg", "pjp"].includes(format)) return "jpeg";
  if (["tif", "tiff", "apng", "ico"].includes(format)) return "png";
  return format;
}

function normalizeOutputFormat(format) {
  return format === "jpeg" ? "jpg" : format;
}

function formatSizeLabel(size) {
  if (size >= 1000 && size % 1000 === 0) return `${size / 1000}MB`;
  return `${size}KB`;
}

function formatSizeSlug(size) {
  if (size >= 1000 && size % 1000 === 0) return `${size / 1000}mb`;
  return `${size}kb`;
}

function buildCompressionDescriptor(size) {
  const sizeLabel = formatSizeLabel(size);
  const sizeSlug = formatSizeSlug(size);

  return {
    slug: `compress-image-to-${sizeSlug}`,
    pageType: "compression",
    size,
    title: `Compress Image to ${sizeLabel} Online Free`,
    metaTitle: `Compress Image to ${sizeLabel} Online | AI Tech Tactics`,
    description: `Use this free tool to compress your image to ${sizeLabel} quickly and privately. Perfect for online forms, websites, and email attachments.`,
    metaDescription: `Compress image to ${sizeLabel} online free. Fast browser-based image compression with no uploads required.`,
    toolName: "Image Compressor",
    toolType: "image-compressor",
    canonicalPath: `/compress-image-to-${sizeSlug}`,
    instructions: [
      "Upload your image in JPG, PNG, or WebP format.",
      `Adjust compression until the file is close to ${sizeLabel}.`,
      "Download the optimized image directly in your browser.",
    ],
    useCases: [
      "online application forms",
      "passport and ID photo submissions",
      "faster website images and email attachments",
    ],
    faq: [
      { q: `How do I compress an image to ${sizeLabel}?`, a: `Upload the image, reduce the quality gradually, and download the optimized result once the file size is close to ${sizeLabel}.` },
      { q: "Does image compression reduce quality?", a: "Compression can reduce quality slightly, but browser-based optimization usually keeps the image usable for web and document uploads." },
      { q: "Is this image compressor free?", a: "Yes. The tool runs in your browser and does not require sign-up or paid credits." },
    ],
  };
}

function buildDimensionDescriptor(dimension) {
  const [width, height] = dimension.split("x");
  return {
    slug: `resize-image-${dimension}`,
    pageType: "dimension",
    width,
    height,
    title: `Resize Image to ${width}x${height} Online`,
    metaTitle: `Resize Image ${width}x${height} | AI Tech Tactics`,
    description: `Resize an image to ${width}x${height} pixels online for forms, profile photos, product images, and responsive layouts.`,
    metaDescription: `Resize image to ${width}x${height} online free. Browser-based image resizer with no uploads required.`,
    toolName: "Image Resizer",
    toolType: "image-resizer",
    canonicalPath: `/resize-image-${dimension}`,
    instructions: [
      "Upload your image.",
      `Set the target output size to ${width} x ${height}.`,
      "Preview and download the resized version.",
    ],
    useCases: [
      "marketplace product images",
      "profile and thumbnail assets",
      "matching exact website layout requirements",
    ],
    faq: [
      { q: `How do I resize an image to ${width}x${height}?`, a: `Upload the file, enter ${width} for width and ${height} for height, then download the result.` },
      { q: "Will resizing crop my image?", a: "Only if you choose a crop-style workflow. Standard resizing changes pixel dimensions without forced cropping." },
      { q: "Is the image resized locally?", a: "Yes. The resizer works in your browser so the file stays on your device." },
    ],
  };
}

function buildSocialDescriptor(platform) {
  const platformInfo = socialPlatformCopy[platform];
  return {
    slug: `resize-image-for-${platform}`,
    pageType: "social",
    platform,
    title: `Resize Image for ${platformInfo.label} Online`,
    metaTitle: `Resize Image for ${platformInfo.label} | AI Tech Tactics`,
    description: `Resize images for ${platformInfo.label} using a free browser-based tool. Prepare the right dimensions for cleaner posts and profiles.`,
    metaDescription: `Resize image for ${platformInfo.label} online free. Browser-based image resizer for ${platformInfo.dimensions} style layouts.`,
    toolName: "Image Resizer",
    toolType: "image-resizer",
    canonicalPath: `/resize-image-for-${platform}`,
    instructions: [
      "Upload the image you want to publish.",
      `Choose dimensions that match ${platformInfo.label}, typically around ${platformInfo.dimensions}.`,
      "Download the resized version and upload it to the platform.",
    ],
    useCases: [
      `${platformInfo.label} posts and covers`,
      "faster social uploads",
      "cleaner previews without awkward cropping",
    ],
    faq: [
      { q: `What size should an image be for ${platformInfo.label}?`, a: `${platformInfo.label} commonly works best around ${platformInfo.dimensions}, depending on the exact placement.` },
      { q: `Can I resize without losing too much quality for ${platformInfo.label}?`, a: "Yes. Start with a large image, resize to the target dimensions, and export the result for web use." },
      { q: "Is this social image resizer free?", a: "Yes. It runs entirely in your browser and does not require sign-up." },
    ],
  };
}

function buildConversionDescriptor(from, to) {
  const titlePrefix = `${titleCase(from)} to ${titleCase(to)}`;

  return {
    slug: `${from}-to-${to}`,
    pageType: "conversion",
    from,
    to,
    title: `${titlePrefix} Online Free`,
    metaTitle: `${titlePrefix} Online | AI Tech Tactics`,
    description: `${titlePrefix} with a free browser-based tool. Convert files quickly without installs or server uploads.`,
    metaDescription: `${titlePrefix} online free. Fast browser-based ${titleCase(from)} to ${titleCase(to)} converter with no uploads required.`,
    toolName: `${titleCase(from)} to ${titleCase(to)} Converter`,
    toolType: "image-converter",
    inputFormat: normalizeInputFormat(from),
    outputFormat: normalizeOutputFormat(to),
    canonicalPath: `/${from}-to-${to}`,
    instructions: [
      `Upload your ${titleCase(from)} file.`,
      `Convert it to ${titleCase(to)} directly in the browser.`,
      `Download the new ${titleCase(to)} file when processing is complete.`,
    ],
    useCases: [
      "format compatibility with apps and websites",
      "smaller or more flexible web assets",
      "cleaner file handoff across devices and teams",
    ],
    faq: [
      { q: `How do I convert ${titleCase(from)} to ${titleCase(to)}?`, a: `Upload the ${titleCase(from)} file, run the conversion, and download the ${titleCase(to)} version directly from your browser.` },
      { q: "Does conversion happen on a server?", a: "No. The page reuses the browser-based converters already on the site, so processing stays local whenever the tool supports it." },
      { q: "Is this converter free?", a: "Yes. It uses the existing free converter flow with no account required." },
    ],
  };
}

export const compressionDescriptors = compressionSizes.map(buildCompressionDescriptor);
export const dimensionDescriptors = imageDimensions.map(buildDimensionDescriptor);
export const socialDescriptors = socialPlatforms.map(buildSocialDescriptor);
export const conversionDescriptors = conversions.map(([from, to]) => buildConversionDescriptor(from, to));

export const programmaticPageDescriptors = [
  ...compressionDescriptors,
  ...dimensionDescriptors,
  ...socialDescriptors,
  ...conversionDescriptors,
];

export function getProgrammaticDescriptorBySlug(slug) {
  return programmaticPageDescriptors.find((item) => item.slug === slug);
}

export function getAllProgrammaticSlugs() {
  return programmaticSlugs;
}
