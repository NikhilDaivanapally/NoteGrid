import { generateHTML, type JSONContent } from "@tiptap/core";
import React from "react";
import { previewExtensions } from "../preview-extensions";
import { sanitizeHtml } from "@/lib/sanitize-html";

type EditorContentRendererProps = {
  content: JSONContent;
  className?: string;
};

const EditorContentRenderer = ({
  content,
  className,
}: EditorContentRendererProps) => {
  if (!content) return null;

  // Generate HTML from TipTap JSON
  const rawHtml = generateHTML(content, previewExtensions);

  //   Sanitize HTML
  const safeHtml = sanitizeHtml(rawHtml);

  return (
    <div
      className={`prose prose-sm dark:prose-invert max-w-none ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
};

export default EditorContentRenderer;
