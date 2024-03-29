import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { articleRouter } from "./article";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  article: articleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
