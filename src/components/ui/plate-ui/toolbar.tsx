import React from "react";
import { cn } from "@/lib/utils";
import { useMarkToolbarButton, useMarkToolbarButtonState, withRef } from "@udecode/plate-common/react";
import { BoldPlugin, ItalicPlugin, StrikethroughPlugin, UnderlinePlugin } from "@udecode/plate-basic-marks/react";
import { BoldIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from "lucide-react";

export function Toolbar() {
  return (
    <div className="flex items-center gap-1 border-t pt-2">
      {/* bold */}
      <MarkToolbarButton nodeType={BoldPlugin.key}>
        <BoldIcon className="size-4" />
      </MarkToolbarButton>
      <MarkToolbarButton nodeType={ItalicPlugin.key}>
        <ItalicIcon className="size-4" />
      </MarkToolbarButton>
      <MarkToolbarButton nodeType={UnderlinePlugin.key}>
        <UnderlineIcon className="size-4" />
      </MarkToolbarButton>
      <MarkToolbarButton nodeType={StrikethroughPlugin.key}>
        <StrikethroughIcon className="size-4" />
      </MarkToolbarButton>
    </div>
  );
}

// mark toolbar button
const MarkToolbarButton = withRef<typeof ToolbarButton, { nodeType: string }>(({ nodeType, ...restProps }, ref) => {
  const state = useMarkToolbarButtonState({ nodeType });
  const { props } = useMarkToolbarButton(state);

  return <ToolbarButton ref={ref} {...props} isActive={props.pressed} {...restProps} />;
});

// toolbar button
interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(({ isActive, ...props }, ref) => {
  return <button ref={ref} className={cn("size-6 flex items-center justify-center bg-gray-100 font-semibold", isActive && "bg-gray-300")} {...props} />;
});

ToolbarButton.displayName = "ToolbarButton";
