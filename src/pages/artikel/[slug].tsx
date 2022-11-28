import { GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { prisma } from "../../server/db/client";
import Link from "next/link";

const components = {
  a: (props: any) => <Link {...props} target="_blank"></Link>,
};

const ArticlePage = (props: { content: MDXRemoteSerializeResult }) => {
  return (
    <>
      <header className="my-4 px-4 font-mono print:hidden">
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
          <MDXRemote {...props.content} components={components} />
        </article>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.slug || typeof params.slug !== "string") {
    return {
      notFound: true,
    };
  }
  const article = await prisma.article.findFirst({
    where: {
      slug: params.slug,
    },
  });
  if (!article) return { notFound: true };
  const mdxSource = await serialize(article.content);
  return {
    props: {
      content: mdxSource,
    },
    revalidate: 30,
  };
};

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export default ArticlePage;
