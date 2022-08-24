import type { Color, ColorProp } from "../types";
import { BACKGROUND, PROGRESS, UI_COMP_TYPE_PROGRESS } from "../constants";
import { BaseNode, BaseNodeProps, createNode } from "./BaseNode";
import { colorPropToNode } from "../utils";

export type ProgressNodeProps = BaseNodeProps & {
  reverse?: boolean;
  percent?: number;
  progress?: PROGRESS;
  background?: BACKGROUND;
  unfillColor?: ColorProp;
  fillColor?: ColorProp;
  unfillImage?: number;
  fillImage?: number;
};

export type ProgressNode = Omit<BaseNode, "type"> & {
  type: typeof UI_COMP_TYPE_PROGRESS;
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
  type: UI_COMP_TYPE_PROGRESS,
  reverse: props.reverse,
  percent: props.percent,
  process_type: props.progress,
  background_type: props.background,
  color: colorPropToNode(props.fillColor),
  bg_color: colorPropToNode(props.unfillColor),
  image: props.fillImage,
  bg_image: props.unfillImage,
});
