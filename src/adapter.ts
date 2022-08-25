import { Adapter, flushUpdates, isLua } from "basic-pragma";

import { createImageNode } from "./nodes/Image";
import { createLayoutNode } from "./nodes/Layout";
import { createPanelNode } from "./nodes/Panel";
import { createProgressNode } from "./nodes/Progress";
import { createTextNode } from "./nodes/Text";
import { getParent, setParent } from "./parent";
import { Node } from "./types";

const absurd = (v: never) => {
  throw new Error(`Unexpected ${v}`);
};

const createNodeFrame = <T extends keyof JSX.IntrinsicElements>(
  type: T,
  props: JSX.IntrinsicElements[T],
): Node => {
  // deno-lint-ignore no-explicit-any
  const unsafeProps: any = props;

  if (type === "text") return createTextNode(unsafeProps);
  if (type === "layout") return createLayoutNode(unsafeProps);
  if (type === "image") return createImageNode(unsafeProps);
  if (type === "progress") return createProgressNode(unsafeProps);
  if (type === "panel") return createPanelNode(unsafeProps);

  absurd(type);
};

let updateScheduled = false;

export const adapter: Partial<
  Adapter<Node, JSX.IntrinsicElements[keyof JSX.IntrinsicElements]>
> = {
  createFrame: <T extends keyof JSX.IntrinsicElements>(
    type: T,
    tParent: Node,
    props: JSX.IntrinsicElements[T],
  ) => {
    if (isLua) {
      // const ret = gameapi.get_ui_comp_n_list(1, props.uid);
      throw "Lua hydration not yet implemented";
    }

    const oldParent = getParent();
    setParent(tParent);
    const node = createNodeFrame(type, props);
    setParent(oldParent);
    tParent.children.push(node);

    return node;
  },
  scheduleUpdate: () => {
    if (updateScheduled) return;
    updateScheduled = true;

    if (isLua) {
      // gameapi.add_timer(Fix32(0), false, () => {
      //   updateScheduled = false;
      //   flushUpdates();
      // });
      throw "Lua hydration not yet implemented";
    } else {
      // TODO: find a way to make buildLua happy with this...
      // @ts-ignore Undefined in Lua
      setImmediate(() => {
        updateScheduled = false;
        flushUpdates();
      });
    }
  },
};
