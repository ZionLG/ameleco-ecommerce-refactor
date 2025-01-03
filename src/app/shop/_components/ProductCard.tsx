"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Dot } from "lucide-react";

import type { RouterOutputs } from "~/trpc/react";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import Stock from "~/components/Stock";

interface ProductCardProps {
  product: NonNullable<RouterOutputs["products"]["getProducts"][number]>;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { stock, name, price } = product;
  return (
    <Link
      href={`/shop/${encodeURIComponent(name)}`}
      className="w-fit justify-self-center"
      scroll={true}
    >
      <Card className="w-64">
        <CardContent className="items-center gap-2 overflow-visible p-2">
          <Image
            width={250}
            height={250}
            alt={name}
            className="border-1 h-[140px] object-contain"
            src={"https://placehold.co/250.png"}
          />
          <b>{name}</b>
        </CardContent>
        <CardFooter className="text-small flex-col items-start p-5">
          <div className="flex">
            <span className="text-default-500 text-xl">${price}</span>
            <Stock stock={stock} />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
