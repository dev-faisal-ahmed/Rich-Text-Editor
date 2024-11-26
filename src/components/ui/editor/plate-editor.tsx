"use client";

import { Plate } from "@udecode/plate-common/react";
import { useCreateEditor } from "@/components/ui/editor/use-create-editor";
import { Editor, EditorContainer } from "@/components/ui/plate-ui/editor";
import { ScrollArea } from "../scroll-area";
import { Toolbar } from "../plate-ui/toolbar";

interface PlateEditorProps {
  className?: {
    editor?: string;
    editorContainer?: string;
  };
}

export function PlateEditor({ className }: PlateEditorProps) {
  const editor = useCreateEditor();

  return (
    <Plate editor={editor}>
      <EditorContainer className="grid grid-rows-[1fr_auto]">
        <ScrollArea className="max-h-[50vh]">
          <Editor className={className?.editor} placeholder="Type..." />
        </ScrollArea>
        <Toolbar />
      </EditorContainer>
    </Plate>
  );
}
