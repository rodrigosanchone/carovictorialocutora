import Link from "next/link";
import { getTags } from "@/lib/getTags";

interface Tag {
  id: string;
  name: string;
  slug?: string;
  color?: string;
}

export default async function TagsList() {
  const tags: Tag[] = await getTags();

  if (!tags || tags.length === 0) {
    return (
      <p className="text-sm text-gray-400">No hay etiquetas disponibles.</p>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <Link
          key={tag.id}
          href={`/tags/${encodeURIComponent(tag.name.toLowerCase())}`}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm
            ${
              tag.color
                ? `bg-[${tag.color}] text-white`
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
        >
          {tag.name}
        </Link>
      ))}
    </div>
  );
}
