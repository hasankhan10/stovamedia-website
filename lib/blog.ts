import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_PATH = path.join(process.cwd(), "content/posts");

export interface Post {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  content: string;
  readingTime: string;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_PATH)) return [];

  const files = fs.readdirSync(POSTS_PATH);

  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(".mdx", "");
      const fullPath = path.join(POSTS_PATH, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      
      return {
        slug,
        title: data.title,
        date: data.date,
        tag: data.tag,
        excerpt: data.excerpt,
        content,
        readingTime: readingTime(content).text,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}
