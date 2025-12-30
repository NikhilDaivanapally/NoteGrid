"use client";

import { useMemo } from "react";

import { Editor, EditorContent, EditorContext, useEditor } from "@tiptap/react";

// --- Tiptap Node ---
import "@/components/editor/editor-node/blockquote-node/blockquote-node.scss";
import "@/components/editor/editor-node/code-block-node/code-block-node.scss";
import "@/components/editor/editor-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/editor/editor-node/list-node/list-node.scss";
import "@/components/editor/editor-node/image-node/image-node.scss";
import "@/components/editor/editor-node/heading-node/heading-node.scss";
import "@/components/editor/editor-node/paragraph-node/paragraph-node.scss";

// --- Styles ---
import "@/components/editor/note-editor.scss";

import EditorToolbar from "./editor-toolbar/editor-toolbar";
import { debounce } from "@/hooks/use-debounce";
import { editorExtensions } from "./editor-extensions";

export function NoteEditor({ initialContent, onContentUpdate }: any) {
  const debounceUpdate = useMemo(
    () =>
      debounce((editor: Editor) => {
        onContentUpdate(editor.getJSON());
      }, 500),
    [onContentUpdate]
  );

  const editor = useEditor({
    immediatelyRender: false,
    content: initialContent,
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
