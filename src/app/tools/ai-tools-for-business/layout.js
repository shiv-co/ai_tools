import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Tools for Business | AI Tech Tactics",
  description:
    "Compare AI tools for business teams covering marketing, CRM, email, support, and workflow automation.",
  path: "/tools/ai-tools-for-business",
});

export default function Layout({ children }) {
  return children;
}
