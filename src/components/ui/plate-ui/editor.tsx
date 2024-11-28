"use client";

import React from "react";
import type { PlateContentProps } from "@udecode/plate-common/react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@udecode/cn";
import { PlateContent, useEditorContainerRef, useEditorRef } from "@udecode/plate-common/react";
import { cva } from "class-variance-authority";

const editorContainerVariants = cva(
  "relative w-full cursor-text overflow-y-auto caret-primary selection:bg-blue-100 [&_.slate-selection-area]:border [&_.slate-selection-area]:border-brand/25 [&_.slate-selection-area]:bg-blue-100",
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default: "h-full",
        demo: "h-[650px]",
      },
    },
  },
);

export const EditorContainer = ({ className, variant, ...props }: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof editorContainerVariants>) => {
  const editor = useEditorRef();
  const containerRef = useEditorContainerRef();

  return <div id={editor.uid} ref={containerRef} className={cn("ignore-click-outside/toolbar", editorContainerVariants({ variant }), className)} role="button" {...props} />;
};

EditorContainer.displayName = "EditorContainer";

const editorVariants = cva(
  cn(
    "group/editor",
    "relative w-full overflow-x-hidden whitespace-pre-wrap break-words",
    "ring-offset-background placeholder:text-muted-foreground/80 focus-visible:outline-none",
    "[&_[data-slate-placeholder]]:text-muted-foreground/80 [&_[data-slate-placeholder]]:!opacity-100",
    "[&_[data-slate-placeholder]]:top-[auto_!important]",
    "[&_strong]:font-bold",
  ),
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-50",
      },
      focused: {
        true: "ring-2 ring-ring ring-offset-2",
      },
      variant: {
        default: "h-full w-full p-6 text-base",
      },
    },
  },
);

export type EditorProps = PlateContentProps & VariantProps<typeof editorVariants>;

export const Editor = React.forwardRef<HTMLDivElement, EditorProps>(({ className, disabled, focused, variant, ...props }, ref) => {
  return (
    <PlateContent
      ref={ref}
      className={cn(
        editorVariants({
          disabled,
          focused,
          variant,
        }),
        className,
      )}
      disabled={disabled}
      disableDefaultStyles
      {...props}
    />
  );
});

Editor.displayName = "Editor";
