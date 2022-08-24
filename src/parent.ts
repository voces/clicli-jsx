import { Node } from "./types";

let _parent: Node;

export const getParent = () => _parent;
export const setParent = (node: Node) => _parent = node;
