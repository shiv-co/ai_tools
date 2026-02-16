import ImageConverterCore from "@/components/ImageConverterCore";

export default function Page() {
  return (
    <ImageConverterCore
      from="jpeg"
      to="png"
      title="JPG to PNG Converter"
      description="Convert JPG images to PNG format instantly. No uploads. Free and secure."
    />
  );
}
