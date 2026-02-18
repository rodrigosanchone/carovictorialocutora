"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { updatePost } from "@/lib/updatePost";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function EditPostPage() {
  const router = useRouter();
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [authorName, setAuthorName] = useState("Carolina");
  const [authorImage, setAuthorImage] = useState<string>(
    "https://firebasestorage.googleapis.com/v0/b/carovictorialocutora-ab405.firebasestorage.app/o/caro.jpg?alt=media&token=37b67aee-cb27-4b17-b486-b086262e67b2"
  );

  const today = new Date().toLocaleDateString("es-CR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    async function fetchPostAndTags() {
      const postRef = doc(db, "posts", slug as string);
      const postSnap = await getDoc(postRef);

      const tagsSnap = await getDocs(collection(db, "tags"));
      const allTags = tagsSnap.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setTags(allTags);

      if (postSnap.exists()) {
        const data = postSnap.data();
        setPost(data);
        setTitle(data.title || "");
        setDescription(data.description || "");
        setContent(data.content || "");
        setImagePreview(data.image || null);
        setSelectedTags(data.tags ?? []);
        setAuthorName(data.author?.name || "Carolina");
        if (data.author?.photo) setAuthorImage(data.author.photo);
      }

      setLoading(false);
    }

    fetchPostAndTags();
  }, [slug]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAuthorImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/webp" || file.type === "image/jpeg")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAuthorImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSave = async () => {
    if (!title || !content) {
      alert("Faltan campos obligatorios");
      return;
    }

    try {
      await updatePost({
        postId: slug as string,
        title,
        description,
        content,
        imageFile: imageFile ?? undefined,
        authorName,
        authorImage,
        selectedTags,
      });

      alert("Cambios guardados con éxito");
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Hubo un error al guardar los cambios");
    }
  };

  if (loading) return <div className="py-20 text-center">Cargando...</div>;
  if (!post)
    return (
      <div className="py-20 text-center text-red-500">Post no encontrado</div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
        Editar Artículo
      </h1>

      {/* Autor editable */}
      <div className="flex flex-col items-center justify-center gap-4 mb-10">
        <div className="relative w-24 h-24">
          <Image
            src={authorImage}
            alt="Foto del autor"
            fill
            className="rounded-full object-cover border-2 border-gray-300"
            sizes="96px"
          />
        </div>
        <label
          htmlFor="authorImageInput"
          className="cursor-pointer px-4 py-2 bg-gray-200 rounded text-sm hover:bg-gray-300 transition"
        >
          Elegir nueva foto
        </label>
        <input
          id="authorImageInput"
          type="file"
          accept="image/webp,image/jpeg"
          onChange={handleAuthorImageChange}
          className="hidden"
          title="Imagen del autor"
        />
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="px-4 py-2 border rounded text-center text-base"
          placeholder="Nombre del autor"
          title="Nombre del autor"
        />
      </div>

      <label htmlFor="titleInput" className="font-semibold mb-2 block">
        Título
      </label>
      <input
        id="titleInput"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded text-lg"
        placeholder="Título del artículo"
        title="Título del artículo"
      />

      <label htmlFor="descriptionInput" className="font-semibold mb-2 block">
        Descripción
      </label>
      <textarea
        id="descriptionInput"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded text-base"
        rows={3}
        placeholder="Breve descripción"
        title="Descripción del artículo"
      />

      <label htmlFor="contentInput" className="font-semibold mb-2 block">
        Contenido
      </label>
      <textarea
        id="contentInput"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded text-base"
        rows={10}
        placeholder="Contenido completo"
        title="Contenido del artículo"
      />

      <label htmlFor="imageInput" className="font-semibold mb-2 block">
        Imagen del artículo
      </label>
      <div className="mb-6">
        {imagePreview && (
          <div className="relative w-full h-80 mb-4">
            <Image
              src={imagePreview}
              alt="Vista previa"
              fill
              className="object-cover rounded-xl shadow-md"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}
        <label
          htmlFor="imageInput"
          className="cursor-pointer px-4 py-2 bg-gray-200 rounded text-sm hover:bg-gray-300 transition"
        >
          Elegir nueva imagen
        </label>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          title="Imagen del artículo"
        />
      </div>

      <label className="font-semibold mb-2 block">Etiquetas</label>
      <div className="flex flex-wrap gap-3 mb-6">
        {tags.map((tag) => (
          <label key={tag.id} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selectedTags.includes(tag.id)}
              onChange={() => handleTagToggle(tag.id)}
              title={`Etiqueta ${tag.name}`}
            />
            {tag.name}
          </label>
        ))}
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
        <p>
          🕒 Editado el: <strong>{today}</strong>
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Guardar cambios
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => router.push("/Dashboard")}
          className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
        >
          Volver al Dashboard
        </button>
      </div>
    </div>
  );
}
