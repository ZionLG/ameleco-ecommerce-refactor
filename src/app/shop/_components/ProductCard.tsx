"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Dot } from "lucide-react";

import type { RouterOutputs } from "~/trpc/react";
import { Card, CardContent, CardFooter } from "~/components/ui/card";

interface ProductCardProps {
  product: NonNullable<RouterOutputs["products"]["getProducts"][number]>;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/shop/${encodeURIComponent(product.id)}`}
      className="w-fit justify-self-center"
    >
      <Card className="w-64">
        <CardContent className="items-center gap-2 overflow-visible p-2">
          <Image
            width={250}
            height={250}
            alt={product.name}
            className="border-1 h-[140px] object-contain"
            src={"https://placehold.co/250.png"}
          />
          <b>{product.name}</b>
        </CardContent>
        <CardFooter className="text-small flex-col items-start p-5">
          <div className="flex">
            <span className="text-default-500 text-xl">${product.price}</span>
            <div
              className={`flex items-center font-bold ${
                product.stock > 0 ? "text-green-600" : "text-gray-500"
              }`}
            >
              <Dot />
              {product.stock > 0 ? (
                <span>In stock</span>
              ) : (
                <span>Sold out</span>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
