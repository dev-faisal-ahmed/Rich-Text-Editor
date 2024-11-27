"use client";

import { useAlignDropdownMenu, useAlignDropdownMenuState } from "@udecode/plate-alignment/react";
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "../../dropdown-menu";
import { ToolbarButton } from "./toolbar-buttons";

const items = [
  { icon: <AlignLeftIcon size={16} />, value: "left" },
  { icon: <AlignCenterIcon size={16} />, value: "center" },
  { icon: <AlignRightIcon size={16} />, value: "right" },
  { icon: <AlignJustifyIcon size={16} />, value: "justify" },
];

export default function AlignmentDropdownMenu() {
  const state = useAlignDropdownMenuState();
  const [isOpen, setIsOpen] = useState(false);
  const { radioGroupProps } = useAlignDropdownMenu(state);

  const selected = items.find((item) => item.value === radioGroupProps.value);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton label="Align" isActive={isOpen} variant="dropdown">
          {selected?.icon || <AlignLeftIcon size={16} />}
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-0">
        <DropdownMenuRadioGroup {...radioGroupProps}>
          {items.map(({ value, icon }) => (
            <DropdownMenuRadioItem key={value} value={value} hideIcon className="pl-2">
              {icon}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
