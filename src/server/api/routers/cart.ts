import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import type { db } from "~/server/db";
import { cartItem, cart, users } from "~/server/db/schema";

async function fetchUserCart({
  ctxDB,
  cartId,
}: {
  ctxDB: typeof db;
  cartId: number;
}) {
  return await ctxDB.query.cart.findFirst({
    where: (cart, { eq }) => eq(cart.id, cartId),
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
  });
}

async function fetchProductStock({
  ctxDB,
  productId,
}: {
  ctxDB: typeof db;
  productId: number;
}) {
  const product = await ctxDB.query.products.findFirst({
    where: (product, { eq }) => eq(product.id, productId),
    columns: {
      stock: true,
    },
  });

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
    const [newCart] = await tx.insert(cart).values({}).returning();

    if (!newCart) {
      tx.rollback();
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred.",
      });
    }

    await tx
      .update(users)
      .set({ cartId: newCart.id })
      .where(eq(users.id, userId));

    return newCart;
  });
}

const quantityError = new TRPCError({
  code: "BAD_REQUEST",
  message: "Quantity is greater than stock.",
});

export const cartRouter = createTRPCRouter({
  getCart: protectedProcedure.query(async ({ ctx: { db, session } }) => {
    const cartId = session.user.cartId;

    if (!cartId) {
      const newCart = await createUserCart({
        ctxDB: db,
        userId: session.user.id,
      });

      return {
        ...newCart,
        cartItems: [],
      };
    }

    const cart = await db.query.cart.findFirst({
      where: (cart, { eq }) => eq(cart.id, cartId),
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
    });

    if (!cart) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message:
          "Cart not found despite user having an assigned cart, please contact support.",
      });
    }

    return cart;
  }),
  removeFromCart: protectedProcedure
    .input(z.object({ cartItemId: z.number() }))
    .mutation(async ({ ctx: { db, session }, input: { cartItemId } }) => {
      const cartId = session.user.cartId;

      if (!cartId) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User does not have a cart assigned.",
        });
      }

      return await db
        .delete(cartItem)
        .where(and(eq(cartItem.id, cartItemId), eq(cartItem.cartId, cartId)));
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
        const cartId = session.user.cartId;

        // Try to fetch the user's cart if cartId is defined
        if (cartId) {
          return await db.transaction(async (tx) => {
            const userCart = await fetchUserCart({
              cartId,
              ctxDB: db,
            });

            if (!userCart) {
              throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message:
                  "Cart not found despite user having an assigned cart, please contact support.",
              });
            }

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
              const product = await fetchProductStock({
                ctxDB: db,
                productId,
              });

              if (product.stock < quantity) {
                throw quantityError;
              }

              await tx.insert(cartItem).values({
                productId,
                cartId,
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

          const product = await fetchProductStock({
            ctxDB: db,
            productId,
          });

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
