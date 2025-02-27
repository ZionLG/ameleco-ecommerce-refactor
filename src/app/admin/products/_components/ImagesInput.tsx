"use client";
import React, { useCallback } from "react";
import { toast } from "sonner";
import { type ClientUploadedFileData } from "uploadthing/types";
import type { AmelecoFileRouter } from "~/app/api/uploadthing/core";
import { UploadDropzone } from "~/components/uploadthing";

const MAX_IMAGES = 5;

function ImagesInput({
  value,
  onChange,
}: {
  value: { url: string; fileKey: string }[];
  onChange: (value: { url: string; fileKey: string }[]) => void;
}) {
  const handleUploadComplete = useCallback(
    (
      res: ClientUploadedFileData<
        AmelecoFileRouter["pdfUploader"]["$types"]["output"]
      >[],
    ) => {
      const newImages = [
        ...res.flatMap((r) => ({ url: r.ufsUrl, fileKey: r.key })),
        ...value,
      ];
      onChange(newImages);
    },
    [onChange, value],
  );

  const handleUploadError = useCallback((error: Error) => {
    toast.error(error.message);
  }, []);

  const handleOnBeforeUploadBegin = useCallback(
    (files: File[]) => {
      if (files.length + value.length > MAX_IMAGES) {
        toast(
          `Product Images limit reached - Only ${MAX_IMAGES - value.length} images uploaded`,
        );
        return files.slice(MAX_IMAGES - value.length);
      }

      return files;
    },
    [value.length],
  );

  return (
    <UploadDropzone
      endpoint="imageUploader"
      className="ut-button:bg-primary"
      onClientUploadComplete={handleUploadComplete}
      onBeforeUploadBegin={handleOnBeforeUploadBegin}
      onUploadError={handleUploadError}
    />
  );
}

export default ImagesInput;
