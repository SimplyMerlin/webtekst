import { GetStaticProps } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { prisma } from "../server/db/client";

import { trpc } from "../utils/trpc";
import { Article } from "@prisma/client";

const catogories = [
  { name: "Alles", href: "#", current: true },
  { name: "Voetbal", href: "#", current: false },
  { name: "Binnenland", href: "#", current: false },
  { name: "Buitenland", href: "#", current: false },
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

const Home = (props: { articles: Article[] }) => {
  return (
    <>
      <Head>
        <title>WebTekst</title>
      </Head>
      <NavBar />
      <main className="px-6 font-mono">
        <div className="container mx-auto max-w-5xl">
          <ArticleList articles={props.articles} />
        </div>
      </main>
    </>
  );
};

export default Home;

const ArticleList: React.FC<{ articles: Article[] }> = ({ articles }) => {
  return (
    <ul className="flex flex-col gap-y-4">
      {articles.map((item, index) => (
        <li key={index} className="even:text-black/80 dark:even:text-white/80">
          <div className="flex justify-between">
            <span>{item.title}</span>
            <span className="opacity-75">
              {generateTimestamp(new Date(item.createdAt))}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

const NavBar: React.FC = () => {
  return (
    <header className="my-4 px-6 font-mono">
      <div className="container mx-auto">
        <div className="flex place-content-center">
          <div className="flex gap-x-2">
            {catogories.map((item, index) => (
              <>
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? ""
                      : "text-black/50 hover:text-black/80 dark:text-white/25 dark:hover:text-white/75",
                    "transition-colors"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
                {index < catogories.length - 1 && (
                  <span className="text-black/50 dark:text-white/30">•</span>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const articles = await prisma.article.findMany({
    take: 10,
    select: {
      title: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
    },
    revalidate: 30,
  };
};
