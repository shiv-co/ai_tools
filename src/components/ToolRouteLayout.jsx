import ToolSeoSections from "./ToolSeoSections";

export default function ToolRouteLayout({ children, slug, includeSections = true }) {
  return (
    <>
      {children}
      {includeSections ? <ToolSeoSections slug={slug} /> : null}
    </>
  );
}
