"use client";

import { useState } from "react";
import Link from "next/link";
import ToolCard from "@/components/ToolCard";

const subcategories = [
  { id: "code-generators", name: "Code Generators", icon: "💻" },
  { id: "debugging", name: "Debugging AI", icon: "🐛" },
  { id: "documentation", name: "Documentation AI", icon: "📚" },
];

const toolsBySubcategory = {
  "code-generators": [
    {
      id: 1,
      name: "GitHub Copilot",
      description: "AI pair programmer that suggests code and functions in real-time as you type.",
      useCase: "Development",
      category: "Coding",
      pricing: "Paid",
      slug: "github-copilot",
      icon: "💻",
    },
    {
      id: 2,
      name: "ChatGPT",
      description: "AI assistant for code generation, explanation, and debugging across multiple languages.",
      useCase: "Development",
      category: "Chatbot",
      pricing: "Free",
      slug: "chatgpt",
      icon: "💬",
    },
    {
      id: 3,
      name: "Codeium",
      description: "Free AI code completion tool with multi-language support and intelligent suggestions.",
      useCase: "Development",
      category: "Coding",
      pricing: "Free",
      slug: "codeium",
      icon: "⚡",
    },
    {
      id: 4,
      name: "Tabnine",
      description: "AI code completion that learns from your codebase and suggests accurate completions.",
      useCase: "Development",
      category: "Coding",
      pricing: "Paid",
      slug: "tabnine",
      icon: "🚀",
    },
    {
      id: 5,
      name: "Amazon CodeWhisperer",
      description: "AI coding companion that generates code suggestions based on comments and code context.",
      useCase: "Development",
      category: "Coding",
      pricing: "Free",
      slug: "amazon-codewhisperer",
      icon: "☁️",
    },
    {
      id: 6,
      name: "Replit Ghostwriter",
      description: "AI code generation tool integrated into Replit IDE for faster development.",
      useCase: "Development",
      category: "Coding",
      pricing: "Paid",
      slug: "replit-ghostwriter",
      icon: "👻",
    },
  ],
  debugging: [
    {
      id: 7,
      name: "DeepCode",
      description: "AI-powered code review tool that finds bugs, security issues, and code smells.",
      useCase: "Development",
      category: "Coding",
      pricing: "Free",
      slug: "deepcode",
      icon: "🔍",
    },
    {
      id: 8,
      name: "Snyk",
      description: "AI security scanner that finds and fixes vulnerabilities in your code and dependencies.",
      useCase: "Security",
      category: "Coding",
      pricing: "Free",
      slug: "snyk",
      icon: "🔒",
    },
    {
      id: 9,
      name: "CodeQL",
      description: "AI-powered code analysis tool for finding security vulnerabilities and bugs.",
      useCase: "Security",
      category: "Coding",
      pricing: "Free",
      slug: "codeql",
      icon: "🛡️",
    },
    {
      id: 10,
      name: "ChatGPT",
      description: "AI debugging assistant that analyzes error messages and suggests fixes.",
      useCase: "Development",
      category: "Chatbot",
      pricing: "Free",
      slug: "chatgpt",
      icon: "💬",
    },
    {
      id: 11,
      name: "Sourcegraph Cody",
      description: "AI coding assistant that helps debug, explain, and improve code across your codebase.",
      useCase: "Development",
      category: "Coding",
      pricing: "Free",
      slug: "sourcegraph-cody",
      icon: "🔎",
    },
  ],
  documentation: [
    {
      id: 12,
      name: "GitHub Copilot",
      description: "AI assistant that generates code comments and documentation as you write code.",
      useCase: "Development",
      category: "Coding",
      pricing: "Paid",
      slug: "github-copilot",
      icon: "📝",
    },
    {
      id: 13,
      name: "Scribe",
      description: "AI documentation generator that creates step-by-step guides from your actions.",
      useCase: "Documentation",
      category: "Productivity",
      pricing: "Free",
      slug: "scribe",
      icon: "📖",
    },
    {
      id: 14,
      name: "Mintlify",
      description: "AI-powered documentation generator that creates beautiful docs from code comments.",
      useCase: "Documentation",
      category: "Coding",
      pricing: "Free",
      slug: "mintlify",
      icon: "✨",
    },
    {
      id: 15,
      name: "DocuWriter",
      description: "AI tool that automatically generates API documentation from code and comments.",
      useCase: "Documentation",
      category: "Coding",
      pricing: "Free",
      slug: "docuwriter",
      icon: "📄",
    },
    {
      id: 16,
      name: "ChatGPT",
      description: "AI assistant for writing technical documentation, README files, and code explanations.",
      useCase: "Documentation",
      category: "Chatbot",
      pricing: "Free",
      slug: "chatgpt",
      icon: "💬",
    },
  ],
};

export default function AIToolsForDevelopersPage() {
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
              👨‍💻 For Developers
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              AI Tools for Developers
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-8">
              Accelerate your development workflow with AI-powered coding assistants, debugging tools, 
              and documentation generators. Write better code faster, catch bugs earlier, and maintain 
              comprehensive documentation with intelligent automation.
            </p>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-8">
              <Link href="/tools" className="hover:text-[var(--accent)] transition">
                Tools
              </Link>
              <span>→</span>
              <span className="text-[var(--text-primary)]">AI Tools for Developers</span>
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
            {selectedSubcategory === "code-generators" && (
              <>
                <p>
                  AI code generators revolutionize software development by providing intelligent code suggestions, 
                  completions, and generation based on context. These tools understand programming patterns, 
                  best practices, and your codebase to suggest accurate, efficient code. They act as intelligent 
                  pair programmers, helping developers write code faster while maintaining quality and reducing errors.
                </p>
                <p>
                  Modern AI code generators support multiple programming languages, understand project context, 
                  and learn from your coding style. They can generate entire functions from comments, complete 
                  code blocks, suggest optimizations, and even write tests. This technology significantly increases 
                  developer productivity while helping maintain code quality and consistency across projects.
                </p>
              </>
            )}
            {selectedSubcategory === "debugging" && (
              <>
                <p>
                  AI debugging tools use machine learning to identify bugs, security vulnerabilities, and code 
                  quality issues before they cause problems. These intelligent systems analyze code patterns, 
                  error messages, and execution flows to pinpoint issues and suggest fixes. They help developers 
                  catch bugs earlier in the development cycle, reducing debugging time and improving code reliability.
                </p>
                <p>
                  Advanced AI debugging tools can trace through complex codebases, identify root causes, and 
                  suggest specific fixes. They understand common error patterns, security vulnerabilities, and 
                  performance issues. This technology enables developers to maintain higher code quality while 
                  reducing the time spent on debugging and code review processes.
                </p>
              </>
            )}
            {selectedSubcategory === "documentation" && (
              <>
                <p>
                  AI documentation generators automatically create comprehensive, accurate documentation from code, 
                  comments, and project structure. These tools understand code context, generate API documentation, 
                  create README files, and maintain documentation as code evolves. They ensure documentation stays 
                  up-to-date and comprehensive without requiring extensive manual effort.
                </p>
                <p>
                  From inline code comments to full API documentation, AI documentation tools understand code 
                  structure and generate appropriate documentation. They can create tutorials, explain complex 
                  functions, and generate examples. This technology helps teams maintain better documentation 
                  practices, making codebases more accessible and maintainable for current and future developers.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">
            Top {subcategories.find(s => s.id === selectedSubcategory)?.name} Tools
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Level Up Your Development Skills</h2>
          <p className="text-lg text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
            Join thousands of developers who are using AI tools to write better code, debug faster, 
            and maintain better documentation. Transform your development workflow with AI assistance.
          </p>
          <Link
            href="/tools"
            className="inline-block rounded-lg bg-[var(--accent)] text-white px-6 py-3 font-semibold hover:opacity-90 transition"
          >
            Explore All Developer Tools →
          </Link>
        </div>
      </section>
    </main>
  );
}
