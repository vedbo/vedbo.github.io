import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src', 'content', 'journal');

export type PostMeta = {
  id: string;
  title: string;
  date: string;
  tags: string[];
};

export type Post = {
  meta: PostMeta;
  content: string;
};

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(contentDir, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      meta: {
        id: slug,
        title: data.title,
        date: data.date,
        tags: data.tags || [],
      },
      content,
    };
  } catch (e) {
    return null;
  }
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir);
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => getPostBySlug(file.replace(/\.mdx$/, '')))
    .filter(Boolean) as Post[];
    
  return posts.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}
