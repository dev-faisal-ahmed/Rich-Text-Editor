"use client";

import { BoldPlugin, ItalicPlugin, StrikethroughPlugin, UnderlinePlugin } from "@udecode/plate-basic-marks/react";
import { withProps } from "@udecode/cn";
import { ParagraphPlugin, PlateLeaf, usePlateEditor } from "@udecode/plate-common/react";
import { editorPlugins } from "./plugins/editor-plugins";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { PlateElement } from "../plate-ui/plate-element";
import { HEADING_KEYS } from "@udecode/plate-heading";

export const useCreateEditor = () => {
  return usePlateEditor({
    override: {
      components: {
        [BoldPlugin.key]: withProps(PlateLeaf, { as: "strong" }),
        [ItalicPlugin.key]: withProps(PlateLeaf, { as: "em" }),
        [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: "s" }),
        [UnderlinePlugin.key]: withProps(PlateLeaf, { as: "u" }),
        [BlockquotePlugin.key]: withProps(PlateElement, { as: "blockquote", className: "my-1 border-l-2 pl-6 italic" }),
        [ParagraphPlugin.key]: withProps(PlateElement, { className: "m-0 px-0 py-1" }),
        [HEADING_KEYS.h1]: withProps(PlateElement, { as: "h1", className: "mt-3 pb-1 font-heading text-4xl font-bold" }),
        [HEADING_KEYS.h2]: withProps(PlateElement, { as: "h2", className: "mt-2 pb-px font-heading text-2xl font-semibold tracking-tight" }),
        [HEADING_KEYS.h3]: withProps(PlateElement, { as: "h3", className: "mt-2 pb-px font-heading text-xl font-semibold tracking-tight" }),
      },
    },
    plugins: [...editorPlugins],
    value: [
      { children: [{ text: "Basic Editor" }], type: "h1" },
      { children: [{ text: "Heading 2" }], type: "h2" },
      { children: [{ text: "Heading 3" }], type: "h3" },
      { children: [{ text: "This is a blockquote element" }], type: "blockquote" },
      {
        children: [
          { text: "Basic marks: " },
          { bold: true, text: "bold" },
          { text: ", " },
          { italic: true, text: "italic" },
          { text: ", " },
          { text: "underline", underline: true },
          { text: ", " },
          { strikethrough: true, text: "strikethrough" },
          { text: "." },
        ],
        type: ParagraphPlugin.key,
      },
    ],
  });
};
