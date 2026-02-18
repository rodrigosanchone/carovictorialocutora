"use client";
import { useState, useEffect } from "react";
import BlogList from "@/components/BlogList";
import Paginator from "@/components/Paginator";
import { getPosts } from "@/lib/getPosts";
import CreatedPost from "@/components/CreatedPost";
import UpdateTags from "@/components/UpdateTags";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { logout } from "@/lib/login";

const user = auth.currentUser;

export default function DashboardPage() {
  const router = useRouter();

  const [activeSection, setActiveSection] = useState<
    "crear" | "editar" | "etiquetas"
  >("editar");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 4;

  useEffect(() => {
    async function fetchPosts() {
      const data = await getPosts();
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const total = posts.length;
  const paginatedPosts = posts.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleLogout = async () => {
    await logout();
    router.push("/Login");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Panel de Control</h1>
      <h2 className="text-lg text-gray-700 mb-4">
        Bienvenido, {user?.email ?? "Usuario"}
      </h2>

      {/* Botones de navegación */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveSection("crear")}
          className={`px-4 py-2 rounded ${
            activeSection === "crear"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Crear Artículo
        </button>
        <button
          onClick={() => setActiveSection("editar")}
          className={`px-4 py-2 rounded ${
            activeSection === "editar"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Editar Artículo
        </button>
        <button
          onClick={() => setActiveSection("etiquetas")}
          className={`px-4 py-2 rounded ${
            activeSection === "etiquetas"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Etiquetas
        </button>

        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
        >
          Salir del Panel
        </button>
      </div>

      {/* Secciones */}
      {activeSection === "crear" && (
        <div>
          {" "}
          <CreatedPost></CreatedPost>
        </div>
      )}

      {activeSection === "editar" &&
        (loading ? (
          <p>Cargando artículos...</p>
        ) : (
          <>
            <BlogList posts={paginatedPosts} modoEdicion />
            <div className="flex justify-center">
              <Paginator
                current={currentPage}
                total={total}
                perPage={perPage}
                onPageChange={(page: number) => setCurrentPage(page)}
              />
            </div>
          </>
        ))}

      {activeSection === "etiquetas" && (
        <div>
          <UpdateTags></UpdateTags>
        </div>
      )}
    </div>
  );
}
