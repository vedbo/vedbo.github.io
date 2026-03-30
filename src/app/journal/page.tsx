import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

export const metadata = {
  title: "Ved Borade | Thoughts & Engineering Journal",
  description: "A running log of engineering thoughts, debugging stories, and hackathon experiences.",
};

export default function JournalPage() {
  const posts = getAllPosts();
  return (
    <main className="min-h-screen bg-black text-gray-200 selection:bg-cyan-500/30 font-sans pb-32">
      <div className="max-w-3xl mx-auto px-6 pt-12 md:pt-24">
        
        {/* Header */}
        <header className="mb-16 md:mb-24 flex flex-col items-start gap-6 pt-4">
          <Link 
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white bg-white/5 border border-white/10 hover:border-cyan-500/30 px-4 py-2 rounded-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            ← Back to Home
          </Link>
          <div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Thoughts</span>
              <span className="text-gray-600 mx-2">&</span>
              <span className="text-white">Log</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl max-w-lg leading-relaxed">
              Real stories from building things — what worked, what didn't, and what I learned from both.
            </p>
          </div>
        </header>

        {/* Feed */}
        <div className="space-y-16 md:space-y-24 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[2.25rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {posts.map((entry, idx) => (
            <article key={entry.meta.id} className="relative flex items-start gap-6 md:gap-12 group">
              {/* Timeline Connector */}
              <div className="absolute left-5 md:left-[2.25rem] top-7 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-500/20 border border-cyan-500 group-hover:bg-cyan-500 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.6)] transition-all z-10 ring-4 ring-black" />
              
              <div className="w-full pl-12 md:pl-20 py-2 flex flex-col items-start">
                <header className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 font-mono uppercase tracking-widest">
                    <Clock className="w-3.5 h-3.5" />
                    <time dateTime={entry.meta.date}>{entry.meta.date}</time>
                  </div>
                  <Link href={`/journal/${entry.meta.id}`}>
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight hover:text-cyan-400 transition-colors">
                      {entry.meta.title}
                    </h2>
                  </Link>
                </header>
                
                <p className="text-gray-400 leading-relaxed max-w-prose mb-6">
                  {entry.content.substring(0, 200).replace(/\*\*/g, "").replace(/\*/g, "").replace(/#+\s/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")}...
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {entry.meta.tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono text-cyan-500/80 bg-cyan-500/10 px-2 py-1 rounded-md border border-cyan-500/20">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link href={`/journal/${entry.meta.id}`} className="text-xs font-black uppercase text-cyan-500 tracking-widest hover:text-cyan-400 border border-cyan-500/20 px-4 py-2 rounded-lg hover:border-cyan-500/50 transition-colors">
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </main>
  );
}
