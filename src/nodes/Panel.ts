import { Children } from "basic-pragma";
import { UI_COMP_TYPE_PANEL } from "../constants";
import { getParent } from "../parent";
import { Node, Tuple } from "../types";

export type PanelNodeProps = {
  name: string;
  uid?: string;
  zorder?: number;
  visible?: boolean;
  opacity?: number;
  children?: Children;
};

export type PanelNode = {
  type: typeof UI_COMP_TYPE_PANEL;
  name: string;
  uid: string;
  opacity: number;
  visible: boolean;
  zorder: number;
  editor_visible: boolean;
  children: Node[];
  size: Tuple<[number, number]>;
};

export const createPanelNode = (props: PanelNodeProps): PanelNode => {
  const node: Omit<PanelNode, "size"> = {
    type: UI_COMP_TYPE_PANEL,
    name: props.name,
    uid: props.uid ?? props.name,
    visible: props.visible ?? true,
    zorder: props.zorder ?? 1000,
    editor_visible: true,
    opacity: props.opacity ?? 1,
    children: [],
  };
  Object.defineProperty(node, "size", {
    value: { items: [...getParent().size.items] },
  });

  return node as PanelNode;
};
