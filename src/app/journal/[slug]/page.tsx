import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.meta.id,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: "Post Not Found" };
  }
  return {
    title: `${post.meta.title} | Ved Borade`,
    description: `Read about ${post.meta.title} on Ved Borade's Engineering Journal.`,
  };
}

const components = {
  h1: (props: any) => <h1 className="text-3xl font-black mt-8 mb-4 tracking-tighter" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-black mt-8 mb-4 tracking-tight border-l-2 border-cyan-500 pl-4" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
  p: (props: any) => <p className="leading-relaxed mb-6 text-gray-300" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-300" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 space-y-2 mb-6 text-gray-300" {...props} />,
  strong: (props: any) => <strong className="font-bold text-white" {...props} />,
  em: (props: any) => <em className="italic text-cyan-200" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-purple-500 bg-purple-500/10 p-4 rounded-r-lg mb-6 italic text-gray-300" {...props} />
  ),
  inlineCode: (props: any) => (
    <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-cyan-400 font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-[#0A0A0F] border border-white/10 p-6 rounded-xl overflow-x-auto mb-6" {...props} />
  ),
  code: (props: any) => <code className="font-mono text-sm text-gray-300" {...props} />,
};

type Params = Promise<{ slug: string }>;

export default async function BlogPostPage(props: { params: Params }) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-gray-200 selection:bg-cyan-500/30 font-sans pb-32">
      <div className="max-w-3xl mx-auto px-6 pt-12 md:pt-24">
        <Link 
          href="/journal"
          className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white bg-white/5 border border-white/10 hover:border-cyan-500/30 px-4 py-2 rounded-lg transition-all mb-12"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          ← All Thoughts
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4 font-mono uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5" />
            <time dateTime={post.meta.date}>{post.meta.date}</time>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6 leading-tight">
            {post.meta.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {post.meta.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono text-cyan-500/80 bg-cyan-500/10 px-3 py-1.5 rounded-md border border-cyan-500/20">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-invert prose-p:text-gray-300 max-w-none">
          <MDXRemote source={post.content} components={components} />
        </div>

        {/* Bottom Navigation */}
        <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
          <Link 
            href="/journal"
            className="group inline-flex items-center gap-2 text-sm text-cyan-500 hover:text-cyan-400 font-bold uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            All Thoughts
          </Link>
          <Link 
            href="/"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
