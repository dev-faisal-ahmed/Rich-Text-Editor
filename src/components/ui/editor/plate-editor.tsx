"use client";

import { Plate } from "@udecode/plate-common/react";
import { useCreateEditor } from "@/components/ui/editor/use-create-editor";
import { Editor, EditorContainer } from "@/components/ui/plate-ui/editor";
import { ScrollArea } from "../scroll-area";
import Toolbar from "../plate-ui/toolbar/toolbar";
import { cn } from "@/lib/utils";

interface PlateEditorProps {
  className?: {
    editor?: string;
    editorContainer?: string;
    scrollArea?: string;
  };
}

export function PlateEditor({ className }: PlateEditorProps) {
  const editor = useCreateEditor();

  return (
    <Plate editor={editor}>
      <EditorContainer className={cn("grid grid-rows-[1fr_auto]", className?.editorContainer)}>
        <ScrollArea className={cn("max-h-[50vh]", className?.scrollArea)}>
          <Editor className={className?.editor} placeholder="Type..." />
        </ScrollArea>
        <Toolbar />
      </EditorContainer>
    </Plate>
  );
}
