import { BasicMarksPlugin } from "@udecode/plate-basic-marks/react";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { HeadingPlugin } from "@udecode/plate-heading/react";
import { MarkdownPlugin } from "@udecode/plate-markdown";
import { blockSelectionPlugins } from "./block-selection-plugin";

const basicNodesPlugins = [HeadingPlugin.configure({ options: { levels: 3 } }), BlockquotePlugin, BasicMarksPlugin] as const;
const viewPlugins = [...basicNodesPlugins, ...blockSelectionPlugins];
export const editorPlugins = [...viewPlugins, MarkdownPlugin.configure({ options: { indentList: true } })];
