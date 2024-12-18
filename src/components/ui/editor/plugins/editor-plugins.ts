"use client";

import { BasicMarksPlugin } from "@udecode/plate-basic-marks/react";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { HeadingPlugin } from "@udecode/plate-heading/react";
import { MarkdownPlugin } from "@udecode/plate-markdown";
import { IndentPlugin } from "@udecode/plate-indent/react";
import { IndentListPlugin } from "@udecode/plate-indent-list/react";
import { ParagraphPlugin } from "@udecode/plate-common/react";
import { HEADING_LEVELS } from "@udecode/plate-heading";
import { AlignPlugin } from "@udecode/plate-alignment/react";
import { TodoLi, TodoMarker } from "../../plate-ui/indent-todo-marker";
import { EmojiPlugin } from "@udecode/plate-emoji/react";
import { ImagePlugin } from "@udecode/plate-media/react";
import { ExitBreakPlugin, SoftBreakPlugin } from "@udecode/plate-break/react";

const basicNodesPlugins = [HeadingPlugin.configure({ options: { levels: 3 } }), BlockquotePlugin, BasicMarksPlugin];
const markDownPlugin = MarkdownPlugin.configure({ options: { indentList: true } });

const indentListPlugin = [
  IndentPlugin.extend({ inject: { targetPlugins: [ParagraphPlugin.key, ...HEADING_LEVELS, BlockquotePlugin.key] } }),
  IndentListPlugin.extend({
    inject: { targetPlugins: [ParagraphPlugin.key, ...HEADING_LEVELS, BlockquotePlugin.key] },
    options: { listStyleTypes: { todo: { liComponent: TodoLi, markerComponent: TodoMarker, type: "todo" } } },
  }),
];

const alignPlugin = AlignPlugin.extend({ inject: { targetPlugins: [ParagraphPlugin.key, ...HEADING_LEVELS] } });
const imagePlugin = ImagePlugin.extend({ options: { disableUploadInsert: true } });
const softBreakPlugin = SoftBreakPlugin.configure({ options: { rules: [{ hotkey: "shift+enter" }, { hotkey: "enter", query: { allow: [BlockquotePlugin.key] } }] } });

const exitBreakPlugin = ExitBreakPlugin.configure({ options: { rules: [{ hotkey: "mod+enter" }] } });

export const editorPlugins = [...basicNodesPlugins, ...indentListPlugin, alignPlugin, imagePlugin, markDownPlugin, EmojiPlugin, exitBreakPlugin, softBreakPlugin];
