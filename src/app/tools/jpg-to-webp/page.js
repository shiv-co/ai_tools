import ImageConverterCore from "@/components/ImageConverterCore";

export default function Page() {
  return (
    <ImageConverterCore
      from="jpeg"
      to="webp"
      title="JPG to WebP Converter"
      description="Convert JPG images to WebP for smaller file size and faster loading."
    />
  );
}
