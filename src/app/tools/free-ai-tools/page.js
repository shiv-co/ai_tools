// "use client";

// import { useState, useMemo } from "react";
// import Link from "next/link";
// import ToolCard from "@/components/ToolCard";

// // Sample free tools data
// const freeTools = [
//   {
//     id: 1,
//     name: "ChatGPT",
//     description: "Advanced AI chatbot for conversations, writing, and problem-solving.",
//     useCase: "Writing & Content",
//     category: "Chatbot",
//     pricing: "Free",
//     slug: "chatgpt",
//     icon: "💬",
//   },
//   {
//     id: 3,
//     name: "Grammarly",
//     description: "AI writing assistant that helps improve grammar, clarity, and style.",
//     useCase: "Writing & Editing",
//     category: "Productivity",
//     pricing: "Free",
//     slug: "grammarly",
//     icon: "✍️",
//   },
//   {
//     id: 5,
//     name: "Canva AI",
//     description: "Design tool with AI features for creating graphics, presentations, and more.",
//     useCase: "Design",
//     category: "Creative",
//     pricing: "Free",
//     slug: "canva-ai",
//     icon: "🎨",
//   },
//   {
//     id: 8,
//     name: "DALL-E",
//     description: "Create images from text descriptions using advanced AI technology.",
//     useCase: "Image Generation",
//     category: "Creative",
//     pricing: "Free",
//     slug: "dalle",
//     icon: "🖼️",
//   },
//   {
//     id: 9,
//     name: "Copy.ai",
//     description: "AI-powered copywriting tool for ads, emails, and marketing content.",
//     useCase: "Content Creation",
//     category: "Marketing",
//     pricing: "Free",
//     slug: "copy-ai",
//     icon: "📄",
//   },
//   {
//     id: 11,
//     name: "Claude AI",
//     description: "Advanced AI assistant for research, analysis, and complex tasks.",
//     useCase: "Research",
//     category: "Chatbot",
//     pricing: "Free",
//     slug: "claude-ai",
//     icon: "🤖",
//   },
//   {
//     id: 12,
//     name: "Stable Diffusion",
//     description: "Open-source AI image generation model for creating unique artwork.",
//     useCase: "Image Generation",
//     category: "Creative",
//     pricing: "Free",
//     slug: "stable-diffusion",
//     icon: "🎭",
//   },
// ];

// export default function FreeAIToolsPage() {
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredTools = useMemo(() => {
//     return freeTools.filter((tool) => {
//       return (
//         tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         tool.useCase.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     });
//   }, [searchQuery]);

//   return (
//     <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden border-b border-[var(--border-opacity-80)]">
//         <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent" />
        
//         <div className="relative px-4 sm:px-6 lg:px-8 pt-12 pb-8 max-w-7xl mx-auto">
//           <div className="max-w-3xl">
//             <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-2 mb-4 text-sm font-semibold">
//               🆓 100% Free
//             </div>
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
//               Free AI Tools
//             </h1>
//             <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-8">
//               Discover powerful AI tools that won't cost you a dime. All tools listed here offer free tiers or are completely free to use.
//             </p>

//             {/* Breadcrumb */}
//             <nav className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-8">
//               <Link href="/tools" className="hover:text-[var(--accent)] transition">
//                 Tools
//               </Link>
//               <span>→</span>
//               <span className="text-[var(--text-primary)]">Free AI Tools</span>
//             </nav>
//           </div>
//         </div>
//       </section>

//       {/* Search Bar */}
//       <section className="sticky top-0 z-40 bg-[var(--bg)]/80 backdrop-blur-lg border-b border-[var(--border-opacity-80)] px-4 sm:px-6 lg:px-8 py-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search free AI tools..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full px-4 py-3 pl-12 rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-opacity-60)] focus:ring-2 focus:ring-[var(--accent-opacity-10)] transition"
//             />
//             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">🔍</span>
//           </div>
//           <div className="mt-4 text-sm text-[var(--text-secondary)">
//             Showing <span className="font-semibold text-[var(--text-primary)]">{filteredTools.length}</span> free tools
//           </div>
//         </div>
//       </section>

//       {/* Tools Grid */}
//       <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
//         {filteredTools.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredTools.map((tool) => (
//               <ToolCard key={tool.id} tool={tool} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20">
//             <div className="text-6xl mb-4">🔍</div>
//             <h3 className="text-2xl font-semibold mb-2 text-[var(--text-primary)">No free tools found</h3>
//             <p className="text-[var(--text-secondary)">
//               Try adjusting your search to find what you're looking for.
//             </p>
//           </div>
//         )}
//       </section>

//       {/* Info Section */}
//       <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
//         <div className="rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-8 sm:p-12">
//           <h2 className="text-2xl sm:text-3xl font-bold mb-4">Why Use Free AI Tools?</h2>
//           <div className="grid md:grid-cols-3 gap-6 mt-8">
//             <div>
//               <div className="text-3xl mb-3">💰</div>
//               <h3 className="font-semibold mb-2">No Cost</h3>
//               <p className="text-sm text-[var(--text-secondary)]">
//                 Access powerful AI capabilities without spending a penny. Perfect for students, startups, and budget-conscious users.
//               </p>
//             </div>
//             <div>
//               <div className="text-3xl mb-3">🚀</div>
//               <h3 className="font-semibold mb-2">Get Started Fast</h3>
//               <p className="text-sm text-[var(--text-secondary)">
//                 No credit card required. Sign up and start using these tools immediately to boost your productivity.
//               </p>
//             </div>
//             <div>
//               <div className="text-3xl mb-3">✨</div>
//               <h3 className="font-semibold mb-2">Full Features</h3>
//               <p className="text-sm text-[var(--text-secondary)]">
//                 Many free tools offer robust features that are more than enough for most users' needs.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }
