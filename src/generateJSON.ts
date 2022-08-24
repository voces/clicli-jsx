import {
  createElement,
  Fragment,
  render,
  VNode,
  withAdapter,
} from "basic-pragma";
import { adapter } from "./adapter";
import { PanelNode, PanelNodeProps } from "./nodes/Panel";
import { Node, Tuple } from "./types";

type Root = {
  children: Node[];
  size: Tuple<[width: number, height: number]>;
};

let rootTemplate = (): Root => ({
  children: [],
  size: { __tuple__: true, items: [1920, 1080] },
});

/** UI assumes a 1920x1080 root container. Use this function to override. */
export const withRootTemplate = <T>(template: () => Root, fn: () => T): T => {
  const oldRootTemplate = rootTemplate;
  rootTemplate = template;

  try {
    const ret = fn();
    rootTemplate = oldRootTemplate;
    return ret;
  } catch (err) {
    rootTemplate = oldRootTemplate;
    throw err;
  }
};

/**
 * Generate JSON for a CliCli map.
 *
 * Unlike DOM, all nodes MUST be defined statically, so make sure all
 * conditional nodes render on this step. If conditional nodes are required,
 * use the node's `visible` property instead.
 *
 * All top-level nodes should be of type `panel`.
 */
export const generateJSON = <
  T extends VNode<PanelNodeProps>[] | [VNode<PanelNodeProps>],
>(
  ...nodes: T
): T extends [VNode<PanelNodeProps>] ? PanelNode : PanelNode[] => {
  const root = {
    children: [] as Node[],
    size: { __tuple__: true, items: [1920, 1080] },
  };

  withAdapter(adapter, () => render(createElement(Fragment, {}, nodes), root));

  return (nodes.length === 1 ? root.children[0] : root.children) as T extends
    [VNode<PanelNodeProps>] ? PanelNode : PanelNode[];
};
