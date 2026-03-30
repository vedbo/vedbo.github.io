import HomeClient from "./home-client";
import { getAllPosts } from "@/lib/mdx";

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);
  return <HomeClient latestPosts={latestPosts} />;
}
