"use client";

import {
  type TElement,
  type TNodeEntry,
  getBlockAbove,
  getBlocks,
  getNodeEntry,
  insertNodes,
  removeEmptyPreviousBlock,
  setNodes,
  unsetNodes,
  withoutNormalizing,
} from "@udecode/plate-common";
import type { PlateEditor } from "@udecode/plate-common/react";
import { INDENT_LIST_KEYS, ListStyleType } from "@udecode/plate-indent-list";
import { IndentListPlugin } from "@udecode/plate-indent-list/react";
import { Path } from "slate";

const insertList = (editor: PlateEditor, type: string) => {
  insertNodes(
    editor,
    editor.api.create.block({
      indent: 1,
      listStyleType: type,
    }),
    { select: true }
  );
};

const insertBlockMap: Record<string, (editor: PlateEditor, type: string) => void> = {
  [ListStyleType.Decimal]: insertList,
  [ListStyleType.Disc]: insertList,
};

export const insertBlock = (editor: PlateEditor, type: string) => {
  withoutNormalizing(editor, () => {
    if (type in insertBlockMap) {
      insertBlockMap[type](editor, type);
    } else {
      const path = getBlockAbove(editor)?.[1];

      if (!path) return;

      const at = Path.next(path);

      insertNodes(editor, editor.api.create.block({ type }), {
        at,
        select: true,
      });
    }

    removeEmptyPreviousBlock(editor);
  });
};

const setList = (editor: PlateEditor, type: string, entry: TNodeEntry<TElement>) => {
  setNodes(
    editor,
    editor.api.create.block({
      indent: 1,
      listStyleType: type,
    }),
    {
      at: entry[1],
    }
  );
};

const setBlockMap: Record<string, (editor: PlateEditor, type: string, entry: TNodeEntry<TElement>) => void> = {
  [INDENT_LIST_KEYS.todo]: setList,
  [ListStyleType.Decimal]: setList,
  [ListStyleType.Disc]: setList,
};

export const setBlockType = (editor: PlateEditor, type: string, { at }: { at?: Path } = {}) => {
  withoutNormalizing(editor, () => {
    const setEntry = (entry: TNodeEntry<TElement>) => {
      const [node, path] = entry;
      if (node[IndentListPlugin.key]) {
        unsetNodes(editor, [IndentListPlugin.key, "indent"], { at: path });
      }
      if (type in setBlockMap) {
        return setBlockMap[type](editor, type, entry);
      }
      if (node.type !== type) {
        editor.setNodes<TElement>({ type }, { at: path });
      }
    };

    if (at) {
      const entry = getNodeEntry<TElement>(editor, at);
      if (entry) {
        setEntry(entry);
        return;
      }
    }

    const entries = getBlocks(editor);
    entries.forEach((entry) => setEntry(entry));
  });
};

export const getBlockType = (block: TElement) => {
  if (block[IndentListPlugin.key]) {
    if (block[IndentListPlugin.key] === ListStyleType.Decimal) {
      return ListStyleType.Decimal;
    } else if (block[IndentListPlugin.key] === INDENT_LIST_KEYS.todo) {
      return INDENT_LIST_KEYS.todo;
    } else {
      return ListStyleType.Disc;
    }
  }

  return block.type;
};
