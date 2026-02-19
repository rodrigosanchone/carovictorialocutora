import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import Image from "next/image";
import sanitizeHtml from "sanitize-html";
import type { Metadata } from "next";
import { FaFacebook, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import AsideTags from "@/components/AsideTags";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function serializePost(post: any) {
  if (!post) return null;
  return {
    ...post,
    createdAt: post?.createdAt?.seconds
      ? new Date(post.createdAt.seconds * 1000).toISOString()
      : null,
  };
}

// Buscar post por campo slug
async function getPostBySlug(slug: string) {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, where("slug", "==", slug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...serializePost(docSnap.data()) };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params; // 👈 desempaquetar Promise
  const slug = resolvedParams.slug;

  if (!slug) {
    return { title: "Slug inválido", description: "No se proporcionó slug." };
  }

  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artículo no encontrado",
      description: "Este artículo no existe o fue eliminado.",
    };
  }

  return {
    title: post.title,
    description: post.description ?? "Artículo sobre locución y comunicación.",
    openGraph: {
      title: post.title,
      description:
        post.description ?? "Artículo sobre locución y comunicación.",
      images: [
        {
          url: post.image ?? "https://carovictorialocutora.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      url: `https://carovictorialocutora.com/post/${slug}`,
      siteName: "Carovictoria Locutora",
      locale: "es_CR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description:
        post.description ?? "Artículo sobre locución y comunicación.",
      images: [post.image ?? "https://carovictorialocutora.com/og-image.jpg"],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  try {
    const resolvedParams = await params; // 👈 desempaquetar Promise
    const slug = resolvedParams.slug;

    if (!slug) {
      return (
        <div className="text-center py-20 text-red-500">Slug inválido</div>
      );
    }

    const post = await getPostBySlug(slug);
    const metaRef = doc(db, "postMeta", slug);
    const metaSnap = await getDoc(metaRef);
    const meta = metaSnap.exists() ? metaSnap.data() : null;

    if (!post) {
      return (
        <div className="text-center py-20 text-red-500">Post no encontrado</div>
      );
    }

    const fecha = post?.createdAt
      ? new Date(post.createdAt).toLocaleDateString("es-CR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Fecha desconocida";

    const autorNombre = post.author?.name || "Autor desconocido";
    const autorFoto =
      typeof post.author?.photo === "string" &&
      post.author.photo.startsWith("http")
        ? post.author.photo
        : null;

    const contenidoSeguro =
      typeof post.content === "string" ? sanitizeHtml(post.content) : null;

    const hasVideo =
      typeof post.youtubeVideoId === "string" &&
      post.youtubeVideoId.length === 11;

    return (
      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
        <article>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            {autorFoto && (
              <div className="w-10 h-10 relative shrink-0">
                <Image
                  src={autorFoto}
                  alt={autorNombre}
                  fill
                  className="rounded-full object-cover"
                  sizes="40px"
                />
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {autorNombre}
              </p>
            </div>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {contenidoSeguro ? (
              contenidoSeguro.includes("<p>") ? (
                <div dangerouslySetInnerHTML={{ __html: contenidoSeguro }} />
              ) : (
                contenidoSeguro.split("\n").map((p, i) => <p key={i}>{p}</p>)
              )
            ) : (
              <p className="text-red-500">Contenido no disponible</p>
            )}
          </div>

          {meta && (
            <div className="mt-10 text-sm text-gray-500 dark:text-gray-400">
              <span>👁️ {meta.views ?? 0} vistas</span> ·{" "}
              <span>❤️ {meta.likes ?? 0} likes</span>
            </div>
          )}

          {hasVideo ? (
            <div className="mt-16 flex justify-center">
              <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-md">
                <iframe
                  src={`https://www.youtube.com/embed/${post.youtubeVideoId}`}
                  title="Video de YouTube"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          ) : post.image ? (
            <div className="mt-16 flex justify-center">
              <div className="relative w-full max-w-4xl h-80 sm:h-[28rem]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover rounded-xl shadow-md"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              </div>
            </div>
          ) : null}

          <p className="text-xs text-black-500 mt-15">{fecha}</p>

          <div className="mt-12 flex justify-end">
            <Link
              href="/"
              className="inline-block px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Volver
            </Link>
          </div>

          <div className="mt-10 flex gap-6 justify-center text-gray-600 dark:text-gray-300">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://carovictorialocutora.com/post/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
              title="Compartir en Facebook"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=https://carovictorialocutora.com/post/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500"
              title="Compartir en WhatsApp"
            >
              <FaWhatsapp size={24} />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=https://carovictorialocutora.com/post/${slug}&text=${encodeURIComponent(
                post.title,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white"
              title="Compartir en X"
            >
              <FaXTwitter size={24} />
            </a>
          </div>
        </article>

        <aside className="hidden lg:block mt-12">
          <AsideTags />
        </aside>
      </div>
    );
  } catch (error) {
    return (
      <div className="text-center py-20 text-red-500">
        Error al cargar el post. Revisa los logs del servidor.
      </div>
    );
  }
}
