import { getTags } from "@/lib/getTags";
import { getTagsPaginator } from "@/lib/getTagsPaginated";
import BlogList from "@/components/BlogList";
import Header from "@/components/Header";
import Paginator from "@/components/Paginator";
import Link from "next/link";
interface PageProps {
  params: { slug: string };
  searchParams?: { page?: string };
}

export default async function TagPage({ params, searchParams }: PageProps) {
  const slug = decodeURIComponent(params.slug.toLowerCase());
  const currentPage = Number(searchParams?.page) || 1;

  // 🔍 Validar que el tag exista
  const allTags = await getTags();
  const tagData = allTags.find((t) => t.name.toLowerCase() === slug);

  if (!tagData) {
    return (
      <main className="w-full max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-6 text-red-600">
          Etiqueta no encontrada: #{slug}
        </h1>
        <p className="text-gray-500">No existe esta etiqueta en el sistema.</p>
      </main>
    );
  }

  // 🔍 Traer artículos paginados por tag
  const { posts, total } = await getTagsPaginator(tagData.name, currentPage);

  return (
    <main className="w-full max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Artículos con el tag:{tagData.name}
        <span className="px-2 py-1 rounded-full text-white">
          #{tagData.name}
        </span>
      </h1>

      {posts.length > 0 ? (
        <>
          <BlogList posts={posts} />
          <Paginator current={currentPage} total={total} perPage={4} />
        </>
      ) : (
        <p className="text-gray-500">No hay artículos con esta etiqueta.</p>
      )}
      <div className="mt-10 flex justify-end">
        <Link
          href="/"
          className="inline-block px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Volver
        </Link>
      </div>
    </main>
  );
}
