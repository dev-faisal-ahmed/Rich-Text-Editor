"use client";

import React from "react";
import { cn } from "@udecode/cn";
import type { UseEmojiPickerType } from "@udecode/plate-emoji/react";
import type { EmojiCategoryList } from "@udecode/plate-emoji";

import { Button } from "../../../button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { emojiSearchIcons } from "./emoji-icons";
import { EmojiSettings } from "@udecode/plate-emoji";
import { EmojiPickerContent } from "./emoji-picker-content";

export function EmojiPicker({
  clearSearch,
  emoji,
  emojiLibrary,
  focusedCategory,
  hasFound,
  i18n,
  icons,
  isSearching,
  refs,
  searchResult,
  searchValue,
  setSearch,
  settings = EmojiSettings,
  visibleCategories,
  handleCategoryClick,
  onMouseOver,
  onSelectEmoji,
}: UseEmojiPickerType) {
  return (
    <div className={cn("flex flex-col rounded-xl bg-popover text-popover-foreground", "h-[23rem] w-80 border shadow-md")}>
      <EmojiPickerNavigation onClick={handleCategoryClick} emojiLibrary={emojiLibrary} focusedCategory={focusedCategory} i18n={i18n} icons={icons} />
      <EmojiPickerSearchBar i18n={i18n} searchValue={searchValue} setSearch={setSearch}>
        <EmojiPickerSearchAndClear clearSearch={clearSearch} i18n={i18n} searchValue={searchValue} />
      </EmojiPickerSearchBar>
      <EmojiPickerContent
        onMouseOver={onMouseOver}
        onSelectEmoji={onSelectEmoji}
        emojiLibrary={emojiLibrary}
        i18n={i18n}
        isSearching={isSearching}
        refs={refs}
        searchResult={searchResult}
        settings={settings}
        visibleCategories={visibleCategories}
      />
      <EmojiPickerPreview emoji={emoji} hasFound={hasFound} i18n={i18n} isSearching={isSearching} />
    </div>
  );
}

export type EmojiPickerNavigationProps = {
  onClick: (id: EmojiCategoryList) => void;
} & Pick<UseEmojiPickerType, "emojiLibrary" | "focusedCategory" | "i18n" | "icons">;

export function EmojiPickerNavigation({ emojiLibrary, focusedCategory, i18n, icons, onClick }: EmojiPickerNavigationProps) {
  return (
    <TooltipProvider delayDuration={500}>
      <nav id="emoji-nav" className="mb-2.5 border-0 border-b border-solid border-b-border p-1.5">
        <div className="relative flex items-center justify-evenly">
          {emojiLibrary
            .getGrid()
            .sections()
            .map(({ id }) => (
              <Tooltip key={id}>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    className={cn(
                      "h-fit rounded-full fill-current p-1.5 text-muted-foreground hover:bg-muted hover:text-muted-foreground",
                      id === focusedCategory && "pointer-events-none bg-accent fill-current text-accent-foreground"
                    )}
                    onClick={() => {
                      onClick(id);
                    }}
                    aria-label={i18n.categories[id]}
                    type="button"
                  >
                    <span className="inline-flex size-5 items-center justify-center">{icons.categories[id].outline}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{i18n.categories[id]}</TooltipContent>
              </Tooltip>
            ))}
        </div>
      </nav>
    </TooltipProvider>
  );
}

export type EmojiPickerPreviewProps = Pick<UseEmojiPickerType, "emoji" | "hasFound" | "i18n" | "isSearching">;
export type EmojiPreviewProps = Pick<UseEmojiPickerType, "emoji">;
export type NoEmojiPreviewProps = Pick<UseEmojiPickerType, "i18n">;
export type PickAnEmojiPreviewProps = NoEmojiPreviewProps;

function EmojiPreview({ emoji }: EmojiPreviewProps) {
  return (
    <div className="flex h-14 max-h-14 min-h-14 items-center border-t border-muted p-2">
      <div className="flex items-center justify-center text-2xl">{emoji?.skins[0].native}</div>
      <div className="overflow-hidden pl-2">
        <div className="truncate text-sm font-semibold">{emoji?.name}</div>
        <div className="truncate text-sm">{`:${emoji?.id}:`}</div>
      </div>
    </div>
  );
}

function NoEmoji({ i18n }: NoEmojiPreviewProps) {
  return (
    <div className="flex h-14 max-h-14 min-h-14 items-center border-t border-muted p-2">
      <div className="flex items-center justify-center text-2xl">😢</div>
      <div className="overflow-hidden pl-2">
        <div className="truncate text-sm font-bold">{i18n.searchNoResultsTitle}</div>
        <div className="truncate text-sm">{i18n.searchNoResultsSubtitle}</div>
      </div>
    </div>
  );
}

function PickAnEmoji({ i18n }: PickAnEmojiPreviewProps) {
  return (
    <div className="flex h-14 max-h-14 min-h-14 items-center border-t border-muted p-2">
      <div className="flex items-center justify-center text-2xl">☝️</div>
      <div className="overflow-hidden pl-2">
        <div className="truncate text-sm font-semibold">{i18n.pick}</div>
      </div>
    </div>
  );
}

export function EmojiPickerPreview({ emoji, hasFound = true, i18n, isSearching = false, ...props }: EmojiPickerPreviewProps) {
  const showPickEmoji = !emoji && (!isSearching || hasFound);
  const showNoEmoji = isSearching && !hasFound;
  const showPreview = emoji && !showNoEmoji && !showNoEmoji;

  return (
    <>
      {showPreview && <EmojiPreview emoji={emoji} {...props} />}
      {showPickEmoji && <PickAnEmoji i18n={i18n} {...props} />}
      {showNoEmoji && <NoEmoji i18n={i18n} {...props} />}
    </>
  );
}

export type EmojiPickerSearchAndClearProps = Pick<UseEmojiPickerType, "clearSearch" | "i18n" | "searchValue">;

export function EmojiPickerSearchAndClear({ clearSearch, i18n, searchValue }: EmojiPickerSearchAndClearProps) {
  return (
    <div className="flex items-center text-foreground">
      <div className={cn("absolute left-2.5 top-1/2 z-10 flex size-5 -translate-y-1/2 items-center justify-center text-foreground")}>{emojiSearchIcons.loupe}</div>
      {searchValue && (
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "absolute right-0.5 top-1/2 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-popover-foreground hover:bg-transparent"
          )}
          onClick={clearSearch}
          title={i18n.clear}
          aria-label="Clear"
          type="button"
        >
          {emojiSearchIcons.delete}
        </Button>
      )}
    </div>
  );
}

export type EmojiPickerSearchBarProps = {
  children: React.ReactNode;
} & Pick<UseEmojiPickerType, "i18n" | "searchValue" | "setSearch">;

export function EmojiPickerSearchBar({ children, i18n, searchValue, setSearch }: EmojiPickerSearchBarProps) {
  return (
    <div className="flex items-center px-2">
      <div className="relative flex grow items-center">
        <input
          className="block w-full appearance-none rounded-full border-0 bg-muted px-10 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:outline-none"
          value={searchValue}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={i18n.search}
          aria-label="Search"
          autoComplete="off"
          type="text"
        />
        {children}
      </div>
    </div>
  );
}
