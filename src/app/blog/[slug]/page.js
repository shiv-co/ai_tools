// import Link from "next/link";

// const stats = [
//   { label: "Reading time", value: "8 min" },
//   { label: "Category", value: "AI Technology" },
//   { label: "Published", value: "Jan 2026" },
//   { label: "Author", value: "Ralph Edwards" },
// ];

// const keyTakeaways = [
//   "Breakthrough models reason with less data and more context.",
//   "New safety layers reduce hallucinations in enterprise workflows.",
//   "Composable agents unlock automation across industries.",
//   "Edge deployments shrink latency for real-time decisions.",
// ];

// const relatedReads = [
//   {
//     title: "Building Responsible AI Systems in 2026",
//     image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
//   },
//   {
//     title: "How AI Agents Will Reshape Creative Work",
//     image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
//   },
//   {
//     title: "Designing Reliable AI Infrastructure at Scale",
//     image: "https://images.unsplash.com/photo-1526402465177-911f7af2aa72",
//   },
// ];

// export default function BlogDetailPage() {
//   return (
//     <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
//       {/* HERO */}
//       <section className="relative overflow-hidden">
//         <div className="pointer-events-none absolute inset-0" style={{background: `radial-gradient(circle at 20% 20%, var(--accent-opacity-18), transparent 35%), radial-gradient(circle at 80% 0%, var(--accent-opacity-16), transparent 35%)`}} />
//         <div className="pointer-events-none absolute inset-0" style={{background: `linear-gradient(120deg, var(--surface-opacity-4), transparent 35%)`}} />

//         <div className="relative px-4 sm:px-6 lg:px-8 pt-14 pb-16 max-w-6xl mx-auto flex flex-col gap-10">
//           <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
//             <span className="rounded-full bg-[var(--border-opacity-60)] px-3 py-1 font-semibold text-[var(--accent)]">
//               Featured
//             </span>
//             <span>AI Technology</span>
//             <span className="hidden sm:inline">•</span>
//             <span className="hidden sm:inline">Deep Dive</span>
//           </div>

//           <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
//             <div className="space-y-6">
//               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
//                 This Long-Awaited AI Technology May Finally Change Everything
//               </h1>
//               <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl">
//                 A look inside the architectures, safety layers, and deployment
//                 playbooks behind the next generation of reasoning AI systems.
//               </p>

//               <div className="flex flex-wrap gap-3">
//                 {stats.map(item => (
//                   <div
//                     key={item.label}
//                     className="group rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] px-4 py-3 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[var(--accent-opacity-60)] hover:shadow-lg hover:shadow-[var(--accent-opacity-10)]"
//                   >
//                     <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
//                       {item.label}
//                     </p>
//                     <p className="text-sm font-semibold">{item.value}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="relative">
//               <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-[var(--accent-opacity-20)] blur-3xl" />
//               <div className="relative overflow-hidden rounded-3xl border border-[var(--border-opacity-80)] shadow-2xl shadow-[var(--accent-opacity-10)]">
//                 <img
//                   src="https://images.unsplash.com/photo-1677442136019-21780ecad995"
//                   alt="AI Technology"
//                   className="h-64 w-full object-cover sm:h-80 lg:h-[420px] scale-105 transform transition duration-[900ms] ease-out hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-opacity-60)] via-[var(--bg-opacity-10)] to-transparent" />
//                 <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
//                   <div className="space-y-1">
//                     <p className="text-xs text-[var(--text-secondary)] uppercase tracking-[0.18em]">
//                       Spotlight
//                     </p>
//                     <p className="text-sm font-semibold">Edge-to-cloud AI stacks</p>
//                   </div>
//                   <span className="rounded-full bg-[var(--surface-opacity-10)] px-3 py-1 text-xs border border-[var(--surface-opacity-20)]">
//                     HD
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* BODY */}
//       <section className="relative px-4 sm:px-6 lg:px-8 pb-20">
//         <div className="absolute inset-x-0 top-12 mx-auto h-40 max-w-5xl rounded-full bg-[var(--accent-opacity-6)] blur-3xl" />

//         <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr]">
//           {/* Article */}
//           <article className="article-content space-y-4 rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 shadow-xl shadow-[var(--bg-opacity-5)] backdrop-blur">
//             <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
//               <span className="flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1">
//                 <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
//                 Live analysis
//               </span>
//               <span>Version 2.6</span>
//               <span>•</span>
//               <span>Updated monthly</span>
//             </div>

//             <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
//               Artificial Intelligence is entering a new era. What once required
//               massive datasets and brute-force computation is now evolving into
//               systems capable of reasoning, adaptation, and context awareness.
//               The shift is forcing teams to rethink infrastructure, safety, and
//               governance just as much as model performance.
//             </p>

//             <div className="grid gap-4 rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5 sm:grid-cols-2">
//               <div>
//                 <h2 className="text-xl font-semibold">Why this breakthrough matters</h2>
//                 <p className="mt-2 text-[var(--text-secondary)] leading-relaxed">
//                   New architectures learn abstractions that generalize to novel
//                   tasks. They compress signal, reason with fewer examples, and
//                   coordinate actions with human oversight in the loop.
//                 </p>
//               </div>
//               <div className="rounded-xl bg-gradient-to-r from-[var(--accent-opacity-10)] via-transparent to-transparent p-4">
//                 <p className="text-sm uppercase tracking-[0.12em] text-[var(--text-secondary)]">
//                   Signal-to-noise
//                 </p>
//                 <div className="mt-3 flex items-center gap-3">
//                   <div className="h-12 w-12 rounded-full border border-[var(--border)] flex items-center justify-center text-lg font-semibold">
//                     94%
//                   </div>
//                   <p className="text-sm text-[var(--text-secondary)]">
//                     Reduction in redundant tokens per task after pruning synthetic
//                     data and fine-tuning on intent-rich corpora.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="grid gap-6 md:grid-cols-2">
//               <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5 shadow-sm">
//                 <h3 className="text-lg font-semibold text-[var(--accent)]">
//                   What works well
//                 </h3>
//                 <ul className="mt-3 space-y-3 text-[var(--text-secondary)]">
//                   <li className="flex gap-3">
//                     <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent)]" />
//                     More human-like reasoning with explicit uncertainty tracking.
//                   </li>
//                   <li className="flex gap-3">
//                     <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent)]" />
//                     Faster decision-making via on-device caching and distillation.
//                   </li>
//                   <li className="flex gap-3">
//                     <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent)]" />
//                     Scales across industries with modular guardrails.
//                   </li>
//                 </ul>
//               </div>
//               <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5 shadow-sm">
//                 <h3 className="text-lg font-semibold text-[var(--text-secondary)]">What needs attention</h3>
//                 <ul className="mt-3 space-y-3 text-[var(--text-secondary)]">
//                   <li className="flex gap-3">
//                     <span className="mt-1 h-2 w-2 rounded-full bg-[var(--text-secondary-opacity-80)]" />
//                     Compute costs under spiky inference loads.
//                   </li>
//                   <li className="flex gap-3">
//                     <span className="mt-1 h-2 w-2 rounded-full bg-[var(--text-secondary-opacity-80)]" />
//                     Data provenance, privacy, and safety audits.
//                   </li>
//                   <li className="flex gap-3">
//                     <span className="mt-1 h-2 w-2 rounded-full bg-[var(--text-secondary-opacity-80)]" />
//                     Reliable deployment pipelines for rapid patching.
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-gradient-to-r from-[var(--surface-opacity-5)] via-transparent to-[var(--surface-opacity-5)] p-6 shadow-inner">
//               <p className="text-xl font-semibold">
//                 “This shift may be as significant as the invention of deep learning itself.”
//               </p>
//               <p className="mt-2 text-sm uppercase tracking-[0.12em] text-[var(--text-secondary)]">
//                 AI industry expert
//               </p>
//             </div>

//             <div className="grid gap-6 md:grid-cols-2">
//               {keyTakeaways.map(point => (
//                 <div
//                   key={point}
//                   className="group rounded-2xl border border-[var(--border-opacity-70)] bg-[var(--surface-opacity-5)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--accent-opacity-60)] hover:shadow-lg hover:shadow-[var(--accent-opacity-10)]"
//                 >
//                   <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--text-secondary)]">
//                     <span className="h-1.5 w-6 rounded-full bg-[var(--accent-opacity-70)] group-hover:w-10 transition-[width]" />
//                     Insight
//                   </div>
//                   <p className="mt-3 text-[var(--text-primary)] leading-relaxed">{point}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="space-y-4">
//               <h2 className="text-2xl font-semibold">Practical applications</h2>
//               <p className="text-[var(--text-secondary)] leading-relaxed">
//                 From healthcare diagnostics and finance to content creation and
//                 autonomous systems, the impact is already visible across industries.
//                 Teams are combining deterministic systems with stochastic agents to
//                 deliver experiences that feel adaptive yet controllable.
//               </p>
//               <div className="grid gap-4 sm:grid-cols-2">
//                 <div className="rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-4">
//                   <p className="text-sm uppercase tracking-[0.12em] text-[var(--text-secondary)]">
//                     Healthcare
//                   </p>
//                   <p className="mt-2 text-[var(--text-primary)]">
//                     Multi-agent review reduces diagnostic error while keeping clinicians in control.
//                   </p>
//                 </div>
//                 <div className="rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-4">
//                   <p className="text-sm uppercase tracking-[0.12em] text-[var(--text-secondary)]">
//                     Finance
//                   </p>
//                   <p className="mt-2 text-[var(--text-primary)]">
//                     Risk copilots simulate scenarios, flag anomalies, and document decisions automatically.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-3 rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
//               <h2 className="text-2xl font-semibold">Final thoughts</h2>
//               <p className="text-[var(--text-secondary)] leading-relaxed">
//                 While challenges remain, the long-term potential of this AI breakthrough
//                 is undeniable. Early adopters who build responsible pipelines, stress-test
//                 safety layers, and invest in observability will gain a decisive edge.
//               </p>
//             </div>
//           </article>

//           {/* Sidebar */}
//           <aside className="space-y-10 lg:sticky lg:top-24">
//             <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5 shadow-lg shadow-[var(--bg-opacity-5)]">
//               <h3 className="text-lg font-semibold mb-4">You may like</h3>
//               <div className="space-y-4">
//                 {relatedReads.map(item => (
//                   <Link
//                     key={item.title}
//                     href="/blog/sample-post"
//                     className="group block overflow-hidden rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent-opacity-60)] hover:shadow-lg hover:shadow-[var(--accent-opacity-10)]"
//                   >
//                     <div className="relative h-32 overflow-hidden">
//                       <img
//                         src={item.image}
//                         alt={item.title}
//                         className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-opacity-30)] via-transparent to-transparent" />
//                     </div>
//                     <div className="p-4">
//                       <p className="text-sm font-semibold group-hover:text-[var(--accent)]">
//                         {item.title}
//                       </p>
//                       <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[var(--text-secondary)]">
//                         Recommended
//                       </p>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5 shadow-inner">
//               <h3 className="text-lg font-semibold mb-4">Related posts</h3>
//               <div className="space-y-3">
//                 {[1, 2, 3].map(item => (
//                   <Link
//                     key={item}
//                     href="/blog/sample-post"
//                     className="group flex items-center justify-between rounded-xl border border-transparent px-3 py-2 transition hover:border-[var(--accent-opacity-60)] hover:bg-[var(--surface-opacity-5)]"
//                   >
//                     <p className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--accent)]">
//                       → Best free AI tools you should try in 2026
//                     </p>
//                     <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
//                       Read
//                     </span>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </aside>
//         </div>
//       </section>

//       {/* Tags */}
//       <section className="px-4 sm:px-6 lg:px-8 pb-20">
//         <div className="mx-auto flex max-w-6xl flex-wrap gap-3">
//           {["AI", "Technology", "Future", "Innovation", "Safety", "Infrastructure"].map(tag => (
//             <span
//               key={tag}
//               className="cursor-pointer rounded-full border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] px-4 py-1.5 text-sm transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-opacity-70)] hover:bg-[var(--accent-opacity-10)]"
//             >
//               #{tag}
//             </span>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }


import Link from "next/link";
// import { blogs } from "@/data/blogs";
import { blogs } from "@/app/blog/data/blogs";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { notFound } from "next/navigation";
import { use } from "react";


const POSTS_PER_PAGE = 6;

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const blog = blogs.find((b) => b.slug === resolvedParams.slug);

  if (!blog) return {};

  return { 
    title: blog.title,
    description: blog.description,
    alternates: {
      canonical: `https://aitechtactics.com/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `https://aitechtactics.com/blog/${blog.slug}`,
      type: "article",
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const blog = blogs.find((b) => b.slug === resolvedParams.slug);
  const siteUrl = "https://aitechtactics.com";

  if (!blog) return notFound();

  
  const relatedReads = blogs
    .filter((b) => b.slug !== blog.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
<ReadingProgressBar />
      {/* HERO */}
      <section className="px-4 sm:px-6 lg:px-8 pt-14 pb-16 max-w-6xl mx-auto">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              {blog.title}
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)]">
              {blog.description}
            </p>

            <div className="flex flex-wrap gap-3 text-sm text-[var(--text-secondary)]">
              <span>{blog.readTime}</span>
              <span>•</span>
              <span>{blog.category}</span>
              <span>•</span>
              <span>{blog.date}</span>
              <span>•</span>
              <span>{blog.author}</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[var(--border-opacity-80)]">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 sm:h-80 object-cover"
            />
          </div>
        </div>
      </section>
 

      {/* BODY */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr]">

          {/* Article */}
          <article
            className="prose prose-invert max-w-none rounded-3xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Sidebar */}
          <aside className="space-y-8 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
              <h3 className="text-lg font-semibold mb-4">Related Posts</h3>
              <div className="space-y-4">
                {relatedReads.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="block text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition"
                  >
                    → {item.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="rounded-2xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-5">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border-opacity-80)] px-3 py-1 text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.description,
      image: blog.image,
      author: {
        "@type": "Person",
        name: blog.author || "AI Tech Tactics",
      },
      publisher: {
        "@type": "Organization",
        name: "AI Tech Tactics",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`,
        },
      },
      datePublished: blog.date,
      dateModified: blog.date,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${siteUrl}/blog/${blog.slug}`,
      },
    }),
  }}
/>

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${siteUrl}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: blog.title,
          item: `${siteUrl}/blog/${blog.slug}`,
        },
      ],
    }),
  }}
/>
    </main>
  );
}



// export  function BlogPage() {
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(blogs.length / POSTS_PER_PAGE);

//   const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
//   const currentPosts = blogs.slice(
//     startIndex,
//     startIndex + POSTS_PER_PAGE
//   );

//   return (
//     <main className="max-w-6xl mx-auto px-4 py-20">
//       <h1 className="text-3xl font-bold mb-10">Latest Articles</h1>

//       <div className="grid md:grid-cols-2 gap-8">
//         {currentPosts.map((blog) => (
//           <Link
//             key={blog.slug}
//             href={`/blog/${blog.slug}`}
//             className="rounded-xl border border-[var(--border-opacity-80)] bg-[var(--surface-opacity-5)] p-6 hover:shadow-lg transition"
//           >
//             <h2 className="text-xl font-semibold">{blog.title}</h2>
//             <p className="mt-2 text-sm text-[var(--text-secondary)]">
//               {blog.readTime} • {blog.category}
//             </p>
//             <p className="mt-3 text-sm text-[var(--text-secondary)]">
//               {blog.description}
//             </p>
//           </Link>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center items-center gap-3 mt-12">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//           className="px-4 py-2 rounded-lg border disabled:opacity-40"
//         >
//           Previous
//         </button>

//         {[...Array(totalPages)].map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentPage(index + 1)}
//             className={`px-4 py-2 rounded-lg border ${
//               currentPage === index + 1
//                 ? "bg-[var(--accent)] text-white"
//                 : ""
//             }`}
//           >
//             {index + 1}
//           </button>
//         ))}

//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//           className="px-4 py-2 rounded-lg border disabled:opacity-40"
//         >
//           Next
//         </button>
//       </div>
//     </main>
//   );
// }