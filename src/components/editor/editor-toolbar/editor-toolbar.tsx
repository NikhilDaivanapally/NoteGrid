"use client";

import { useEffect, useRef, useState } from "react";
import type { Editor } from "@tiptap/react";

// --- UI Primitives ---
import { Button } from "@/components/editor/editor-ui-primitives/button";
import { Spacer } from "@/components/editor/editor-ui-primitives/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/editor/editor-ui-primitives/toolbar";

// --- Tiptap Node ---
import "@/components/editor/editor-node/blockquote-node/blockquote-node.scss";
import "@/components/editor/editor-node/code-block-node/code-block-node.scss";
import "@/components/editor/editor-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/editor/editor-node/list-node/list-node.scss";
import "@/components/editor/editor-node/image-node/image-node.scss";
import "@/components/editor/editor-node/heading-node/heading-node.scss";
import "@/components/editor/editor-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/editor/editor-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/editor/editor-ui/image-upload-button";
import { ListDropdownMenu } from "@/components/editor/editor-ui/list-dropdown-menu";
import { BlockquoteButton } from "@/components/editor/editor-ui/blockquote-button";
import { CodeBlockButton } from "@/components/editor/editor-ui/code-block-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/components/editor/editor-ui/color-highlight-popover";
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/editor/editor-ui/link-popover";
import { MarkButton } from "@/components/editor/editor-ui/mark-button";
import { TextAlignButton } from "@/components/editor/editor-ui/text-align-button";
import { UndoRedoButton } from "@/components/editor/editor-ui/undo-redo-button";

// --- Icons ---
import { ArrowLeftIcon, HighlighterIcon, LinkIcon } from "lucide-react";

// --- Hooks ---
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint";
import { useWindowSize } from "@/hooks/use-window-size";
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";

// --- Styles ---
import "@/components/editor/note-editor.scss";

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} />
        <ListDropdownMenu
          types={["bulletList", "orderedList", "taskList"]}
          portal={isMobile}
        />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}
    </>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);

type EditorToolbarProps = {
  editor: Editor | null;
};

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  const isMobile = useIsBreakpoint();
  const { height } = useWindowSize();
  const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">(
    "main"
  );
  const toolbarRef = useRef<HTMLDivElement>(null);

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);
  return (
    <Toolbar
      ref={toolbarRef}
      style={{
        ...(isMobile
          ? {
              bottom: `calc(100% - ${height - rect.y}px)`,
            }
          : {}),
      }}
    >
      {mobileView === "main" ? (
        <MainToolbarContent
          onHighlighterClick={() => setMobileView("highlighter")}
          onLinkClick={() => setMobileView("link")}
          isMobile={isMobile}
        />
      ) : (
        <MobileToolbarContent
          type={mobileView === "highlighter" ? "highlighter" : "link"}
          onBack={() => setMobileView("main")}
        />
      )}
    </Toolbar>
  );
};

export default EditorToolbar;
