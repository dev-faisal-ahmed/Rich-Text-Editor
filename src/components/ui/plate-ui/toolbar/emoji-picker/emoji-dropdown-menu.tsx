"use client";

import React from "react";
import * as Popover from "@radix-ui/react-popover";

import { type EmojiDropdownMenuOptions, useEmojiDropdownMenuState } from "@udecode/plate-emoji/react";
import { Smile } from "lucide-react";
import { ToolbarButton } from "../toolbar-buttons";
import { emojiCategoryIcons, emojiSearchIcons } from "./emoji-icons";
import { EmojiPicker } from "./emoji-picker";

type EmojiDropdownMenuProps = {
  options?: EmojiDropdownMenuOptions;
} & React.ComponentPropsWithoutRef<typeof ToolbarButton>;

export function EmojiDropdownMenu({ options, ...props }: EmojiDropdownMenuProps) {
  const { emojiPickerState, isOpen, setIsOpen } = useEmojiDropdownMenuState(options);

  return (
    <EmojiToolbarDropdown
      control={
        <ToolbarButton isActive={isOpen} {...props}>
          <Smile size={16} />
        </ToolbarButton>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <EmojiPicker
        {...emojiPickerState}
        icons={{
          categories: emojiCategoryIcons,
          search: emojiSearchIcons,
        }}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        settings={options?.settings}
      />
    </EmojiToolbarDropdown>
  );
}

type EmojiToolbarDropdownProps = {
  children: React.ReactNode;
  control: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export function EmojiToolbarDropdown({ children, control, isOpen, setIsOpen }: EmojiToolbarDropdownProps) {
  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>{control}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="z-[100]">{children}</Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
