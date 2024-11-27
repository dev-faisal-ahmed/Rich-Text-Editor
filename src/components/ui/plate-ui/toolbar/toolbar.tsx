import React from "react";
import { BoldPlugin, ItalicPlugin, StrikethroughPlugin, UnderlinePlugin } from "@udecode/plate-basic-marks/react";
import { BoldIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from "lucide-react";
import { MarkToolbarButton } from "./toolbar-buttons";
import TurnIntoDropdownMenu from "./turn-into-dropdown-menu";
import AlignmentDropdownMenu from "./alignment-dropdown-menu";
import { IndentButton, OutdentButton } from "./indent-outdent-buttons";

export default function Toolbar() {
  return (
    <div className="flex items-center gap-1 border-t pt-2">
      <MarkToolbarButton nodeType={BoldPlugin.key} label="Bold (⌘+B)">
        <BoldIcon className="size-4" />
      </MarkToolbarButton>
      <MarkToolbarButton nodeType={ItalicPlugin.key} label="Italic (⌘+I)">
        <ItalicIcon className="size-4" />
      </MarkToolbarButton>
      <MarkToolbarButton nodeType={UnderlinePlugin.key} label="Underline (⌘+U)">
        <UnderlineIcon className="size-4" />
      </MarkToolbarButton>
      <MarkToolbarButton nodeType={StrikethroughPlugin.key} label="Strikethrough (⌘+⇧+M)">
        <StrikethroughIcon className="size-4" />
      </MarkToolbarButton>
      <TurnIntoDropdownMenu />
      <AlignmentDropdownMenu />
      <IndentButton />
      <OutdentButton />
    </div>
  );
}
