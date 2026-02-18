"use client";
import Link from "next/link";

export default function Paginator({
  current,
  total,
  perPage = 4,
  onPageChange,
}: {
  current: number;
  total: number;
  perPage?: number;
  onPageChange?: (page: number) => void; // ✅ ahora es opcional
}) {
  const safeCurrent = Number(current) || 1;
  const safeTotal = Number(total) || 0;
  const safePerPage = Number(perPage) || 4;

  const totalPages = Math.max(1, Math.ceil(safeTotal / safePerPage));
  const prevPage = safeCurrent > 1 ? safeCurrent - 1 : null;
  const nextPage = safeCurrent < totalPages ? safeCurrent + 1 : null;

  if (safeTotal === 0) return null;

  return (
    <div className="flex items-center justify-center gap-6 mt-10 text-sm">
      {/* Botón o enlace anterior */}
      {prevPage ? (
        onPageChange ? (
          <button
            onClick={() => onPageChange(prevPage)}
            className="px-3 py-2 rounded bg-white border hover:bg-blue-100 text-blue-600"
          >
            ⬅️ Anterior
          </button>
        ) : (
          <Link
            href={`/?page=${prevPage}`}
            className="px-3 py-2 rounded bg-white border hover:bg-blue-100 text-blue-600"
          >
            ⬅️ Anterior
          </Link>
        )
      ) : (
        <span className="px-3 py-2 rounded bg-gray-100 text-gray-400 cursor-not-allowed">
          ⬅️ Anterior
        </span>
      )}

      {/* Página actual */}
      <span className="text-gray-700 dark:text-gray-300">
        Página <strong>{safeCurrent}</strong> de <strong>{totalPages}</strong>
      </span>

      {/* Botón o enlace siguiente */}
      {nextPage ? (
        onPageChange ? (
          <button
            onClick={() => onPageChange(nextPage)}
            className="px-3 py-2 rounded bg-white border hover:bg-blue-100 text-blue-600"
          >
            Siguiente ➡️
          </button>
        ) : (
          <Link
            href={`/?page=${nextPage}`}
            className="px-3 py-2 rounded bg-white border hover:bg-blue-100 text-blue-600"
          >
            Siguiente ➡️
          </Link>
        )
      ) : (
        <span className="px-3 py-2 rounded bg-gray-100 text-gray-400 cursor-not-allowed">
          Siguiente ➡️
        </span>
      )}
    </div>
  );
}
