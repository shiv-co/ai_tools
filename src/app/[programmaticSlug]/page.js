import { notFound } from "next/navigation";

import ProgrammaticToolLoader from "@/components/ProgrammaticToolLoader";
import SeoToolPage from "@/components/SeoToolPage";
import { buildMetadata } from "@/lib/seo";
import { getAllProgrammaticSlugs, getProgrammaticDescriptorBySlug } from "@/lib/programmatic-page-utils";

export async function generateStaticParams() {
  return getAllProgrammaticSlugs().map((slug) => ({ programmaticSlug: slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const descriptor = getProgrammaticDescriptorBySlug(resolvedParams.programmaticSlug);
  if (!descriptor) return {};

  return buildMetadata({
    title: descriptor.metaTitle,
    description: descriptor.metaDescription,
    path: descriptor.canonicalPath,
  });
}

export default async function ProgrammaticSeoPage({ params }) {
  const resolvedParams = await params;
  const descriptor = getProgrammaticDescriptorBySlug(resolvedParams.programmaticSlug);
  if (!descriptor) return notFound();
  return (
    <SeoToolPage descriptor={descriptor}>
      <ProgrammaticToolLoader descriptor={descriptor} />
    </SeoToolPage>
  );
}
