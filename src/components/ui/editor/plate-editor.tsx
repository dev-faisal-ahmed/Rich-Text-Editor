"use client";

import { Plate } from "@udecode/plate-common/react";
import { useCreateEditor } from "@/components/ui/editor/use-create-editor";
import { Editor, EditorContainer } from "@/components/ui/plate-ui/editor";

interface PlateEditorProps {
  className?: {
    editor?: string;
  };
}

export function PlateEditor({ className }: PlateEditorProps) {
  const editor = useCreateEditor();

  console.log(editor);
  return (
    <Plate editor={editor}>
      <EditorContainer>
        <Editor className={className?.editor} placeholder="Type..." />
      </EditorContainer>
    </Plate>
  );
}
