import Link from "next/link";

export default function BlogCard({
  post,
  modoEdicion = false,
}: {
  post: any;
  modoEdicion?: boolean;
}) {
  const destino = modoEdicion
    ? `/Dashboard/EditPost/${post.id}`
    : `/post/${post.id}`;

  return (
    <Link href={destino} className="group">
      <article className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition duration-300 bg-white dark:bg-gray-900">
        {post.image && (
          <div className="overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-80 sm:h-96 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        )}

        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-200">
            {post.title}
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 line-clamp-3 text-base leading-relaxed">
            {post.content.split(" ").slice(0, 20).join(" ") + "..."}
          </p>
        </div>
      </article>
    </Link>
  );
}
