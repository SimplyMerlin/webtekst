import Link from "next/link";

const MissingPage = () => {
  return (
    <main className="font-mono">
      <div className="grid h-screen place-items-center">
        <div className="flex flex-col">
          <span className="text-4xl text-red-500">404</span>
          <Link href="/">
            <span className="ml-8 text-black/50 underline decoration-dashed transition-colors hover:text-black/80 dark:text-white/25 dark:hover:text-white/75">
              Terug naar de homepagina
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default MissingPage;
