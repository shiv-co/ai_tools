export const comparisons = [
  {
    slug: "chatgpt-vs-gemini",
    title: "ChatGPT vs Google Gemini",
    description:
      "Compare ChatGPT and Google Gemini across reasoning, research, integrations, and workflow fit.",
    updated: "January 2026",
    readTime: "12 min read",
    category: "AI Assistants",
    overview:
      "ChatGPT and Google Gemini are both capable assistants, but they shine in different contexts. ChatGPT usually leads when conversational depth, writing help, and coding workflows matter. Gemini is often strongest when Google ecosystem integration and research-adjacent tasks are central to the workflow.",
    table: [
      ["Primary strength", "Conversational reasoning", "Search and multimodal integration"],
      ["Best use case", "Writing, coding, planning", "Research, Google workflows"],
      ["Ecosystem fit", "Standalone and API-heavy workflows", "Google apps and Workspace"],
      ["Pricing", "Free and paid plans", "Free and paid plans"],
    ],
    prosA: ["Strong writing assistance", "Useful for coding and ideation", "Natural long-form conversations"],
    prosB: ["Tight Google integration", "Solid multimodal capabilities", "Helpful for search-led tasks"],
    verdict:
      "Choose ChatGPT if you want a stronger general-purpose assistant for writing, coding, and planning. Choose Gemini if your daily work already lives inside Google services and you want tighter ecosystem alignment.",
    relatedTools: [
      { href: "/tools/text-case-converter", label: "Text Case Converter" },
      { href: "/tools/word-counter", label: "Word Counter" },
      { href: "/blog/webp-vs-jpg-seo-2026", label: "WebP vs JPG for SEO" },
    ],
  },
  {
    slug: "chatgpt-vs-claude",
    title: "ChatGPT vs Claude",
    description:
      "Compare ChatGPT and Claude for writing, analysis, long-context work, and day-to-day productivity.",
    updated: "January 2026",
    readTime: "10 min read",
    category: "AI Assistants",
    overview:
      "ChatGPT and Claude are both strong general assistants. ChatGPT often feels broader across coding, multimodal use, and product surface area, while Claude is frequently preferred for calm long-form writing, document reasoning, and structured analysis across larger inputs.",
    table: [
      ["Primary strength", "General productivity breadth", "Long-context analysis"],
      ["Best use case", "Coding and broad task variety", "Document-heavy reasoning"],
      ["Tone", "Adaptive and versatile", "Measured and analytical"],
      ["Pricing", "Free and paid plans", "Free and paid plans"],
    ],
    prosA: ["Broader feature surface", "Strong coding workflows", "Flexible conversational style"],
    prosB: ["Excellent long-document handling", "Strong analytical summaries", "Good fit for editorial work"],
    verdict:
      "Choose ChatGPT for broader feature coverage and coding-heavy work. Choose Claude when long documents, analysis, and deliberate writing quality matter most.",
    relatedTools: [
      { href: "/tools/word-counter", label: "Word Counter" },
      { href: "/tools/text-case-converter", label: "Text Case Converter" },
      { href: "/blog/png-vs-jpg-vs-webp-vs-avif-complete-comparison", label: "Image format comparison" },
    ],
  },
  {
    slug: "gemini-vs-copilot",
    title: "Gemini vs Microsoft Copilot",
    description:
      "Compare Gemini and Microsoft Copilot for Office workflows, research, collaboration, and enterprise productivity.",
    updated: "January 2026",
    readTime: "9 min read",
    category: "Productivity AI",
    overview:
      "Gemini and Microsoft Copilot target productivity, but the surrounding ecosystem changes the decision. Gemini fits best for Google Workspace users, while Copilot becomes most valuable inside Microsoft 365, Teams, Outlook, and spreadsheet-heavy business workflows.",
    table: [
      ["Primary strength", "Google-native productivity", "Microsoft 365 integration"],
      ["Best use case", "Workspace collaboration", "Office and enterprise workflows"],
      ["Research fit", "Strong web-connected tasks", "Strong document and spreadsheet tasks"],
      ["Pricing", "Free and paid plans", "Paid and enterprise plans"],
    ],
    prosA: ["Works well in Google Workspace", "Helpful for research and drafting", "Good multimodal support"],
    prosB: ["Deep Office integration", "Strong Excel and document workflows", "Enterprise familiarity"],
    verdict:
      "Choose Gemini when your team runs on Google Workspace. Choose Copilot when Microsoft 365 is already the center of your communication and document stack.",
    relatedTools: [
      { href: "/tools/word-counter", label: "Word Counter" },
      { href: "/tools/pdf-to-jpg", label: "PDF to JPG Converter" },
      { href: "/blog/webp-vs-jpg-seo-2026", label: "SEO image format guide" },
    ],
  },
];

export function getComparisonBySlug(slug) {
  return comparisons.find((item) => item.slug === slug);
}
