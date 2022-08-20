import type { Node } from "./nodes/Node";

let _parent: Node;

export const getParent = () => _parent;
export const setParent = (node: Node) => _parent = node;
