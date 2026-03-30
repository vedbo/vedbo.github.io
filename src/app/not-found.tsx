import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050508] text-gray-200 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-[10px] font-black uppercase tracking-widest text-cyan-500 mb-4 font-mono">404</p>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-4">
          Lost in{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            space.
          </span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed">
          This page doesn&apos;t exist. Either the link is broken or I haven&apos;t built it yet.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-cyan-600 text-white font-black text-[10px] uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-cyan-500 transition-all"
          >
            Back to Home
          </Link>
          <Link
            href="/journal"
            className="bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white/10 transition-all"
          >
            Read the Journal
          </Link>
        </div>
      </div>
    </main>
  );
}
