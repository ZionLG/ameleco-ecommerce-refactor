"use client";

import Image, { type StaticImageData } from "next/image";
import React from "react";

export interface HomeCategoryProps {
  image: string | StaticImageData;
  title: string;
  description: string;
}

const HomeCategory = ({ description, image, title }: HomeCategoryProps) => {
  return (
    <div className="bg-background flex h-56 w-60 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg p-5 shadow-lg">
      <Image
        src={image}
        alt={title}
        className="rounded-md"
      />
      <div className="flex flex-col items-center">
        <span className="text-lg font-semibold">{title}</span>
        <span>{description}</span>
      </div>
    </div>
  );
};

export default HomeCategory;
