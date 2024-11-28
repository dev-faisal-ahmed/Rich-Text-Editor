import React from "react";
import { cn } from "@/lib/utils";
import { TooltipContainer } from "../../tooltip";
import { cva, VariantProps } from "class-variance-authority";
import { withRef } from "@udecode/cn";
import { useMarkToolbarButton, useMarkToolbarButtonState } from "@udecode/plate-common/react";

// *********** Toolbar Button *********** \\
const toolbarVariants = cva("flex items-center justify-center rounded-md bg-gray-100 font-semibold", {
  variants: {
    variant: {
      default: "size-6",
      dropdown: "h-6 justify-between gap-2 p-2",
    },
  },
});

interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof toolbarVariants> {
  isActive?: boolean;
  label: string;
}

export const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(({ isActive, label, variant = "default", children, className, ...props }, ref) => {
  return (
    <TooltipContainer asChild label={label}>
      <button ref={ref} className={cn(toolbarVariants({ variant, className }), isActive && "bg-gray-200")} {...props}>
        {children}
      </button>
    </TooltipContainer>
  );
});

ToolbarButton.displayName = "ToolbarButton";

// *********** Markdown Button *********** \\
interface MarkToolbarButton {
  nodeType: string;
  label: string;
}
export const MarkToolbarButton = withRef<typeof ToolbarButton, MarkToolbarButton>(({ nodeType, label, ...restProps }, ref) => {
  const state = useMarkToolbarButtonState({ nodeType });
  const { props } = useMarkToolbarButton(state);
  return <ToolbarButton ref={ref} {...props} isActive={props.pressed} label={label} {...restProps} />;
});
