import { GetStaticProps } from "next";
import { Feed } from "../../components/feed";
import { trpc } from "../../utils/trpc";
import { prisma } from "../../server/db/client";
import { Article } from "@prisma/client";

const CategoryPage = (props: { articles: Article[] }) => {
  return <Feed articles={props.articles} />;
};

export default CategoryPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.category || typeof params.category !== "string") {
    return {
      notFound: true,
    };
  }
  const articles = await prisma.article.findMany({
    take: 10,
    select: {
      title: true,
      createdAt: true,
    },
    where: {
      categories: {
        some: {
          name: params.category,
        },
      },
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

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}
