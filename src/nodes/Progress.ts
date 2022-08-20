import type { Color, ColorProp, NODE_TYPE_PROGRESS } from "../types";
import type { BACKGROUND, PROGRESS } from "../constants";
import { createNode, Node, NodeProps } from "./Node";
import { colorPropToNode } from "../utils";

export type ProgressNodeProps = NodeProps & {
  reverse?: boolean;
  percent?: number;
  progress?: PROGRESS;
  background?: BACKGROUND;
  unfillColor?: ColorProp;
  fillColor?: ColorProp;
  unfillImage?: number;
  fillImage?: number;
};

type ProgressNode = Node & {
  type: NODE_TYPE_PROGRESS;
  reverse: boolean | undefined;
  percent: number | undefined;
  process_type: PROGRESS | undefined;
  background_type: BACKGROUND | undefined;
  color: Color | undefined;
  bg_color: Color | undefined;
  image: number | undefined;
  bg_image: number | undefined;
};

export const createProgressNode = (props: ProgressNodeProps): ProgressNode => ({
  ...createNode(props, "progress"),
  type: 5,
  reverse: props.reverse,
  percent: props.percent,
  process_type: props.progress,
  background_type: props.background,
  color: colorPropToNode(props.fillColor),
  bg_color: colorPropToNode(props.unfillColor),
  image: props.fillImage,
  bg_image: props.unfillImage,
});
