import { UI_COMP_TYPE_IMAGE } from "../constants";
import { BaseNode, BaseNodeProps, createNode } from "./BaseNode";

export type ImageNodeProps = BaseNodeProps & { image: number };

export type ImageNode = Omit<BaseNode, "type"> & {
  type: typeof UI_COMP_TYPE_IMAGE;
  image: number;
};

export const createImageNode = (props: ImageNodeProps): ImageNode => ({
  ...createNode(props, "image"),
  type: UI_COMP_TYPE_IMAGE,
  image: props.image,
});
