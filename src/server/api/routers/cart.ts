import { TRPCError } from "@trpc/server";
import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { cartItem, cart } from "~/server/db/schema";

const preparedUserCartWithFullItems= db.query.cart
  .findFirst({
    where: (cart, { eq }) => eq(cart.userId, sql.placeholder("userId")),
    columns: {
      id: true,
    },
    with: {
      cartItems: {
        columns: {
          cartId: false,
        },
        with: {
          product: {
            columns: {
              stock: true,
              price: true,
              id: true,
              name: true,
            },
          },
        },
      },
    },
  })
  .prepare();

const preparedUserCartWithItemsStock = db.query.cart
  .findFirst({
    where: (cart, { eq }) => eq(cart.userId, sql.placeholder("userId")),
    columns: {
      id: true,
    },
    with: {
      cartItems: {
        columns: {
          id: true,
          productId: true,
        },
        with: {
          product: {
            columns: {
              stock: true,
            },
          },
        },
      },
    },
  })
  .prepare();

const preparedUserCart = db.query.cart
  .findFirst({
    where: (cart, { eq }) => eq(cart.userId, sql.placeholder("userId")),
    columns: {
      id: true,
    },
  })
  .prepare();

const preparedProductStock = db.query.products
  .findFirst({
    where: (product, { eq }) => eq(product.id, sql.placeholder("id")),
    columns: {
      stock: true,
    },
  })
  .prepare();

async function fetchProductStock(productId: number) {
  const product = await preparedProductStock.execute({ id: productId });

  if (!product) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Product not found.",
    });
  }

  return product;
}

async function createUserCart({
  ctxDB,
  userId,
}: {
  ctxDB: typeof db;
  userId: string;
}) {
  return await ctxDB.transaction(async (tx) => {
    const [newCart] = await tx.insert(cart).values({ userId }).returning();

    if (!newCart) {
      tx.rollback();
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred.",
      });
    }

    return newCart;
  });
}

const quantityError = new TRPCError({
  code: "BAD_REQUEST",
  message: "Quantity is greater than stock.",
});

export const cartRouter = createTRPCRouter({
  getCart: protectedProcedure.query(async ({ ctx: { db, session } }) => {
    const cart = await preparedUserCartWithFullItems.execute({
      userId: session.user.id,
    });

    if (!cart) {
      const newCart = await createUserCart({
        ctxDB: db,
        userId: session.user.id,
      });

      return {
        ...newCart,
        cartItems: [],
      };
    }

    return cart;
  }),
  removeFromCart: protectedProcedure
    .input(z.object({ cartItemId: z.number() }))
    .mutation(async ({ ctx: { db, session }, input: { cartItemId } }) => {
      const userCart = await preparedUserCart.execute({
        userId: session.user.id,
      });

      if (!userCart) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User does not have a cart.",
        });
      }

      return await db
        .delete(cartItem)
        .where(
          and(eq(cartItem.id, cartItemId), eq(cartItem.cartId, userCart.id)),
        );
    }),
  addToCart: protectedProcedure
    .input(
      z.object({
        productId: z.number(),
        quantity: z.number().positive(),
      }),
    )
    .mutation(
      async ({ ctx: { db, session }, input: { productId, quantity } }) => {
        const userCart = await preparedUserCartWithItemsStock.execute({
          userId: session.user.id,
        });

        if (userCart) {
          return await db.transaction(async (tx) => {
            // Check if the product is already in the cart
            const productItem = userCart.cartItems.find(
              (cartItem) => cartItem.productId === productId,
            );

            if (productItem) {
              const {
                product: { stock },
                id: cartItemId,
              } = productItem;

              if (stock < quantity) {
                throw quantityError;
              }

              // Update the cart item with the new quantity
              await tx
                .update(cartItem)
                .set({
                  quantity,
                })
                .where(eq(cartItem.id, cartItemId));
            } else {
              // Create a new cart item
              const product = await fetchProductStock(productId);

              if (product.stock < quantity) {
                throw quantityError;
              }

              await tx.insert(cartItem).values({
                productId,
                cartId: userCart.id,
                quantity,
              });
            }
          });
        }

        return await db.transaction(async (tx) => {
          const newCart = await createUserCart({
            ctxDB: db,
            userId: session.user.id,
          });

          const product = await fetchProductStock(productId);

          if (product.stock < quantity) {
            tx.rollback();
            throw quantityError;
          }

          await tx.insert(cartItem).values({
            productId,
            cartId: newCart.id,
            quantity,
          });
        });
      },
    ),
});
