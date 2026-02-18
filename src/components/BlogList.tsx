"use client";
import BlogCard from "./BlogCard";

export default function BlogList({
  posts,
  modoEdicion = false,
}: {
  posts: any[];
  modoEdicion?: boolean;
}) {
  if (!posts || posts.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No hay artículos disponibles.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} modoEdicion={modoEdicion} />
      ))}
    </div>
  );
}
