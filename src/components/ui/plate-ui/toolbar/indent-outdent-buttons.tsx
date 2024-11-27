"use client";

import { useIndentButton, useOutdentButton } from "@udecode/plate-indent/react";
import { ToolbarButton } from "./toolbar-buttons";
import { IndentIcon, OutdentIcon } from "lucide-react";

export function IndentButton() {
  const { props } = useIndentButton();

  return (
    <ToolbarButton label="Indent" {...props}>
      <IndentIcon size={16} />
    </ToolbarButton>
  );
}

export function OutdentButton() {
  const { props } = useOutdentButton();

  return (
    <ToolbarButton label="Outdent" {...props}>
      <OutdentIcon size={16} />
    </ToolbarButton>
  );
}
