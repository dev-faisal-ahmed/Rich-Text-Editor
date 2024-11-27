"use client";

import { getBlockType, setBlockType } from "../../editor/transform";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { INDENT_LIST_KEYS, ListStyleType } from "@udecode/plate-indent-list";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { TElement } from "@udecode/plate-common";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "../../dropdown-menu";
import { ChevronDownIcon, Heading1Icon, Heading2Icon, Heading3Icon, ListIcon, ListOrderedIcon, ListTodoIcon, PilcrowIcon, QuoteIcon } from "lucide-react";
import { ParagraphPlugin, useEditorRef, useSelectionFragmentProp, focusEditor } from "@udecode/plate-common/react";
import { useMemo, useState } from "react";
import { ToolbarButton } from "./toolbar-buttons";

const turnIntoItems = [
  { icon: <PilcrowIcon size={16} />, keywords: ["paragraph"], label: "Text", value: ParagraphPlugin.key },
  { icon: <Heading1Icon size={16} />, keywords: ["title", "h1"], label: "Heading 1", value: HEADING_KEYS.h1 },
  { icon: <Heading2Icon size={16} />, keywords: ["subtitle", "h2"], label: "Heading 2", value: HEADING_KEYS.h2 },
  { icon: <Heading3Icon size={16} />, keywords: ["subtitle", "h3"], label: "Heading 3", value: HEADING_KEYS.h3 },
  { icon: <ListIcon size={16} />, keywords: ["unordered", "ul", "-"], label: "Bulleted list", value: ListStyleType.Disc },
  { icon: <ListOrderedIcon size={16} />, keywords: ["ordered", "ol", "1"], label: "Numbered list", value: ListStyleType.Decimal },
  { icon: <ListTodoIcon size={16} />, keywords: ["checklist", "task", "checkbox", "[]"], label: "To-do list", value: INDENT_LIST_KEYS.todo },
  { icon: <QuoteIcon size={16} />, keywords: ["citation", "blockquote", ">"], label: "Quote", value: BlockquotePlugin.key },
];

// Turn Into Drop Down Menu => it is responsible to make a specific block into Heading 1, 2, 3 paragraph, or quote block
export default function TurnIntoDropdownMenu() {
  const editor = useEditorRef();
  const [isOpen, setIsOpen] = useState(false);

  const value = useSelectionFragmentProp({
    defaultValue: ParagraphPlugin.key,
    getProp: (node) => getBlockType(node as TElement),
  });

  const selectedItem = useMemo(() => {
    return turnIntoItems.find((item) => item.value === value ?? ParagraphPlugin.key) ?? turnIntoItems[0];
  }, [value]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton variant="dropdown" className="text-sm pr-1" isActive={isOpen} label="Turn Into">
          {selectedItem.label} <ChevronDownIcon size={16} />
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ignore-click-outside/toolbar min-w-0">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(type) => {
            setBlockType(editor, type);
            focusEditor(editor);
          }}
        >
          {turnIntoItems.map(({ icon, label, value }) => (
            <DropdownMenuRadioItem key={value} className="min-w-40 flex items-center gap-2" value={value}>
              {icon} {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
