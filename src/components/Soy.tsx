export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-10 border-t border-gray-200 dark:border-gray-700 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
      <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
        Stay informed on the latest in AI technology with our focus on uplifting
        and positive stories. Learn about the advancements and innovations in
        artificial intelligence that are driving progress and making the world a
        better place.
      </p>
    </div>
  );
}
