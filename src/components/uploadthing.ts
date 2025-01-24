import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { AmelecoFileRouter } from "~/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<AmelecoFileRouter>();
export const UploadDropzone = generateUploadDropzone<AmelecoFileRouter>();
