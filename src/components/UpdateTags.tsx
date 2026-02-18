"use client";

import { useState, useEffect } from "react";
import { getTags } from "@/lib/getTags";
import { deleteTag } from "@/lib/tags";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Tags() {
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTags = async () => {
    const allTags = await getTags();
    setTags(allTags);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleCreateTag = async () => {
    const trimmed = newTag.trim();
    if (!trimmed) return;

    setLoading(true);
    await addDoc(collection(db, "tags"), { name: trimmed });
    setNewTag("");
    await fetchTags();
    setLoading(false);
  };

  const handleDeleteTag = async (id: string) => {
    setLoading(true);
    await deleteTag(id);
    await fetchTags();
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Administrar Etiquetas
      </h2>

      {/* Crear nueva etiqueta */}
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Nueva etiqueta"
          className="flex-1 px-4 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCreateTag}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          Crear
        </button>
      </div>

      {/* Lista de etiquetas */}
      <ul className="space-y-3">
        {tags.map((tag) => (
          <li
            key={tag.id}
            className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded shadow-sm"
          >
            <span className="text-sm font-medium text-gray-800">
              {tag.name}
            </span>
            <button
              onClick={() => handleDeleteTag(tag.id)}
              disabled={loading}
              className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
