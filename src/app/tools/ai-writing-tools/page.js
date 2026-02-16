"use client";

import { useState } from "react";
import Link from "next/link";
import ToolCard from "@/components/ToolCard";

const subcategories = [
  { id: "blogs", name: "Blogs", icon: "📝" },
  { id: "copywriting", name: "Copywriting", icon: "✍️" },
  { id: "emails", name: "Emails", icon: "📧" },
  { id: "resume-sop", name: "Resume & SOP", icon: "📄" },
];

const toolsBySubcategory = {
  blogs: [
    {
      id: 1,
      name: "Jasper AI",
      description: "AI blog writer that creates SEO-optimized, engaging blog posts from outlines and keywords.",
      useCase: "Content Creation",
      category: "Writing",
      pricing: "Paid",
      slug: "jasper-ai",
      icon: "📝",
    },
    {
      id: 2,
      name: "Copy.ai",
      description: "AI blog post generator with multiple templates, tones, and SEO optimization features.",
      useCase: "Content Creation",
      category: "Writing",
      pricing: "Free",
      slug: "copy-ai",
      icon: "📄",
    },
    {
      id: 3,
      name: "Writesonic",
      description: "AI blog writer that generates long-form content, outlines, and SEO-optimized articles.",
      useCase: "Content Creation",
      category: "Writing",
      pricing: "Paid",
      slug: "writesonic",
      icon: "🚀",
    },
    {
      id: 4,
      name: "Rytr",
      description: "AI writing tool for blog posts with multiple tones, languages, and content types.",
      useCase: "Content Creation",
      category: "Writing",
      pricing: "Free",
      slug: "rytr",
      icon: "✍️",
    },
    {
      id: 5,
      name: "ChatGPT",
      description: "Versatile AI assistant for blog writing, research, and content ideation.",
      useCase: "Writing & Content",
      category: "Chatbot",
      pricing: "Free",
      slug: "chatgpt",
      icon: "💬",
    },
    {
      id: 6,
      name: "Grammarly",
      description: "AI writing assistant that improves grammar, style, and clarity for blog content.",
      useCase: "Writing & Editing",
      category: "Productivity",
      pricing: "Free",
      slug: "grammarly",
      icon: "✨",
    },
  ],
  copywriting: [
    {
      id: 7,
      name: "Jasper AI",
      description: "AI copywriter for ads, landing pages, product descriptions, and marketing copy.",
      useCase: "Content Creation",
      category: "Marketing",
      pricing: "Paid",
      slug: "jasper-ai",
      icon: "📝",
    },
    {
      id: 8,
      name: "Copy.ai",
      description: "AI copywriting tool for ads, social media, emails, and marketing campaigns.",
      useCase: "Content Creation",
      category: "Marketing",
      pricing: "Free",
      slug: "copy-ai",
      icon: "📄",
    },
    {
      id: 9,
      name: "Claude AI",
      description: "Advanced AI assistant for copywriting with brand voice customization and A/B testing.",
      useCase: "Content Creation",
      category: "Chatbot",
      pricing: "Free",
      slug: "claude-ai",
      icon: "🤖",
    },
    {
      id: 10,
      name: "Writesonic",
      description: "AI copywriter for sales pages, ad copy, and conversion-optimized content.",
      useCase: "Content Creation",
      category: "Marketing",
      pricing: "Paid",
      slug: "writesonic",
      icon: "🚀",
    },
    {
      id: 11,
      name: "CopySmith",
      description: "AI copywriting platform for e-commerce product descriptions and marketing copy.",
      useCase: "Content Creation",
      category: "Marketing",
      pricing: "Paid",
      slug: "copysmith",
      icon: "🛍️",
    },
  ],
  emails: [
    {
      id: 12,
      name: "Grammarly",
      description: "AI email writing assistant that improves clarity, tone, and professionalism.",
      useCase: "Email Writing",
      category: "Productivity",
      pricing: "Free",
      slug: "grammarly",
      icon: "✍️",
    },
    {
      id: 13,
      name: "Flowrite",
      description: "AI email composer that turns brief instructions into professional, well-structured emails.",
      useCase: "Email Writing",
      category: "Productivity",
      pricing: "Paid",
      slug: "flowrite",
      icon: "📧",
    },
    {
      id: 14,
      name: "Copy.ai",
      description: "Generate professional business emails, follow-ups, and cold outreach messages.",
      useCase: "Email Writing",
      category: "Marketing",
      pricing: "Free",
      slug: "copy-ai",
      icon: "📝",
    },
    {
      id: 15,
      name: "Lavender",
      description: "AI email coach that provides real-time suggestions to improve email performance and responses.",
      useCase: "Email Writing",
      category: "Sales",
      pricing: "Paid",
      slug: "lavender",
      icon: "💜",
    },
    {
      id: 16,
      name: "ChatGPT",
      description: "AI assistant for writing professional emails, responses, and business communications.",
      useCase: "Email Writing",
      category: "Chatbot",
      pricing: "Free",
      slug: "chatgpt",
      icon: "💬",
    },
  ],
  "resume-sop": [
    {
      id: 17,
      name: "Resume.io AI",
      description: "AI-powered resume builder with templates, ATS optimization, and personalized suggestions.",
      useCase: "Resume Building",
      category: "Career",
      pricing: "Free",
      slug: "resume-io-ai",
      icon: "📄",
    },
    {
      id: 18,
      name: "Rezi AI",
      description: "ATS-optimized resume builder with AI writing assistance and real-time feedback.",
      useCase: "Resume Building",
      category: "Career",
      pricing: "Free",
      slug: "rezi-ai",
      icon: "✨",
    },
    {
      id: 19,
      name: "ChatGPT",
      description: "AI assistant for writing resumes, cover letters, and Statements of Purpose (SOP).",
      useCase: "Resume Building",
      category: "Chatbot",
      pricing: "Free",
      slug: "chatgpt",
      icon: "💬",
    },
    {
      id: 20,
      name: "Grammarly",
      description: "AI writing assistant for polishing resumes, SOPs, and professional documents.",
      useCase: "Writing & Editing",
      category: "Productivity",
      pricing: "Free",
      slug: "grammarly",
      icon: "✍️",
    },
    {
      id: 21,
      name: "Jasper AI",
      description: "AI writing tool for creating compelling resumes, SOPs, and personal statements.",
      useCase: "Resume Building",
      category: "Writing",
      pricing: "Paid",
      slug: "jasper-ai",
      icon: "📝",
    },
    {
      id: 22,
      name: "Copy.ai",
      description: "AI assistant for writing resume bullet points, cover letters, and SOP content.",
      useCase: "Resume Building",
      category: "Writing",
      pricing: "Free",
      slug: "copy-ai",
      icon: "📄",
    },
  ],
};

export default function AIWritingToolsPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState(subcategories[0].id);

  const currentTools = toolsBySubcategory[selectedSubcategory] || [];

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--border-opacity-80)]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--accent-opacity-6)] via-transparent to-transparent" />
        
        <div className="relative px-4 sm:px-6 lg:px-8 pt-12 pb-8 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-opacity-10)] text-[var(--accent)] px-4 py-2 mb-4 text-sm font-semibold">
              ✍️ Writing Tools
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              AI Writing Tools
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-8">
              Enhance your writing with AI-powered tools for blogs, copywriting, emails, resumes, and more. 
              Create compelling content faster, improve clarity and style, and achieve better results with 
              intelligent writing assistance.
            </p>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-8">
              <Link href="/tools" className="hover:text-[var(--accent)] transition">
                Tools
              </Link>
              <span>→</span>
              <span className="text-[var(--text-primary)]">AI Writing Tools</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Subcategory Tabs */}
      <section className="sticky top-0 z-40 bg-[var(--bg)]/80 backdrop-blur-lg border-b border-[var(--border-opacity-80)] px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {subcategories.map((subcat) => (
              <button
                key={subcat.id}
                onClick={() => setSelectedSubcategory(subcat.id)}
                className={`whitespace-nowrap flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                  selectedSubcategory === subcat.id
                    ? "bg-[var(--accent)] text-white shadow-lg"
                    : "bg-[var(--surface-opacity-5)] border border-[var(--border-opacity-80)] text-[var(--text-secondary)] hover:border-[var(--accent-opacity-60)]"
                }`}
              >
                <span>{subcat.icon}</span>
                {subcat.name}
                <span className="text-xs opacity-75">({toolsBySubcategory[subcat.id]?.length || 0})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        <div className="prose prose-lg max-w-none mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[var(--text-primary)]">
            {subcategories.find(s => s.id === selectedSubcategory)?.name}
          </h2>
          <div className="text-[var(--text-secondary)] leading-relaxed space-y-4">
            {selectedSubcategory === "blogs" && (
              <>
                <p>
                  AI blog writing tools transform content creation by helping writers produce high-quality, 
                  SEO-optimized blog posts faster. These intelligent systems analyze topics, generate outlines, 
                  create engaging content, and optimize for search engines. They understand audience preferences, 
                  writing best practices, and can adapt to different tones and styles, making blog writing more 
                  efficient and effective.
                </p>
                <p>
                  From generating ideas to polishing final drafts, AI blog tools support every stage of the writing 
                  process. They can research topics, create structured outlines, write engaging introductions and 
                  conclusions, and suggest improvements. This technology enables content creators to maintain 
                  consistent publishing schedules while improving content quality and SEO performance.
                </p>
              </>
            )}
            {selectedSubcategory === "copywriting" && (
              <>
                <p>
                  AI copywriting tools help marketers and businesses create compelling, conversion-focused copy 
                  for ads, landing pages, and marketing campaigns. These tools understand consumer psychology, 
                  marketing principles, and conversion optimization techniques. They generate multiple variations, 
                  test different approaches, and optimize copy for specific audiences and goals.
                </p>
                <p>
                  Modern AI copywriters can adapt to brand voice, generate A/B test variations, and create copy 
                  for various formats - from social media ads to email campaigns. They analyze successful copy 
                  patterns, suggest improvements, and help businesses create more effective marketing messages. 
                  This technology empowers marketers to scale their copywriting efforts while maintaining quality 
                  and improving conversion rates.
                </p>
              </>
            )}
            {selectedSubcategory === "emails" && (
              <>
                <p>
                  AI email writing tools help professionals craft clear, professional, and effective emails that 
                  get responses. These intelligent assistants understand email best practices, tone, and structure. 
                  They can generate entire emails from brief prompts, improve existing drafts, and even predict 
                  email performance. This saves time while improving communication effectiveness.
                </p>
                <p>
                  From business communications to sales outreach, AI email tools adapt to different contexts and 
                  purposes. They ensure proper grammar, appropriate tone, and clear messaging. Some tools even 
                  analyze recipient data to personalize emails and improve response rates. This technology helps 
                  professionals maintain better email communication while reducing the time spent on writing and 
                  editing.
                </p>
              </>
            )}
            {selectedSubcategory === "resume-sop" && (
              <>
                <p>
                  AI tools for resumes and Statements of Purpose (SOP) help job seekers and students create 
                  compelling, professional documents that stand out. These intelligent systems optimize content 
                  for Applicant Tracking Systems (ATS), suggest powerful action verbs, and ensure proper formatting. 
                  They help highlight relevant skills and experiences while maintaining professional standards.
                </p>
                <p>
                  For resumes, AI tools analyze job descriptions and tailor content to match requirements. For SOPs, 
                  they help structure narratives, improve clarity, and ensure all necessary elements are included. 
                  These tools provide real-time feedback, suggest improvements, and help create documents that 
                  effectively communicate your value and qualifications to employers and admissions committees.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">
            Best {subcategories.find(s => s.id === selectedSubcategory)?.name} Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-gradient-to-br from-[var(--accent-opacity-10)] to-transparent p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Start Writing Better Content Today</h2>
          <p className="text-lg text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
            Join thousands of writers, marketers, and professionals who are using AI tools to create 
            better content faster. Transform your writing process with intelligent assistance.
          </p>
          <Link
            href="/tools"
            className="inline-block rounded-lg bg-[var(--accent)] text-white px-6 py-3 font-semibold hover:opacity-90 transition"
          >
            Explore All Writing Tools →
          </Link>
        </div>
      </section>
    </main>
  );
}
