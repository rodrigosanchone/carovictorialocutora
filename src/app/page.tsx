import { getPostsPaginated } from "@/lib/getPostsPaginated";
import BlogList from "@/components/BlogList";
import Paginator from "@/components/Paginator";
import Soy from "@/components/Soy";

export const revalidate = 60;

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  // 👇 desempaquetamos la Promise
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const perPage = 4;

  const { posts, total } = await getPostsPaginated(currentPage, perPage);

  return (
    <main className="max-w-6xl mx-auto py-10">
      {currentPage === 1 && <Soy />}

      {/* Sección superior: tags y buscador */}
      <section className="flex items-center justify-between gap-4 py-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2">{/* Tags opcionales */}</div>
        <div className="w-full max-w-xs">{/* Buscador opcional */}</div>
      </section>

      {posts.length > 0 ? (
        <>
          <BlogList posts={posts} />
          <Paginator current={currentPage} total={total} perPage={perPage} />
        </>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No hay artículos disponibles.
        </p>
      )}
    </main>
  );
}
