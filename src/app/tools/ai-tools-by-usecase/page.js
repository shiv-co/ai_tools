"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ToolCard from "@/components/ToolCard";

// Sample tools data grouped by use case
const toolsByUseCase = {
  "Writing & Content": [
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
      id: 3,
      name: "Grammarly",
      description: "AI writing assistant that helps improve grammar, clarity, and style.",
      useCase: "Writing & Editing",
      category: "Productivity",
      pricing: "Free",
      slug: "grammarly",
      icon: "✍️",
    },
  ],
  "Image Generation": [
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
  "Video Editing": [
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
  ],
  "Content Creation": [
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
  "Development": [
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
  "Design": [
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
  ],
  "Research": [
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
};

const useCases = Object.keys(toolsByUseCase);

export default function AIToolsByUseCasePage() {
  const [selectedUseCase, setSelectedUseCase] = useState(useCases[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const currentTools = useMemo(() => {
    const tools = toolsByUseCase[selectedUseCase] || [];
    if (!searchQuery) return tools;
    
    return tools.filter((tool) => {
      return (
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [selectedUseCase, searchQuery]);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--border-opacity-80)]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--accent-opacity-6)] via-transparent to-transparent" />
        
        <div className="relative px-4 sm:px-6 lg:px-8 pt-12 pb-8 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-opacity-10)] text-[var(--accent)] px-4 py-2 mb-4 text-sm font-semibold">
              🎯 Find by Use Case
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              AI Tools by Use Case
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-8">
              Discover AI tools based on what you want to accomplish. Find the perfect solution for your specific task or workflow.
            </p>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-8">
              <Link href="/tools" className="hover:text-[var(--accent) transition">
                Tools
              </Link>
              <span>→</span>
              <span className="text-[var(--text-primary)">By Use Case</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Use Case Tabs & Search */}
      <section className="sticky top-0 z-40 bg-[var(--bg)/80 backdrop-blur-lg border-b border-[var(--border-opacity-80) px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          {/* Use Case Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
            {useCases.map((useCase) => (
              <button
                key={useCase}
                onClick={() => setSelectedUseCase(useCase)}
                className={`whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                  selectedUseCase === useCase
                    ? "bg-[var(--accent) text-white shadow-lg"
                    : "bg-[var(--surface-opacity-5) border border-[var(--border-opacity-80) text-[var(--text-secondary) hover:border-[var(--accent-opacity-60)"
                }`}
              >
                {useCase}
                <span className="ml-2 text-xs opacity-75">
                  ({toolsByUseCase[useCase]?.length || 0})
                </span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder={`Search ${selectedUseCase} tools...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-xl border border-[var(--border-opacity-80) bg-[var(--surface-opacity-5) text-[var(--text-primary) placeholder:text-[var(--text-secondary) focus:outline-none focus:border-[var(--accent-opacity-60) focus:ring-2 focus:ring-(--accent-opacity-10) transition"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)">🔍</span>
          </div>
          <div className="mt-4 text-sm text-[var(--text-secondary)">
            Showing <span className="font-semibold text-[var(--text-primary)">{currentTools.length}</span> tools for {selectedUseCase}
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
              Try selecting a different use case or adjusting your search.
            </p>
          </div>
        )}
      </section>

      {/* Use Case Info */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        <div className="rounded-3xl border border-[var(--border-opacity-80) bg-[var(--surface-opacity-5) p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">About {selectedUseCase} Tools</h2>
          <p className="text-[var(--text-secondary) leading-relaxed max-w-3xl mb-6">
            {selectedUseCase === "Writing & Content" && "Writing and content AI tools help you create, edit, and improve written content including articles, blog posts, emails, and more. These tools can assist with grammar, style, tone, and even generate entire pieces of content."}
            {selectedUseCase === "Image Generation" && "Image generation AI tools create stunning visuals, artwork, and graphics from text descriptions. Perfect for designers, marketers, and content creators who need unique imagery."}
            {selectedUseCase === "Video Editing" && "Video editing AI tools automate and enhance video production workflows, from automatic cuts and transitions to color grading and effects."}
            {selectedUseCase === "Content Creation" && "Content creation AI tools help generate marketing copy, social media posts, ad campaigns, and other promotional content quickly and effectively."}
            {selectedUseCase === "Development" && "Development AI tools assist programmers with coding, debugging, code review, and learning new programming languages or frameworks."}
            {selectedUseCase === "Design" && "Design AI tools help create graphics, layouts, presentations, and visual content with intelligent suggestions and automation."}
            {selectedUseCase === "Research" && "Research AI tools help analyze data, summarize information, answer complex questions, and assist with academic or professional research tasks."}
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <div className="rounded-xl border border-[var(--border-opacity-80) bg-[var(--surface-opacity-5) p-4">
              <h3 className="font-semibold mb-2">Best For</h3>
              <p className="text-sm text-[var(--text-secondary)">
                {selectedUseCase === "Writing & Content" && "Bloggers, content writers, students, marketers"}
                {selectedUseCase === "Image Generation" && "Designers, artists, marketers, content creators"}
                {selectedUseCase === "Video Editing" && "Video creators, YouTubers, filmmakers, marketers"}
                {selectedUseCase === "Content Creation" && "Marketers, social media managers, copywriters"}
                {selectedUseCase === "Development" && "Software developers, programmers, students"}
                {selectedUseCase === "Design" && "Graphic designers, marketers, presentation creators"}
                {selectedUseCase === "Research" && "Researchers, students, analysts, professionals"}
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border-opacity-80) bg-[var(--surface-opacity-5) p-4">
              <h3 className="font-semibold mb-2">Key Benefits</h3>
              <p className="text-sm text-[var(--text-secondary)">
                {selectedUseCase === "Writing & Content" && "Save time, improve quality, maintain consistency"}
                {selectedUseCase === "Image Generation" && "Create unique visuals, unlimited variations, fast iteration"}
                {selectedUseCase === "Video Editing" && "Automate workflows, enhance quality, reduce editing time"}
                {selectedUseCase === "Content Creation" && "Generate ideas, write faster, optimize for engagement"}
                {selectedUseCase === "Development" && "Code faster, catch bugs, learn new technologies"}
                {selectedUseCase === "Design" && "Create professional designs, maintain brand consistency, save time"}
                {selectedUseCase === "Research" && "Analyze data faster, get insights, summarize information"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
