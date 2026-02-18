"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTags } from "@/lib/getTags";

interface Tag {
  id: string;
  name: string;
  slug?: string;
  color?: string;
}

export default function AsideTags() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    getTags()
      .then((data) => setTags(data))
      .catch((err) => console.error("Error al cargar etiquetas:", err));
  }, []);

  if (!tags || tags.length === 0) {
    return (
      <aside className="text-sm text-gray-400">
        No hay etiquetas disponibles.
      </aside>
    );
  }

  return (
    <aside className="text-sm">
      <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-3">
        Etiquetas
      </h2>
      <ul className="space-y-2">
        {tags.map((tag) => (
          <li key={tag.id}>
            <Link
              href={`/tags/${encodeURIComponent(tag.name.toLowerCase())}`}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
            >
              {tag.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
