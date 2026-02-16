"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ToolCard from "@/components/ToolCard";

// Sample tools data grouped by category
const toolsByCategory = {
  Chatbot: [
    {
      id: 1,
      name: "ChatGPT",
      description: "Advanced AI chatbot for conversations, writing, and problem-solving.",
      useCase: "Writing & Content",
      category: "Chatbot",
      pricing: "Free",
      slug: "chatgpt",
      icon: "💬",
    },
    {
      id: 11,
      name: "Claude AI",
      description: "Advanced AI assistant for research, analysis, and complex tasks.",
      useCase: "Research",
      category: "Chatbot",
      pricing: "Free",
      slug: "claude-ai",
      icon: "🤖",
    },
  ],
  Creative: [
    {
      id: 2,
      name: "Midjourney",
      description: "AI-powered image generation tool for creating stunning artwork and visuals.",
      useCase: "Image Generation",
      category: "Creative",
      pricing: "Paid",
      slug: "midjourney",
      icon: "🎨",
    },
    {
      id: 5,
      name: "Canva AI",
      description: "Design tool with AI features for creating graphics, presentations, and more.",
      useCase: "Design",
      category: "Creative",
      pricing: "Free",
      slug: "canva-ai",
      icon: "🎨",
    },
    {
      id: 8,
      name: "DALL-E",
      description: "Create images from text descriptions using advanced AI technology.",
      useCase: "Image Generation",
      category: "Creative",
      pricing: "Free",
      slug: "dalle",
      icon: "🖼️",
    },
    {
      id: 10,
      name: "Runway ML",
      description: "Creative AI tools for video editing, image generation, and more.",
      useCase: "Video Editing",
      category: "Creative",
      pricing: "Paid",
      slug: "runway-ml",
      icon: "🎬",
    },
    {
      id: 12,
      name: "Stable Diffusion",
      description: "Open-source AI image generation model for creating unique artwork.",
      useCase: "Image Generation",
      category: "Creative",
      pricing: "Free",
      slug: "stable-diffusion",
      icon: "🎭",
    },
  ],
  Productivity: [
    {
      id: 3,
      name: "Grammarly",
      description: "AI writing assistant that helps improve grammar, clarity, and style.",
      useCase: "Writing & Editing",
      category: "Productivity",
      pricing: "Free",
      slug: "grammarly",
      icon: "✍️",
    },
    {
      id: 4,
      name: "Notion AI",
      description: "AI-powered workspace for notes, docs, and project management.",
      useCase: "Productivity",
      category: "Organization",
      pricing: "Paid",
      slug: "notion-ai",
      icon: "📝",
    },
  ],
  Marketing: [
    {
      id: 6,
      name: "Jasper AI",
      description: "AI copywriting tool for marketing content, blogs, and social media posts.",
      useCase: "Content Creation",
      category: "Marketing",
      pricing: "Paid",
      slug: "jasper-ai",
      icon: "✍️",
    },
    {
      id: 9,
      name: "Copy.ai",
      description: "AI-powered copywriting tool for ads, emails, and marketing content.",
      useCase: "Content Creation",
      category: "Marketing",
      pricing: "Free",
      slug: "copy-ai",
      icon: "📄",
    },
  ],
  Coding: [
    {
      id: 7,
      name: "GitHub Copilot",
      description: "AI pair programmer that helps you write code faster and better.",
      useCase: "Development",
      category: "Coding",
      pricing: "Paid",
      slug: "github-copilot",
      icon: "💻",
    },
  ],
  Organization: [
    {
      id: 4,
      name: "Notion AI",
      description: "AI-powered workspace for notes, docs, and project management.",
      useCase: "Productivity",
      category: "Organization",
      pricing: "Paid",
      slug: "notion-ai",
      icon: "📝",
    },
  ],
};

const categories = Object.keys(toolsByCategory);

export default function AIToolsByCategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const currentTools = useMemo(() => {
    const tools = toolsByCategory[selectedCategory] || [];
    if (!searchQuery) return tools;
    
    return tools.filter((tool) => {
      return (
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.useCase.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--border-opacity-80)]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--accent-opacity-6)] via-transparent to-transparent" />
        
        <div className="relative px-4 sm:px-6 lg:px-8 pt-12 pb-8 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-opacity-10)] text-[var(--accent)] px-4 py-2 mb-4 text-sm font-semibold">
              📁 Browse by Category
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              AI Tools by Category
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-8">
              Explore AI tools organized by category. Find the perfect tool for your specific needs and industry.
            </p>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-8">
              <Link href="/tools" className="hover:text-[var(--accent) transition">
                Tools
              </Link>
              <span>→</span>
              <span className="text-[var(--text-primary)">By Category</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Category Tabs & Search */}
      <section className="sticky top-0 z-40 bg-[var(--bg)/80 backdrop-blur-lg border-b border-[var(--border-opacity-80) px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-[var(--accent) text-white shadow-lg"
                    : "bg-[var(--surface-opacity-5) border border-[var(--border-opacity-80) text-[var(--text-secondary) hover:border-[var(--accent-opacity-60)"
                }`}
              >
                {cat}
                <span className="ml-2 text-xs opacity-75">
                  ({toolsByCategory[cat]?.length || 0})
                </span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder={`Search ${selectedCategory} tools...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-xl border border-[var(--border-opacity-80) bg-[var(--surface-opacity-5) text-[var(--text-primary) placeholder:text-[var(--text-secondary) focus:outline-none focus:border-[var(--accent-opacity-60) focus:ring-2 focus:ring-(--accent-opacity-10) transition"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)">🔍</span>
          </div>
          <div className="mt-4 text-sm text-[var(--text-secondary)">
            Showing <span className="font-semibold text-[var(--text-primary)">{currentTools.length}</span> tools in {selectedCategory}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        {currentTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2 text-[var(--text-primary)">No tools found</h3>
            <p className="text-[var(--text-secondary)">
              Try selecting a different category or adjusting your search.
            </p>
          </div>
        )}
      </section>

      {/* Category Info */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        <div className="rounded-3xl border border-[var(--border-opacity-80) bg-[var(--surface-opacity-5) p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">About {selectedCategory} Tools</h2>
          <p className="text-[var(--text-secondary) leading-relaxed max-w-3xl">
            {selectedCategory === "Chatbot" && "Chatbot AI tools enable natural language conversations, helping with customer support, content creation, research, and problem-solving through advanced language models."}
            {selectedCategory === "Creative" && "Creative AI tools empower artists, designers, and content creators to generate images, videos, designs, and artwork using artificial intelligence."}
            {selectedCategory === "Productivity" && "Productivity AI tools help streamline workflows, automate tasks, improve writing quality, and manage projects more efficiently."}
            {selectedCategory === "Marketing" && "Marketing AI tools assist with copywriting, content creation, ad optimization, and campaign management to boost marketing effectiveness."}
            {selectedCategory === "Coding" && "Coding AI tools act as pair programmers, helping developers write better code faster, debug issues, and learn new programming concepts."}
            {selectedCategory === "Organization" && "Organization AI tools help manage notes, documents, projects, and workflows to keep teams and individuals organized and productive."}
          </p>
        </div>
      </section>
    </main>
  );
}
