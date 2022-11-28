import { GetStaticProps } from "next";
import { Feed } from "../components/feed";
import { prisma } from "../server/db/client";
import { Article } from "@prisma/client";

const CategoryPage = (props: { articles: Article[] }) => {
  return <Feed articles={props.articles} />;
};

export default CategoryPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const articles = await prisma.article.findMany({
    take: 10,
    select: {
      title: true,
      createdAt: true,
      slug: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
    },
    revalidate: 60,
  };
};
