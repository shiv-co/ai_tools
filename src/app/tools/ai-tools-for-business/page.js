"use client";

import { useState } from "react";
import Link from "next/link";
import ToolCard from "@/components/ToolCard";

const subcategories = [
  { id: "marketing", name: "Marketing AI", icon: "📢" },
  { id: "email", name: "Email Writing", icon: "📧" },
  { id: "chatbots", name: "Chatbots", icon: "💬" },
  { id: "crm", name: "CRM AI", icon: "📊" },
];

const toolsBySubcategory = {
  marketing: [
    {
      id: 1,
      name: "Jasper AI",
      description: "AI marketing copywriter for ads, landing pages, social media, and email campaigns.",
      useCase: "Content Creation",
      category: "Marketing",
      pricing: "Paid",
      slug: "jasper-ai",
      icon: "📝",
    },
    {
      id: 2,
      name: "Copy.ai",
      description: "AI-powered marketing copy generator for ads, product descriptions, and campaigns.",
      useCase: "Content Creation",
      category: "Marketing",
      pricing: "Free",
      slug: "copy-ai",
      icon: "📄",
    },
    {
      id: 3,
      name: "Surfer SEO",
      description: "AI SEO tool that helps optimize content for search engines and improve rankings.",
      useCase: "SEO",
      category: "Marketing",
      pricing: "Paid",
      slug: "surfer-seo",
      icon: "🔍",
    },
    {
      id: 4,
      name: "Frase.io",
      description: "AI content optimization tool for creating SEO-friendly marketing content.",
      useCase: "SEO",
      category: "Marketing",
      pricing: "Paid",
      slug: "frase-io",
      icon: "✨",
    },
    {
      id: 5,
      name: "Outranking",
      description: "AI content strategy tool that helps create and optimize marketing content at scale.",
      useCase: "Content Creation",
      category: "Marketing",
      pricing: "Paid",
      slug: "outranking",
      icon: "🚀",
    },
  ],
  email: [
    {
      id: 6,
      name: "Grammarly",
      description: "AI email writing assistant that improves clarity, tone, and professionalism.",
      useCase: "Writing & Editing",
      category: "Productivity",
      pricing: "Free",
      slug: "grammarly",
      icon: "✍️",
    },
    {
      id: 7,
      name: "Flowrite",
      description: "AI email composer that turns short instructions into professional emails instantly.",
      useCase: "Email Writing",
      category: "Productivity",
      pricing: "Paid",
      slug: "flowrite",
      icon: "📧",
    },
    {
      id: 8,
      name: "Lavender",
      description: "AI email coach that provides real-time suggestions to improve email performance.",
      useCase: "Email Writing",
      category: "Sales",
      pricing: "Paid",
      slug: "lavender",
      icon: "💜",
    },
    {
      id: 9,
      name: "Copy.ai",
      description: "Generate professional business emails, follow-ups, and cold outreach messages.",
      useCase: "Email Writing",
      category: "Marketing",
      pricing: "Free",
      slug: "copy-ai",
      icon: "📝",
    },
    {
      id: 10,
      name: "Superhuman AI",
      description: "AI-powered email client with smart compose and intelligent email management.",
      useCase: "Email Writing",
      category: "Productivity",
      pricing: "Paid",
      slug: "superhuman-ai",
      icon: "⚡",
    },
  ],
  chatbots: [
    {
      id: 11,
      name: "ChatGPT",
      description: "Advanced AI chatbot for customer support, lead generation, and business automation.",
      useCase: "Customer Support",
      category: "Chatbot",
      pricing: "Free",
      slug: "chatgpt",
      icon: "💬",
    },
    {
      id: 12,
      name: "Intercom",
      description: "AI-powered customer messaging platform with chatbots and automated responses.",
      useCase: "Customer Support",
      category: "Chatbot",
      pricing: "Paid",
      slug: "intercom",
      icon: "💬",
    },
    {
      id: 13,
      name: "Drift",
      description: "Conversational AI platform for sales and marketing with intelligent chatbots.",
      useCase: "Sales",
      category: "Chatbot",
      pricing: "Paid",
      slug: "drift",
      icon: "🤖",
    },
    {
      id: 14,
      name: "Zendesk AI",
      description: "AI chatbot for customer service with natural language understanding and automation.",
      useCase: "Customer Support",
      category: "Chatbot",
      pricing: "Paid",
      slug: "zendesk-ai",
      icon: "🎧",
    },
    {
      id: 15,
      name: "Tidio",
      description: "AI chatbot builder for websites with live chat and automated customer support.",
      useCase: "Customer Support",
      category: "Chatbot",
      pricing: "Free",
      slug: "tidio",
      icon: "💬",
    },
  ],
  crm: [
    {
      id: 16,
      name: "Salesforce Einstein",
      description: "AI-powered CRM with predictive analytics, lead scoring, and automated insights.",
      useCase: "CRM",
      category: "Sales",
      pricing: "Paid",
      slug: "salesforce-einstein",
      icon: "☁️",
    },
    {
      id: 17,
      name: "HubSpot AI",
      description: "AI-enhanced CRM with content generation, email optimization, and sales automation.",
      useCase: "CRM",
      category: "Sales",
      pricing: "Free",
      slug: "hubspot-ai",
      icon: "🎯",
    },
    {
      id: 18,
      name: "Pipedrive AI",
      description: "AI sales assistant that predicts deal outcomes and suggests next best actions.",
      useCase: "CRM",
      category: "Sales",
      pricing: "Paid",
      slug: "pipedrive-ai",
      icon: "📈",
    },
    {
      id: 19,
      name: "Zoho CRM AI",
      description: "AI-powered CRM with sales predictions, lead scoring, and workflow automation.",
      useCase: "CRM",
      category: "Sales",
      pricing: "Paid",
      slug: "zoho-crm-ai",
      icon: "📊",
    },
    {
      id: 20,
      name: "Copper AI",
      description: "AI-enhanced CRM for G Suite with intelligent contact management and insights.",
      useCase: "CRM",
      category: "Sales",
      pricing: "Paid",
      slug: "copper-ai",
      icon: "🔗",
    },
  ],
};

export default function AIToolsForBusinessPage() {
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
              💼 For Business
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              AI Tools for Business
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-8">
              Transform your business operations with AI-powered tools designed for marketing, sales, 
              customer service, and CRM. Discover solutions that automate workflows, improve efficiency, 
              and drive growth for businesses of all sizes.
            </p>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-8">
              <Link href="/tools" className="hover:text-[var(--accent)] transition">
                Tools
              </Link>
              <span>→</span>
              <span className="text-[var(--text-primary)]">AI Tools for Business</span>
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
            {selectedSubcategory === "marketing" && (
              <>
                <p>
                  AI marketing tools revolutionize how businesses create, optimize, and distribute marketing content. 
                  These intelligent systems analyze audience data, generate compelling copy, optimize for SEO, and 
                  automate campaign management. They help businesses create more effective marketing strategies, 
                  improve ROI, and scale their marketing efforts without proportionally increasing costs.
                </p>
                <p>
                  From content creation to performance analytics, AI marketing tools understand consumer behavior, 
                  predict trends, and optimize campaigns in real-time. They can generate ad copy, create landing pages, 
                  optimize social media posts, and provide actionable insights. This technology enables businesses to 
                  compete effectively in today's digital marketplace while reducing manual work and improving results.
                </p>
              </>
            )}
            {selectedSubcategory === "email" && (
              <>
                <p>
                  AI email writing tools help businesses craft professional, effective emails that get responses. 
                  These intelligent assistants analyze email performance data, suggest improvements, and generate 
                  personalized content. They ensure your emails are clear, professional, and optimized for engagement, 
                  whether you're reaching out to customers, partners, or prospects.
                </p>
                <p>
                  Modern AI email tools understand context, tone, and best practices for different email types - from 
                  sales outreach to customer support. They can generate entire emails from brief prompts, improve 
                  existing drafts, and even predict email performance. This saves time while improving communication 
                  effectiveness and professional image.
                </p>
              </>
            )}
            {selectedSubcategory === "chatbots" && (
              <>
                <p>
                  AI chatbots transform customer service and sales by providing instant, 24/7 support and lead 
                  qualification. These intelligent conversational agents understand natural language, answer questions, 
                  handle common inquiries, and escalate complex issues to human agents. They improve customer 
                  satisfaction while reducing support costs and response times.
                </p>
                <p>
                  Advanced AI chatbots can handle complex conversations, learn from interactions, and integrate with 
                  business systems. They qualify leads, schedule appointments, process orders, and provide personalized 
                  recommendations. This technology enables businesses to scale their customer service and sales efforts 
                  without proportionally increasing staff, resulting in better customer experiences and improved efficiency.
                </p>
              </>
            )}
            {selectedSubcategory === "crm" && (
              <>
                <p>
                  AI-powered CRM systems transform customer relationship management with predictive analytics, 
                  automated insights, and intelligent recommendations. These systems analyze customer data, predict 
                  behavior, score leads, and suggest next best actions. They help sales teams close more deals, 
                  improve customer relationships, and optimize sales processes.
                </p>
                <p>
                  Modern AI CRM tools automatically update records, predict deal outcomes, identify at-risk customers, 
                  and recommend optimal contact times. They analyze communication patterns, suggest personalized 
                  approaches, and automate routine tasks. This empowers sales teams to focus on building relationships 
                  and closing deals while AI handles data management and provides strategic insights.
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
            Start using AI tools today and experience improved efficiency, better customer relationships, 
            and increased revenue. Join thousands of businesses already leveraging AI for competitive advantage.
          </p>
          <Link
            href="/tools"
            className="inline-block rounded-lg bg-[var(--accent)] text-white px-6 py-3 font-semibold hover:opacity-90 transition"
          >
            Explore All Business Tools →
          </Link>
        </div>
      </section>
    </main>
  );
}
