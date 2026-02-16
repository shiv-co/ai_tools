"use client";

import { useState } from "react";
import Link from "next/link";
import ToolCard from "@/components/ToolCard";

const subcategories = [
  { id: "youtube-scripts", name: "YouTube Scripts", icon: "🎬" },
  { id: "instagram-captions", name: "Instagram Captions", icon: "📱" },
  { id: "thumbnails", name: "Thumbnail Generators", icon: "🖼️" },
  { id: "video-editing", name: "Video Editing AI", icon: "✂️" },
];

const toolsBySubcategory = {
  "youtube-scripts": [
    {
      id: 1,
      name: "Jasper AI",
      description: "AI script writer for YouTube videos with engaging hooks, structure, and call-to-actions.",
      useCase: "Content Creation",
      category: "Writing",
      pricing: "Paid",
      slug: "jasper-ai",
      icon: "📝",
    },
    {
      id: 2,
      name: "Copy.ai",
      description: "Generate YouTube video scripts with AI-powered storytelling and audience engagement techniques.",
      useCase: "Content Creation",
      category: "Writing",
      pricing: "Free",
      slug: "copy-ai",
      icon: "📄",
    },
    {
      id: 3,
      name: "ChatGPT",
      description: "Versatile AI assistant for writing YouTube scripts, brainstorming ideas, and optimizing content.",
      useCase: "Writing & Content",
      category: "Chatbot",
      pricing: "Free",
      slug: "chatgpt",
      icon: "💬",
    },
    {
      id: 4,
      name: "Writesonic",
      description: "AI script generator for YouTube with SEO optimization and viral hook suggestions.",
      useCase: "Content Creation",
      category: "Writing",
      pricing: "Paid",
      slug: "writesonic",
      icon: "🚀",
    },
    {
      id: 5,
      name: "Rytr",
      description: "AI writing tool for YouTube scripts with multiple tones and style options.",
      useCase: "Content Creation",
      category: "Writing",
      pricing: "Free",
      slug: "rytr",
      icon: "✍️",
    },
  ],
  "instagram-captions": [
    {
      id: 6,
      name: "Copy.ai",
      description: "Generate engaging Instagram captions with hashtags, emojis, and multiple tone options.",
      useCase: "Content Creation",
      category: "Marketing",
      pricing: "Free",
      slug: "copy-ai",
      icon: "📱",
    },
    {
      id: 7,
      name: "Jasper AI",
      description: "AI-powered Instagram caption writer with brand voice customization and hashtag suggestions.",
      useCase: "Content Creation",
      category: "Marketing",
      pricing: "Paid",
      slug: "jasper-ai",
      icon: "✨",
    },
    {
      id: 8,
      name: "Lately AI",
      description: "Social media content generator that creates Instagram captions optimized for engagement.",
      useCase: "Content Creation",
      category: "Marketing",
      pricing: "Paid",
      slug: "lately-ai",
      icon: "📊",
    },
    {
      id: 9,
      name: "Flick AI",
      description: "Instagram caption generator with hashtag research and engagement optimization.",
      useCase: "Content Creation",
      category: "Marketing",
      pricing: "Free",
      slug: "flick-ai",
      icon: "🎯",
    },
    {
      id: 10,
      name: "Hootsuite AI",
      description: "Social media management tool with AI caption generation for Instagram posts.",
      useCase: "Content Creation",
      category: "Marketing",
      pricing: "Paid",
      slug: "hootsuite-ai",
      icon: "🦉",
    },
  ],
  thumbnails: [
    {
      id: 11,
      name: "Canva AI",
      description: "AI-powered thumbnail generator with templates, text overlays, and design suggestions.",
      useCase: "Design",
      category: "Creative",
      pricing: "Free",
      slug: "canva-ai",
      icon: "🎨",
    },
    {
      id: 12,
      name: "Midjourney",
      description: "AI image generation for creating unique, eye-catching YouTube thumbnails.",
      useCase: "Image Generation",
      category: "Creative",
      pricing: "Paid",
      slug: "midjourney",
      icon: "🖼️",
    },
    {
      id: 13,
      name: "DALL-E",
      description: "Generate custom thumbnail images from text descriptions with AI creativity.",
      useCase: "Image Generation",
      category: "Creative",
      pricing: "Free",
      slug: "dalle",
      icon: "🎭",
    },
    {
      id: 14,
      name: "Thumbnail.ai",
      description: "Specialized AI thumbnail generator for YouTube with A/B testing and optimization.",
      useCase: "Design",
      category: "Creative",
      pricing: "Free",
      slug: "thumbnail-ai",
      icon: "📸",
    },
    {
      id: 15,
      name: "Stable Diffusion",
      description: "Open-source AI for generating custom thumbnail artwork and designs.",
      useCase: "Image Generation",
      category: "Creative",
      pricing: "Free",
      slug: "stable-diffusion",
      icon: "🎨",
    },
  ],
  "video-editing": [
    {
      id: 16,
      name: "Runway ML",
      description: "AI video editing with automatic cuts, transitions, color grading, and effects.",
      useCase: "Video Editing",
      category: "Creative",
      pricing: "Paid",
      slug: "runway-ml",
      icon: "🎬",
    },
    {
      id: 17,
      name: "Descript",
      description: "AI-powered video editor with transcription, automatic editing, and voice cloning.",
      useCase: "Video Editing",
      category: "Creative",
      pricing: "Paid",
      slug: "descript",
      icon: "✂️",
    },
    {
      id: 18,
      name: "Synthesia",
      description: "AI video generation platform for creating videos with virtual avatars and voices.",
      useCase: "Video Editing",
      category: "Creative",
      pricing: "Paid",
      slug: "synthesia",
      icon: "🤖",
    },
    {
      id: 19,
      name: "Kapwing AI",
      description: "Online video editor with AI features for auto-captions, resizing, and effects.",
      useCase: "Video Editing",
      category: "Creative",
      pricing: "Free",
      slug: "kapwing-ai",
      icon: "🎥",
    },
    {
      id: 20,
      name: "Pictory AI",
      description: "AI video creation from scripts and articles with automatic scene generation.",
      useCase: "Video Editing",
      category: "Creative",
      pricing: "Paid",
      slug: "pictory-ai",
      icon: "📹",
    },
  ],
};

export default function AIToolsForCreatorsPage() {
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
              🎨 For Creators
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              AI Tools for Creators
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-8">
              Elevate your content creation with AI-powered tools designed for YouTubers, Instagram influencers, 
              and digital creators. From script writing to video editing, discover tools that help you create 
              engaging content faster and more efficiently.
            </p>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-8">
              <Link href="/tools" className="hover:text-[var(--accent)] transition">
                Tools
              </Link>
              <span>→</span>
              <span className="text-[var(--text-primary)]">AI Tools for Creators</span>
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
            {selectedSubcategory === "youtube-scripts" && (
              <>
                <p>
                  AI YouTube script generators revolutionize content creation by helping creators write engaging, 
                  well-structured scripts that keep viewers watching. These intelligent tools analyze successful video 
                  patterns, suggest compelling hooks, create logical flow, and optimize for YouTube's algorithm. 
                  They save hours of writing time while improving video quality and viewer retention.
                </p>
                <p>
                  Modern AI script writers understand YouTube's best practices, including optimal video length, 
                  engagement techniques, and call-to-action placement. They can generate scripts in various styles, 
                  from educational tutorials to entertaining vlogs, ensuring your content resonates with your target 
                  audience. This technology empowers creators to focus on filming and editing while AI handles the 
                  writing process.
                </p>
              </>
            )}
            {selectedSubcategory === "instagram-captions" && (
              <>
                <p>
                  AI Instagram caption generators help creators craft engaging, on-brand captions that drive 
                  engagement and grow followers. These tools understand Instagram's algorithm, optimal hashtag usage, 
                  and audience psychology. They generate multiple caption variations, suggest relevant hashtags, 
                  and ensure your content stands out in crowded feeds.
                </p>
                <p>
                  From witty one-liners to detailed storytelling captions, AI tools adapt to your brand voice and 
                  content style. They analyze trending hashtags, suggest emoji placement, and optimize for maximum 
                  reach and engagement. This allows creators to maintain consistent posting schedules while ensuring 
                  every caption contributes to growth and audience connection.
                </p>
              </>
            )}
            {selectedSubcategory === "thumbnails" && (
              <>
                <p>
                  AI thumbnail generators create eye-catching, click-worthy thumbnails that significantly improve 
                  click-through rates. These tools use design principles, color psychology, and A/B testing data to 
                  generate thumbnails that stand out in YouTube's crowded interface. They combine text, images, and 
                  graphics to create professional-looking thumbnails in minutes.
                </p>
                <p>
                  Advanced AI thumbnail tools can generate custom artwork, optimize text readability, suggest color 
                  schemes, and even create multiple variations for testing. They understand what makes thumbnails 
                  successful - from facial expressions to text placement - and apply these insights to your designs. 
                  This gives creators a competitive edge in attracting viewers to their content.
                </p>
              </>
            )}
            {selectedSubcategory === "video-editing" && (
              <>
                <p>
                  AI video editing tools automate time-consuming tasks like cutting, color correction, adding captions, 
                  and creating transitions. These intelligent systems analyze your footage, identify key moments, and 
                  automatically create polished videos. They reduce editing time from hours to minutes while maintaining 
                  professional quality.
                </p>
                <p>
                  From automatic scene detection to smart color grading, AI video editors understand cinematic principles 
                  and apply them to your content. They can remove silence, add background music, generate captions, 
                  and even create highlight reels. This technology democratizes professional video editing, making it 
                  accessible to creators of all skill levels.
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Start Creating Better Content Today</h2>
          <p className="text-lg text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
            Join thousands of creators who are using AI tools to grow their channels, increase engagement, 
            and create content more efficiently. Transform your creative workflow with AI assistance.
          </p>
          <Link
            href="/tools"
            className="inline-block rounded-lg bg-[var(--accent)] text-white px-6 py-3 font-semibold hover:opacity-90 transition"
          >
            Explore All Creator Tools →
          </Link>
        </div>
      </section>
    </main>
  );
}
