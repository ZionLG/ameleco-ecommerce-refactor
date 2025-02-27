"use client";
import React, { useCallback } from "react";
import { toast } from "sonner";
import { type ClientUploadedFileData } from "uploadthing/types";
import type { AmelecoFileRouter } from "~/app/api/uploadthing/core";
import { Button } from "~/components/ui/button";
import { UploadDropzone } from "~/components/uploadthing";
import { api } from "~/trpc/react";

function PdfInput({
  value,
  onChange,
}: {
  value: { url?: string; fileKey?: string };
  onChange: (value: { url?: string; fileKey?: string }) => void;
}) {
  const { fileKey, url } = value;
  const isFileUploaded = url && fileKey;

  const { mutate: deleteFiles, isPending: isDeletingFiles } =
    api.files.delete.useMutation({
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const handleDelete = useCallback(() => {
    if (!fileKey) return;

    deleteFiles({
      keys: [fileKey],
    });
  }, [deleteFiles, fileKey]);

  const handleUploadComplete = useCallback(
    (
      res: ClientUploadedFileData<
        AmelecoFileRouter["pdfUploader"]["$types"]["output"]
      >[],
    ) => {
      // We only expect one file to be uploaded
      if (res[0]?.ufsUrl) {
        onChange({
          url: res[0].ufsUrl,
          fileKey: res[0].key,
        });
      }
    },
    [onChange],
  );

  const handleUploadError = useCallback((error: Error) => {
    toast.error(error.message);
  }, []);

  return (
    <>
      {isFileUploaded ? (
        <div className="flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View PDF
          </a>
          <Button
            variant="outline"
            onClick={handleDelete}
            disabled={isDeletingFiles}
          >
            Reset
          </Button>
        </div>
      ) : (
        <UploadDropzone
          endpoint="pdfUploader"
          className="ut-button:bg-primary"
          onClientUploadComplete={handleUploadComplete}
          onUploadError={handleUploadError}
        />
      )}
    </>
  );
}

export default PdfInput;
