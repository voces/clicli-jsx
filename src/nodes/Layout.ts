import type { Color, ColorProp, NODE_TYPE_LAYOUT } from "../types";
import type { CLIP_TYPE } from "../constants";
import { createNode, Node, NodeProps } from "./Node";
import { colorPropToNode } from "../utils";

export type LayoutNodeProps = NodeProps & {
  clip?: boolean;
  clipType?: typeof CLIP_TYPE;
  mask?: number;
  color?: ColorProp;
};

type LayoutNode = Node & {
  type: NODE_TYPE_LAYOUT;
  clip_enabled: boolean | undefined;
  clipping_type: typeof CLIP_TYPE | undefined;
  mask_image: number | undefined;
  color: Color | undefined;
};

export const createLayoutNode = (props: LayoutNodeProps): LayoutNode => ({
  ...createNode(props, "layout"),
  type: 7,
  clip_enabled: props.clip ? true : undefined,
  clipping_type: props.clipType,
  mask_image: props.mask,
  color: colorPropToNode(props.color),
});
