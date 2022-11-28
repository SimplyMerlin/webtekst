import Head from "next/head";

import { Article } from "@prisma/client";
import { useRouter } from "next/router";
import Link from "next/link";

const categories = [
  { name: "Alles", href: "/", current: true },
  { name: "Voetbal", href: "/categorie/voetbal", current: false },
  { name: "Binnenland", href: "/categorie/binnenland", current: false },
  { name: "Buitenland", href: "/categorie/buitenland", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function getMonth(date: Date) {
  switch (date.getMonth()) {
    case 0:
      return "Januari";
    case 1:
      return "Februari";
    case 2:
      return "Maart";
    case 3:
      return "April";
    case 4:
      return "Mei";
    case 5:
      return "Juni";
    case 6:
      return "Juli";
    case 7:
      return "Augustus";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
  }
}

function generateTimestamp(date: Date) {
  const now = new Date(Date.now());
  let prefix = "";
  if (date.getUTCFullYear() == now.getUTCFullYear()) {
    if (date.getUTCMonth() == now.getUTCMonth()) {
      if (date.getUTCDate() == now.getUTCDate()) {
        prefix = "Vandaag";
      } else if (date.getUTCDate() == now.getUTCDate() - 1) {
        prefix = "Gisteren";
      } else {
        prefix = date.getDate() + " " + getMonth(date);
      }
    } else {
      prefix = date.getDate() + " " + getMonth(date);
    }
  } else {
    prefix = date.getDate() + " " + getMonth(date) + " " + date.getFullYear();
  }
  return prefix + ", " + date.getHours() + ":" + date.getMinutes();
}

export const Feed = (props: { articles: Article[] }) => {
  return (
    <>
      <Head>
        <title>WebTekst</title>
      </Head>
      <NavBar />
      <main className="px-6 font-mono">
        <div className="container mx-auto max-w-5xl">
          {props.articles.length == 0 ? (
            <div className="text-center">Deze categorie is leeg...</div>
          ) : (
            <ArticleList articles={props.articles} />
          )}
        </div>
      </main>
    </>
  );
};

const ArticleList: React.FC<{ articles: Article[] }> = ({ articles }) => {
  return (
    <ul className="flex flex-col gap-y-4">
      {articles.map((item, index) => (
        <li key={index} className="even:text-black/80 dark:even:text-white/80">
          <Link href={"/artikel/" + item.slug}>
            <div className="flex justify-between">
              <span>{item.title}</span>
              <span className="text-right opacity-75">
                {generateTimestamp(new Date(item.createdAt))}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const NavBar: React.FC = () => {
  const router = useRouter();

  return (
    <header className="my-4 px-6 font-mono">
      <div className="container mx-auto">
        <div className="flex place-content-center">
          <div className="hidden gap-x-2 sm:flex">
            {categories.map((item, index) => (
              <>
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.href == router.asPath
                      ? ""
                      : "text-black/50 hover:text-black/80 dark:text-white/25 dark:hover:text-white/75",
                    "transition-colors"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
                {index < categories.length - 1 && (
                  <span className="text-black/50 dark:text-white/30">•</span>
                )}
              </>
            ))}
          </div>
          <div className="grid grid-cols-[1fr_minmax(0,_auto)_1fr] gap-x-2 sm:hidden">
            {categories.map((item, index) => (
              <>
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.href == router.asPath
                      ? ""
                      : "text-black/50 hover:text-black/80 dark:text-white/25 dark:hover:text-white/75",
                    "transition-colors"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
                {index < categories.length - 1 && index % 2 == 0 && (
                  <span className="inline text-black/50 dark:text-white/30">
                    •
                  </span>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
