import {
  createElement,
  Fragment,
  render as internalRender,
  VNode,
  withAdapter,
} from "basic-pragma";
import { adapter } from "../adapter";
import { PanelNode, PanelNodeProps } from "../nodes/Panel";
import { Node, Tuple } from "../types";
import { writeFile } from "fs/promises";
import { join } from "path";

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
export const render = <
  T extends VNode<PanelNodeProps>[] | [VNode<PanelNodeProps>],
>(
  ...nodes: T
): T extends [VNode<PanelNodeProps>] ? PanelNode : PanelNode[] => {
  const root = rootTemplate();

  withAdapter(adapter, () => {
    internalRender(createElement(Fragment, {}, nodes), root);
    // TODO: should make build async to allow async UI generation
    // We can do it by exposing the `updateScheduled` flag and waiting queuing
    // microtasks until it is false
  });

  return (nodes.length === 1 ? root.children[0] : root.children) as T extends
    [VNode<PanelNodeProps>] ? PanelNode : PanelNode[];
};

// Sort props alphabetically
const sortObj = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => typeof v === "object" && v !== null ? sortObj(v) : v);
  }
  return Object.fromEntries(
    Object.keys(obj).sort().map(
      (key) => [
        key,
        typeof obj[key] === "object" && obj[key] !== null
          ? sortObj(obj[key])
          : obj[key],
      ],
    ),
  );
};

export const write = async (
  panels: PanelNode | PanelNode[],
  directory: string,
) =>
  Promise.all(
    (Array.isArray(panels) ? panels : [panels]).map((panel) =>
      writeFile(
        join(directory, `${panel.name}.json`),
        JSON.stringify(sortObj(panel), null, 4),
      )
    ),
  );
