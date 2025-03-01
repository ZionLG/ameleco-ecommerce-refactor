'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: { url: string }[];
  alt: string;
}

function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="flex">
      <div className="flex flex-col space-y-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`cursor-pointer border rounded ${index === currentIndex ? 'border-primary' : 'border-transparent'}`}
            onClick={() => setCurrentIndex(index)}
          >
            <Image
              src={image.url}
              alt={`${alt} thumbnail ${index + 1}`}
              width={100}
              height={100}
              className="object-cover rounded"
            />
          </div>
        ))}
      </div>
      <div className="flex-grow ml-4">
        <Image
          src={images[currentIndex]?.url ?? "https://placehold.co/500.png"}
          alt={alt}
          width={500}
          height={500}
          className="object-cover h-full rounded"
        />
      </div>
    </div>
  );
}

export default ImageGallery;