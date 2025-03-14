"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { Button } from "~/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { useTRPC } from "~/trpc/react";

interface ImagePreviewProps {
  images: { url: string; fileKey: string }[];
  onChange: (value: { url: string; fileKey: string }[]) => void;
}

function ImagePreview({ images, onChange }: ImagePreviewProps) {
  const trpc = useTRPC();

  const { mutate: deleteFiles, isPending: isDeletingFiles } = useMutation(
    trpc.files.delete.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const handleDelete = useCallback(
    (fileKey: string) => {
      deleteFiles({
        keys: [fileKey],
      });

      onChange(images.filter((image) => image.fileKey !== fileKey));
    },
    [deleteFiles, images, onChange],
  );

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem
            key={image.fileKey}
            className="md:basis-1/2 lg:basis-1/3"
          >
            <div className="group relative flex flex-col justify-center gap-2">
              <Image
                src={image.url}
                alt="Product Image"
                width={500}
                height={500}
                className="rounded transition-opacity duration-300 group-hover:opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Button
                  onClick={() => handleDelete(image.fileKey)}
                  disabled={isDeletingFiles}
                  className="px-8"
                >
                  Delete
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious type="button" />
      <CarouselNext type="button" />
    </Carousel>
  );
}

export default ImagePreview;
