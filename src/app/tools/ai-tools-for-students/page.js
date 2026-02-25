"use client";

import { useState } from "react";
import Link from "next/link";
import ToolCard from "@/components/ToolCard";

const subcategories = [
  { id: "notes", name: "AI for Notes", icon: "📝" },
  { id: "assignments", name: "AI for Assignments", icon: "📚" },
  { id: "exam-prep", name: "AI for Exam Prep", icon: "🎓" },
  { id: "resume", name: "AI Resume Builders", icon: "💼" },
];

const toolsBySubcategory = {
  notes: [
    {
      id: 1,
      name: "Notion AI",
      description: "AI-powered note-taking with automatic organization, summarization, and smart suggestions.",
      useCase: "Note Taking",
      category: "Productivity",
      pricing: "Paid",
      slug: "https://www.notion.so/product/ai",
      icon: "📝",
    },
    {
      id: 2,
      name: "Obsidian AI",
      description: "Advanced note-taking with AI-powered connections, summaries, and knowledge graph generation.",
      useCase: "Note Taking",
      category: "Productivity",
      pricing: "Free",
      slug: "https://obsidian.md/",
      icon: "🔗",
    },
    {
      id: 3,
      name: "Mem.ai",
      description: "AI note-taking assistant that helps organize, search, and connect your ideas effortlessly.",
      useCase: "Note Taking",
      category: "Productivity",
      pricing: "Free",
      slug: "https://mem.ai/",
      icon: "🧠",
    },
    {
      id: 4,
      name: "Otter.ai",
      description: "AI transcription and note-taking for lectures, meetings, and study sessions.",
      useCase: "Note Taking",
      category: "Productivity",
      pricing: "Free",
      slug: "https://otter.ai/",
      icon: "🎤",
    },
    {
      id: 5,
      name: "Fireflies.ai",
      description: "AI-powered meeting notes and transcription with automatic summaries and action items.",
      useCase: "Note Taking",
      category: "Productivity",
      pricing: "Free",
      slug: "https://fireflies.ai/",
      icon: "🔥",
    },
  ],
  assignments: [
    {
      id: 6,
      name: "Grammarly",
      description: "AI writing assistant that helps improve grammar, clarity, and style for academic papers.",
      useCase: "Writing & Editing",
      category: "Productivity",
      pricing: "Free",
      slug: "https://www.grammarly.com/",
      icon: "✍️",
    },
    {
      id: 7,
      name: "Jasper AI",
      description: "AI writing tool for essays, research papers, and academic content with citation support.",
      useCase: "Content Creation",
      category: "Writing",
      pricing: "Paid",
      slug: "https://www.jasper.ai/",
      icon: "📄",
    },
    {
      id: 8,
      name: "QuillBot",
      description: "AI paraphrasing and summarization tool perfect for rewriting assignments and avoiding plagiarism.",
      useCase: "Writing & Editing",
      category: "Writing",
      pricing: "Free",
      slug: "https://quillbot.com/",
      icon: "🔄",
    },
    {
      id: 9,
      name: "Copy.ai",
      description: "AI writing assistant for generating outlines, drafts, and structured academic content.",
      useCase: "Content Creation",
      category: "Writing",
      pricing: "Free",
      slug: "https://www.copy.ai/",
      icon: "📝",
    },
    {
      id: 10,
      name: "ChatGPT",
      description: "Advanced AI assistant for brainstorming, research, and writing assistance for assignments.",
      useCase: "Writing & Content",
      category: "Chatbot",
      pricing: "Free",
      slug: "https://chat.openai.com/",
      icon: "💬",
    },
  ],
  "exam-prep": [
    {
      id: 11,
      name: "Quizlet AI",
      description: "AI-powered flashcard generator and study tool with adaptive learning algorithms.",
      useCase: "Learning",
      category: "Education",
      pricing: "Free",
      slug: "https://quizlet.com/",
      icon: "🎯",
    },
    {
      id: 12,
      name: "Anki AI",
      description: "Spaced repetition flashcard system with AI-generated questions and study schedules.",
      useCase: "Learning",
      category: "Education",
      pricing: "Free",
      slug: "https://apps.ankiweb.net/",
      icon: "📚",
    },
    {
      id: 13,
      name: "Claude AI",
      description: "AI tutor for exam preparation with practice questions, explanations, and study plans.",
      useCase: "Research",
      category: "Chatbot",
      pricing: "Free",
      slug: "https://claude.ai/",
      icon: "🤖",
    },
    {
      id: 14,
      name: "Khan Academy AI",
      description: "Personalized AI tutor that adapts to your learning style and creates custom study paths.",
      useCase: "Learning",
      category: "Education",
      pricing: "Free",
      slug: "https://www.khanacademy.org/",
      icon: "🎓",
    },
    {
      id: 15,
      name: "StudySmarter AI",
      description: "AI study planner that creates personalized schedules and tracks your exam preparation progress.",
      useCase: "Learning",
      category: "Education",
      pricing: "Free",
      slug: "https://www.studysmarter.us",
      icon: "📊",
    },
  ],
  resume: [
    {
      id: 16,
      name: "Resume.io AI",
      description: "AI-powered resume builder with templates, ATS optimization, and personalized suggestions.",
      useCase: "Resume Building",
      category: "Career",
      pricing: "Free",
      slug: "https://resume.io/",
      icon: "📄",
    },
    {
      id: 17,
      name: "Zety AI Resume Builder",
      description: "Professional resume builder with AI-powered content suggestions and formatting.",
      useCase: "Resume Building",
      category: "Career",
      pricing: "Paid",
      slug: "https://zety.com/",
      icon: "💼",
    },
    {
      id: 18,
      name: "Rezi AI",
      description: "ATS-optimized resume builder with AI writing assistance and real-time feedback.",
      useCase: "Resume Building",
      category: "Career",
      pricing: "Free",
      slug: "https://www.rezi.ai/",
      icon: "✨",
    },
    {
      id: 19,
      name: "Enhancv AI",
      description: "Creative resume builder with AI-powered content generation and design suggestions.",
      useCase: "Resume Building",
      category: "Career",
      pricing: "Paid",
      slug: "https://enhancv.com/",
      icon: "🎨",
    },
    {
      id: 20,
      name: "Kickresume AI",
      description: "AI resume builder with cover letter generation and job-specific optimization.",
      useCase: "Resume Building",
      category: "Career",
      pricing: "Free",
      slug: "https://www.kickresume.com/",
      icon: "🚀",
    },
  ],
};

export default function AIToolsForStudentsPage() {
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
              🎓 For Students
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              AI Tools for Students
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-8">
              Boost your academic performance with AI-powered tools designed specifically for students. 
              From note-taking to exam preparation, discover tools that help you study smarter and achieve better grades.
            </p>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-8">
              <Link href="/tools" className="hover:text-[var(--accent)] transition">
                Tools
              </Link>
              <span>→</span>
              <span className="text-[var(--text-primary)]">AI Tools for Students</span>
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
            {selectedSubcategory === "notes" && (
              <>
                <p>
                  AI-powered note-taking tools revolutionize how students capture, organize, and review information. 
                  These intelligent systems automatically transcribe lectures, generate summaries, create connections 
                  between concepts, and help you build a comprehensive knowledge base. Whether you're attending online 
                  classes or in-person lectures, AI note-taking tools ensure you never miss important information.
                </p>
                <p>
                  Modern AI note-taking solutions use natural language processing to understand context, identify key 
                  concepts, and organize your notes intelligently. They can generate study guides, create flashcards, 
                  and even answer questions based on your notes. This makes reviewing and studying more efficient, 
                  allowing you to focus on understanding rather than manual organization.
                </p>
              </>
            )}
            {selectedSubcategory === "assignments" && (
              <>
                <p>
                  AI writing assistants for students help improve the quality of assignments, essays, and research papers. 
                  These tools provide grammar checking, style suggestions, plagiarism detection, and even help with 
                  structuring your arguments. They act as intelligent writing partners, helping you express your ideas 
                  more clearly and professionally.
                </p>
                <p>
                  From brainstorming and outlining to final editing, AI assignment tools support every stage of the 
                  writing process. They can help you develop thesis statements, create logical flow, improve vocabulary, 
                  and ensure academic integrity. These tools are particularly valuable for non-native English speakers 
                  and students who want to elevate their writing to the next level.
                </p>
              </>
            )}
            {selectedSubcategory === "exam-prep" && (
              <>
                <p>
                  AI exam preparation tools use adaptive learning algorithms to create personalized study plans based 
                  on your strengths and weaknesses. These intelligent systems generate practice questions, track your 
                  progress, and adjust difficulty levels to optimize your learning. They transform traditional studying 
                  into an efficient, data-driven process.
                </p>
                <p>
                  With spaced repetition algorithms and AI-generated content, these tools help you retain information 
                  longer and prepare more effectively for exams. They can identify knowledge gaps, create custom study 
                  schedules, and provide detailed explanations for complex topics. This personalized approach to exam 
                  preparation significantly improves your chances of success.
                </p>
              </>
            )}
            {selectedSubcategory === "resume" && (
              <>
                <p>
                  AI resume builders help students create professional resumes that stand out to employers and pass 
                  Applicant Tracking Systems (ATS). These tools use AI to optimize your resume for specific job 
                  descriptions, suggest powerful action verbs, and ensure proper formatting. They're especially valuable 
                  for students entering the job market for the first time.
                </p>
                <p>
                  Modern AI resume builders analyze job descriptions and automatically tailor your resume to highlight 
                  relevant skills and experiences. They provide real-time feedback on content, formatting, and ATS 
                  compatibility. Some even generate cover letters and help you prepare for interviews. This gives 
                  students a competitive edge in today's job market.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">
            Recommended {subcategories.find(s => s.id === selectedSubcategory)?.name}
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Studies?</h2>
          <p className="text-lg text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
            Start using AI tools today and experience the difference they make in your academic journey. 
            Join thousands of students who are already achieving better results with AI assistance.
          </p>
          <Link
            href="/tools"
            className="inline-block rounded-lg bg-[var(--accent)] text-white px-6 py-3 font-semibold hover:opacity-90 transition"
          >
            Explore All AI Tools →
          </Link>
        </div>
      </section>
    </main>
  );
}
