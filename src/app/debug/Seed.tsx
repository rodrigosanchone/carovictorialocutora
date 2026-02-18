"use client";
import { seedPost } from "@/lib/seedPost";

export default function SeedPage() {
  return (
    <div className="p-10">
      <button
        onClick={seedPost}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Crear post de ejemplo
      </button>
    </div>
  );
}
