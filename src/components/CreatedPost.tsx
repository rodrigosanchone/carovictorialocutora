import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { createPost } from "@/lib/post";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CreatedPost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [authorName, setAuthorName] = useState("Carolina");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [authorImage, setAuthorImage] = useState<string>(
    "https://firebasestorage.googleapis.com/v0/b/carovictorialocutora-ab405.firebasestorage.app/o/caro.jpg?alt=media&token=37b67aee-cb27-4b17-b486-b086262e67b2"
  );

  const today = new Date().toLocaleDateString("es-CR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    async function fetchTags() {
      const tagsSnap = await getDocs(collection(db, "tags"));
      const allTags = tagsSnap.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setTags(allTags);
    }
    fetchTags();
  }, []);

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

  const handlePublish = async () => {
    if (!title || !content || !imageFile) {
      alert("Faltan campos obligatorios");
      return;
    }

    try {
      const postId = await createPost({
        title,
        description,
        content,
        imageFile,
        authorName,
        authorImage,
        selectedTags,
        youtubeUrl,
      });

      alert("Artículo publicado con éxito");
      setTitle("");
      setDescription("");
      setContent("");
      setImagePreview(null);
      setImageFile(null);
      setSelectedTags([]);
      setYoutubeUrl("");
    } catch (error) {
      console.error("Error al publicar:", error);
      alert("Hubo un error al guardar el artículo");
    }
  };

  function isValidYouTubeUrl(url: string): boolean {
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(url);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
        Crear nuevo artículo
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
        <input
          type="file"
          accept="image/webp,image/jpeg"
          onChange={handleAuthorImageChange}
          className="text-sm text-gray-600"
          aria-label="Imagen del autor"
          title="Imagen del autor"
        />
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="px-4 py-2 border rounded text-center text-base"
          placeholder="Nombre del autor"
          aria-label="Nombre del autor"
        />
      </div>

      <h2 className="font-semibold mb-2">Título</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded text-lg"
        placeholder="Título del artículo"
        aria-label="Título del artículo"
      />

      <h2 className="font-semibold mb-2">Descripción</h2>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded text-base"
        rows={3}
        placeholder="Breve descripción del artículo"
        aria-label="Descripción del artículo"
      />

      <h2 className="font-semibold mb-2">Contenido</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded text-base"
        rows={10}
        placeholder="Contenido completo del artículo"
        aria-label="Contenido del artículo"
      />

      <h2 className="font-semibold mb-2">Imagen del artículo</h2>
      <div className="mb-6">
        {imagePreview && (
          <div className="relative w-full h-80 mb-4">
            <Image
              src={imagePreview}
              alt="Vista previa de la imagen"
              fill
              className="object-cover rounded-xl shadow-md"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="cursor-pointer px-4 py-2 bg-gray-200 rounded text-sm hover:bg-gray-300 transition"
          aria-label="Imagen del artículo"
          title="Imagen del artículo"
        />
      </div>

      <h2 className="font-semibold mb-2">Video de YouTube (opcional)</h2>
      <input
        type="url"
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded text-base"
        placeholder="https://www.youtube.com/watch?v=..."
        aria-label="URL del video de YouTube"
        title="URL del video de YouTube"
      />
      {youtubeUrl && !isValidYouTubeUrl(youtubeUrl) && (
        <p className="text-sm text-red-500 mb-4">
          ⚠️ La URL no parece válida. Asegúrate de que sea un enlace de YouTube.
        </p>
      )}

      <h2 className="font-semibold mb-2">Etiquetas</h2>
      <div className="flex flex-wrap gap-3 mb-6">
        {tags.map((tag) => (
          <label key={tag.id} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selectedTags.includes(tag.id)}
              onChange={() => handleTagToggle(tag.id)}
              aria-label={`Etiqueta ${tag.name}`}
              title={`Etiqueta ${tag.name}`}
            />
            {tag.name}
          </label>
        ))}
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
        <p>
          🕒 Creado el: <strong>{today}</strong>
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handlePublish}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          aria-label="Publicar artículo"
          title="Publicar artículo"
        >
          Publicar artículo
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
