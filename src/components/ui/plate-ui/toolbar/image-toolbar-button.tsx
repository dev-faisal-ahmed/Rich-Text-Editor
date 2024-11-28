/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEditorRef } from "@udecode/plate-common/react";
import { ImageIcon, ImagesIcon } from "lucide-react";
import { useFilePicker } from "use-file-picker";
import { ToolbarButton } from "./toolbar-buttons";

const currentConfig = {
  accept: ["image/*"],
  icon: <ImageIcon className="size-4" />,
  title: "Insert Image",
  tooltip: "Image",
};

export function ImageToolbarButton() {
  const editor = useEditorRef();
  const { openFilePicker } = useFilePicker({
    accept: currentConfig.accept,
    multiple: true,
    onFilesSelected: ({ plainFiles: updatedFiles }) => {
      (editor as any).tf.insert.imageFromFiles(updatedFiles);
    },
  });

  return (
    <>
      <ToolbarButton
        label="Insert Image"
        onClick={() => {
          openFilePicker();
        }}
      >
        <ImagesIcon size={16} />
      </ToolbarButton>
    </>
  );
}
