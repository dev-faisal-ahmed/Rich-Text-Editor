"use client";

import { BasicMarksPlugin } from "@udecode/plate-basic-marks/react";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { HeadingPlugin } from "@udecode/plate-heading/react";
import { MarkdownPlugin } from "@udecode/plate-markdown";
import { blockSelectionPlugins } from "./block-selection-plugin";
import { IndentPlugin } from "@udecode/plate-indent/react";
import { IndentListPlugin } from "@udecode/plate-indent-list/react";
import { ParagraphPlugin } from "@udecode/plate-common/react";
import { HEADING_LEVELS } from "@udecode/plate-heading";

const basicNodesPlugins = [HeadingPlugin.configure({ options: { levels: 3 } }), BlockquotePlugin, BasicMarksPlugin] as const;

const indentListPlugin = [
  IndentPlugin.extend({
    inject: { targetPlugins: [ParagraphPlugin.key, ...HEADING_LEVELS, BlockquotePlugin.key] },
  }),
  IndentListPlugin.extend({
    inject: { targetPlugins: [ParagraphPlugin.key, ...HEADING_LEVELS, BlockquotePlugin.key] },
  }),
];

const viewPlugins = [...basicNodesPlugins, ...blockSelectionPlugins, ...indentListPlugin];
export const editorPlugins = [...viewPlugins, MarkdownPlugin.configure({ options: { indentList: true } })];
