// editor.extensions.ts
import { Selection } from "@tiptap/extensions";
import { baseExtensions } from "./base-extensions";
import { ImageUploadNode } from "./editor-node/image-upload-node";
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/editor-utils";

export const editorExtensions = [
  ...baseExtensions,
  Selection,
  ImageUploadNode.configure({
    accept: "image/*",
    maxSize: MAX_FILE_SIZE,
    limit: 3,
    upload: handleImageUpload,
    onError: (error) => console.error("Upload failed:", error),
  }),
];
