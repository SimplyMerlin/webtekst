import Link from "next/link";

const ArticlePage = () => {
  return (
    <>
      <header className="my-4 px-4 font-mono">
        <div className="mx-auto max-w-3xl">
          <Link href="/">
            <span className="text-black/50 underline decoration-dashed transition-colors hover:text-black/80 dark:text-white/25 dark:hover:text-white/75">
              Terug
            </span>
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 font-mono">
        <article className="prose mx-auto dark:prose-invert">
          <h1>Test Artikel</h1>
          <p>Dit is een test artikel geschreven voor webtekst.</p>
          <h2>Wat is webtekst?</h2>
          <p>
            Webtekst is eigenlijk teletekst, maar dan hip. Snap je, niet{" "}
            <strong>Tele</strong>Tekst maar <strong>Web</strong>Tekst. haha.
            Wauwie.
          </p>
        </article>
      </main>
    </>
  );
};

export default ArticlePage;
