import Link from "next/link";

export default function Header() {
  return (
    <section className=" py-20 text-center">
      <div className="max-w-3xl mx-auto px-4">
        <Link
          href="/"
          className="hover:underline text-blue-600 dark:text-blue-400"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Caro Victoria Locutora
          </h1>
        </Link>
      </div>
    </section>
  );
}
