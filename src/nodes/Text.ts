import type { Color, ColorProp, NODE_TYPE_TEXT, Tuple } from "../types";
import type { ALIGN, FONT_NAME, JUSTIFY } from "../constants";
import { createNode, Node, NodeProps } from "./Node";
import { colorPropToNode } from "../utils";

export type TextNodeProps = NodeProps & {
  text: string;
  justify?: JUSTIFY;
  align?: ALIGN;
  fontSize?: number;
  fontName?: FONT_NAME;
  fontColor?: ColorProp;
  lineSpace?: number;
};

export type TextNode = Node & {
  type: NODE_TYPE_TEXT;
  text: Tuple<[text: string, unknown: false]>;
  alignment?: Tuple<[JUSTIFY, ALIGN]>;
  font: Tuple<[fontName: FONT_NAME, size: number]>;
  font_color: Color | undefined;
  line_space?: number;
};

export const createTextNode = (props: TextNodeProps): TextNode => ({
  ...createNode(props, "text"),
  type: 3,
  text: { __tuple__: true, items: [props.text, false] },
  alignment: { __tuple__: true, items: [props.justify ?? 2, props.align ?? 8] },
  line_space: props.lineSpace,
  font_color: colorPropToNode(props.fontColor),
  font: {
    __tuple__: true,
    items: [props.fontName ?? "", props.fontSize ?? 18],
  },
});
