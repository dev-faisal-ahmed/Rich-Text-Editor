import React from "react";
import { cn } from "@/lib/utils";
import { useBlockSelected } from "@udecode/plate-selection/react";
import { PlateElement as PlateElementPrimitive, PlateElementProps } from "@udecode/plate-common/react";
import { cva, VariantProps } from "class-variance-authority";

// Plate Element
export const PlateElement = React.forwardRef<HTMLDivElement, PlateElementProps>(({ className, children, ...props }: PlateElementProps, ref) => {
  return (
    <PlateElementPrimitive ref={ref} className={cn("relative", className)} {...props}>
      {children}
      {className?.includes("slate-selectable") && <BlockSelection />}
    </PlateElementPrimitive>
  );
});

PlateElement.displayName = "PlateElement";

// Block Selection
export const blockSelectionVariants = cva("pointer-events-none absolute inset-0 z-[1] bg-brand/[.13] transition-opacity", {
  defaultVariants: {
    active: true,
  },
  variants: {
    active: {
      false: "opacity-0",
      true: "opacity-100",
    },
  },
});

function BlockSelection({ className, ...props }: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof blockSelectionVariants>) {
  const isBlockSelected = useBlockSelected();
  if (!isBlockSelected) return null;

  return <div className={cn(blockSelectionVariants({ active: isBlockSelected, className }))} {...props} />;
}
