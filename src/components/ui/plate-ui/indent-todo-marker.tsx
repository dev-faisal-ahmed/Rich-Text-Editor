"use client";

import { cn } from "@udecode/cn";
import { Checkbox } from "@/components/ui/checkbox";
import type { PlateRenderElementProps } from "@udecode/plate-common/react";
import { useIndentTodoListElement, useIndentTodoListElementState } from "@udecode/plate-indent-list/react";

export const TodoMarker = ({ element }: Omit<PlateRenderElementProps, "children">) => {
  const state = useIndentTodoListElementState({ element });
  const { checkboxProps } = useIndentTodoListElement(state);

  return (
    <div contentEditable={false}>
      <Checkbox style={{ left: -24, position: "absolute", top: 4 }} {...checkboxProps} />
    </div>
  );
};

export const TodoLi = (props: PlateRenderElementProps) => {
  const { children, element } = props;

  return <span className={cn((element.checked as boolean) && "text-muted-foreground line-through")}>{children}</span>;
};
