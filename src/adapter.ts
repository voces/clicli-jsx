import { isLua, setAdapter } from "basic-pragma";

import type { Node } from "./nodes/Node";

import { createImageNode } from "./nodes/Image";
import { createLayoutNode } from "./nodes/Layout";
import { createPanelNode } from "./nodes/Panel";
import { createProgressNode } from "./nodes/Progress";
import { createTextNode } from "./nodes/Text";
import { getParent, setParent } from "./parent";

const absurd = (v: never) => {
  throw new Error(`Unexpected ${v}`);
};

const createNodeFrame = (
  type: keyof JSX.IntrinsicElements,
  props: any,
): Node => {
  if (type === "text") return createTextNode(props);
  if (type === "layout") return createLayoutNode(props);
  if (type === "image") return createImageNode(props);
  if (type === "progress") return createProgressNode(props);
  if (type === "panel") return createPanelNode(props) as unknown as Node;

  absurd(type);
};

setAdapter<Node, unknown>({
  createFrame: (type, tParent, props): Node => {
    const oldParent = getParent();
    setParent(tParent);
    const node = createNodeFrame(type, props);
    setParent(oldParent);
    tParent.children.push(node);
    return node;
  },
});
