"use client";
import BlogCard from "./BlogCard";
import { deletePost } from "@/lib/delatePost";

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

  const handleDelete = async (postId: string) => {
    if (confirm("¿Seguro que quieres eliminar este artículo?")) {
      try {
        await deletePost(postId);
        alert("Artículo eliminado correctamente");

        window.location.reload();
      } catch (error) {
        alert("No se pudo eliminar el artículo");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <div key={post.id} className="relative">
          <BlogCard post={post} modoEdicion={modoEdicion} />
          {modoEdicion && (
            <button
              onClick={() => handleDelete(post.id)}
              className="mt-2 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
              Eliminar
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
