const baseCompressionSizes = [
  10, 15, 20, 25, 30, 35, 40, 45, 50, 60,
  70, 80, 90, 100, 110, 120, 130, 140, 150, 160,
  170, 180, 190, 200, 225, 250, 275, 300, 325, 350,
  375, 400, 425, 450, 475, 500, 550, 600, 650, 700,
  750, 800, 850, 900, 950, 1000, 1024, 1100, 1200, 1500,
  1800, 2000, 2500, 3000, 4000, 5000, 6000, 7000, 8000, 10000,
];

const imageWidths = [100, 150, 200, 250, 300, 400, 512, 720, 1080, 1920];
const imageHeights = [100, 150, 200, 250, 300, 400, 512, 720, 1080, 1920];

export const compressionSizes = baseCompressionSizes;

export const imageDimensions = imageWidths.flatMap((width) =>
  imageHeights.map((height) => `${width}x${height}`)
);

export const socialPlatforms = [
  "instagram",
  "instagram-post",
  "instagram-story",
  "instagram-reel-cover",
  "whatsapp",
  "whatsapp-status",
  "facebook",
  "facebook-post",
  "facebook-cover",
  "linkedin",
  "linkedin-post",
  "linkedin-banner",
  "twitter",
  "twitter-header",
  "youtube-thumbnail",
  "youtube-banner",
  "pinterest-pin",
  "pinterest-story-pin",
  "tiktok",
  "tiktok-cover",
  "snapchat",
  "telegram",
  "discord",
  "shopify",
  "amazon",
  "etsy",
  "ebay",
  "passport-photo",
  "profile-picture",
  "website-hero",
];

export const conversions = [
  ["png", "jpg"],
  ["png", "jpeg"],
  ["png", "webp"],
  ["jpg", "png"],
  ["jpg", "jpeg"],
  ["jpg", "webp"],
  ["jpeg", "jpg"],
  ["jpeg", "png"],
  ["jpeg", "webp"],
  ["webp", "jpg"],
  ["webp", "jpeg"],
  ["webp", "png"],
  ["avif", "jpg"],
  ["avif", "jpeg"],
  ["avif", "png"],
  ["avif", "webp"],
  ["heic", "jpg"],
  ["heic", "jpeg"],
  ["heic", "png"],
  ["heic", "webp"],
  ["bmp", "jpg"],
  ["bmp", "png"],
  ["bmp", "webp"],
  ["gif", "jpg"],
  ["gif", "png"],
  ["gif", "webp"],
  ["svg", "jpg"],
  ["svg", "png"],
  ["svg", "webp"],
  ["ico", "jpg"],
  ["ico", "png"],
  ["ico", "webp"],
  ["jfif", "jpg"],
  ["jfif", "png"],
  ["jfif", "webp"],
  ["jpe", "jpg"],
  ["jpe", "png"],
  ["jpe", "webp"],
  ["pjpeg", "jpg"],
  ["pjpeg", "png"],
  ["pjpeg", "webp"],
  ["pjp", "jpg"],
  ["pjp", "png"],
  ["pjp", "webp"],
  ["tif", "jpg"],
  ["tif", "png"],
  ["tif", "webp"],
  ["tiff", "jpg"],
  ["tiff", "png"],
  ["tiff", "webp"],
];

export const programmaticSlugs = [
  ...compressionSizes.map((size) =>
    size >= 1000 && size % 1000 === 0
      ? `compress-image-to-${size / 1000}mb`
      : `compress-image-to-${size}kb`
  ),
  ...imageDimensions.map((dimension) => `resize-image-${dimension}`),
  ...socialPlatforms.map((platform) => `resize-image-for-${platform}`),
  ...conversions.map(([from, to]) => `${from}-to-${to}`),
];
