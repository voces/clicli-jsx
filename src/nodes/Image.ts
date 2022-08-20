import type { NODE_TYPE_IMAGE } from "../types";
import { createNode, Node, NodeProps } from "./Node";

export type ImageNodeProps = NodeProps & { image: number };

type ImageNode = Node & {
  type: NODE_TYPE_IMAGE;
  image: number;
};

export const createImageNode = (props: ImageNodeProps): ImageNode => ({
  ...createNode(props, "image"),
  type: 4,
  image: props.image,
});
