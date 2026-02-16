import ImageConverterCore from "@/components/ImageConverterCore";

export default function Page() {
  return (
    <ImageConverterCore
      from="webp"
      to="jpg"
      title="WebP to JPG Converter"
      description="Convert WebP images to JPG format easily in your browser."
    />
  );
}
