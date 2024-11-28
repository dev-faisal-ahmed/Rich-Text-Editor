"use client";

import React from "react";
import { cn, withRef } from "@udecode/cn";
import { useElement, useRemoveNodeButton, withHOC } from "@udecode/plate-common/react";
import { Image, useMediaState } from "@udecode/plate-media/react";
import { ResizableProvider } from "@udecode/plate-resizable";
import { PlateElement } from "./plate-element";
import { XIcon } from "lucide-react";

export const ImageElement = withHOC(
  ResizableProvider,
  withRef<typeof PlateElement>(({ children, nodeProps, ...props }, ref) => {
    const { focused, selected } = useMediaState();
    const element = useElement();
    const { props: buttonProps } = useRemoveNodeButton({ element });

    return (
      <PlateElement ref={ref} {...props}>
        <figure className="relative mx-auto my-4 w-fit" contentEditable={false}>
          <Image
            className={cn("block w-full max-w-full cursor-pointer object-cover px-0", "rounded-sm", focused && selected && "ring-2 ring-ring ring-offset-2")}
            alt=""
            {...nodeProps}
          />
          <button {...buttonProps} className="absolute right-4 top-4 rounded-full bg-black p-1 text-white">
            <XIcon size={16} />
          </button>
        </figure>
        {children}
      </PlateElement>
    );
  }),
);
