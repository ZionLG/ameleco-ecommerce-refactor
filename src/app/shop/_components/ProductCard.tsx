"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import type { RouterOutputs } from "~/trpc/react";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import Stock from "~/components/Stock";

interface ProductCardProps {
  product: NonNullable<RouterOutputs["products"]["getProducts"][number]>;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { stock, name, price, productImages } = product;

  const frontImage = productImages[0]?.url ?? "https://placehold.co/250.png";

  return (
    <Link
      href={`/${encodeURIComponent(name)}`}
      className="w-fit justify-self-center"
    >
      <Card className="w-64">
        <CardContent className="gap-2 flex flex-col overflow-visible p-2">
          <Image
            width={250}
            height={250}
            alt={name}
            className="border-1 object-contain rounded"
            src={frontImage}
          />
          <b>{name}</b>
          <div className="flex">
            <span className="text-default-500 text-xl">${price}</span>
            <Stock stock={stock} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
