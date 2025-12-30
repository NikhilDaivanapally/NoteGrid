"use client";

import { useMemo } from "react";

import { Editor, EditorContent, EditorContext, useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection } from "@tiptap/extensions";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/editor/editor-node/image-upload-node/image-upload-node-extension";
import { HorizontalRule } from "@/components/editor/editor-node/horizontal-rule-node/horizontal-rule-node-extension";
import "@/components/editor/editor-node/blockquote-node/blockquote-node.scss";
import "@/components/editor/editor-node/code-block-node/code-block-node.scss";
import "@/components/editor/editor-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/editor/editor-node/list-node/list-node.scss";
import "@/components/editor/editor-node/image-node/image-node.scss";
import "@/components/editor/editor-node/heading-node/heading-node.scss";
import "@/components/editor/editor-node/paragraph-node/paragraph-node.scss";

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/editor-utils";

// --- Styles ---
import "@/components/editor/note-editor.scss";

import content from "@/components/editor/data/content.json";
import EditorToolbar from "./editor-toolbar/editor-toolbar";
import { debounce } from "@/hooks/use-debounce";
import { editorExtensions } from "./editor-extensions";

export function NoteEditor({ onContentUpdate }: any) {
  const debounceUpdate = useMemo(
    () =>
      debounce((editor: Editor) => {
        onContentUpdate(editor.getJSON());
      }, 500),
    [onContentUpdate]
  );

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    onUpdate: ({ editor }) => {
      debounceUpdate(editor);
    },
    extensions: editorExtensions,
    content,
  });

  return (
    <div className="simple-editor-wrapper">
      <EditorContext.Provider value={{ editor }}>
        {/* Editor Toolbar */}
        <EditorToolbar editor={editor} />

        {/* Editor Content */}
        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </EditorContext.Provider>
    </div>
  );
}
