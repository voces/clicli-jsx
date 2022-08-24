import type { Color, ColorProp } from "../types";
import { CLIP_TYPE, UI_COMP_TYPE_LAYOUT } from "../constants";
import { BaseNode, BaseNodeProps, createNode } from "./BaseNode";
import { colorPropToNode } from "../utils";

export type LayoutNodeProps = BaseNodeProps & {
  clip?: boolean;
  clipType?: typeof CLIP_TYPE;
  mask?: number;
  color?: ColorProp;
};

export type LayoutNode = Omit<BaseNode, "type"> & {
  type: typeof UI_COMP_TYPE_LAYOUT;
  clip_enabled: boolean | undefined;
  clipping_type: typeof CLIP_TYPE | undefined;
  mask_image: number | undefined;
  color: Color | undefined;
};

export const createLayoutNode = (props: LayoutNodeProps): LayoutNode => ({
  ...createNode(props, "layout"),
  type: UI_COMP_TYPE_LAYOUT,
  clip_enabled: props.clip ? true : undefined,
  clipping_type: props.clipType,
  mask_image: props.mask,
  color: colorPropToNode(props.color),
});
