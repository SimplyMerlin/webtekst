import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const articleRouter = router({
  getArticles: publicProcedure
    .input(
      z
        .object({
          amount: z.number().nullish(),
          category: z.string().nullish(),
        })
        .nullish()
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.article.findMany({
        take: input?.amount ? input.amount : 10,
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
});
