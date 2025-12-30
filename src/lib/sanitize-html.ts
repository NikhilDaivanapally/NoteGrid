// lib/sanitize-html.ts
import DOMPurify from "dompurify";

export function sanitizeHtml(html: string) {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },

    ALLOWED_TAGS: [
      "p", "br",
      "strong", "em", "u", "s",
      "h1","h2","h3",
      "ul", "ol", "li",
      "blockquote",
      "pre", "code",
      "span",
      "img",
      "a",
    ],
    
    ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "class", "style"],

    // security layer

    // Stop for dangerous elements
    FORBID_TAGS: ["script", "iframe", "object", "embed"],

    // Stop for JS injection
    FORBID_ATTR: [
      "onerror",
      "onclick",
      "onload",
      "onmouseover",
    ],
  });
}
