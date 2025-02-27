import { categoriesRouter } from "~/server/api/routers/categories";
import { productsRouter } from "~/server/api/routers/products";
import { subCategoriesRouter } from "~/server/api/routers/subCategories";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { subSubCategoriesRouter } from "./routers/subSubCategories";
import { cartRouter } from "./routers/cart";
import { userRouter } from "./routers/user";
import { filesRouter } from "./routers/files";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here. 
 */
export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  subCategories: subCategoriesRouter,
  subSubCategories: subSubCategoriesRouter,
  products: productsRouter,
  cart: cartRouter,
  user: userRouter,
  files: filesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
