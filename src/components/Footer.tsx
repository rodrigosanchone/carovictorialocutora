export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-gray-200 dark:border-gray-700 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
      <p>
        Creado por{" "}
        <a
          href="https://rodricode.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          RodriCode
        </a>{" "}
        — Todos los derechos reservados © {currentYear}
      </p>
    </footer>
  );
}
