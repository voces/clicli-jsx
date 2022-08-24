import type { Node, SimpleAction, Tuple, UIEvent } from "../types";
import {
  UI_ACTION_HIDE,
  UI_ACTION_SHOW,
  UI_ANIM_UNIFORM,
  UI_COMP_TYPE_UNSET,
  UI_EVENT_CLICK,
} from "../constants";
import { getParent } from "../parent";
import { Children } from "basic-pragma";

export type BaseNodeProps = {
  name?: string;
  uid?: string;
  x?: number;
  y?: number;
  size?: number;
  width?: number;
  height?: number;
  opacity?: number;
  draggable?: boolean;
  rotation?: number;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  touchable?: boolean;
  visible?: boolean;
  // Simple events
  click?: SimpleAction;
  children?: Children;
};

export type BaseNode = {
  type: typeof UI_COMP_TYPE_UNSET;
  name: string | undefined;
  uid: string;
  event_list: UIEvent[];
  pos: Tuple<[number, number]>;
  pos_percent: Tuple<[number, number]>;
  size: Tuple<[number, number]>;
  opacity: number | undefined;
  can_drag: boolean | undefined;
  rotation: number | undefined;
  swallow_touches: boolean | undefined;
  visible: boolean | undefined;
  adapter_option:
    | readonly [
      boolean,
      boolean,
      boolean,
      boolean,
      number,
      number,
      number,
      number,
    ]
    | undefined;
  children: Node[];
};

const EVENT_TYPE = {
  click: UI_EVENT_CLICK,
} as const;

const eventIndicies = Object.fromEntries(
  Object.keys(EVENT_TYPE).map((key) => [key, 0]),
) as Record<keyof typeof EVENT_TYPE, number>;

const ACTION_TYPE = {
  show: UI_ACTION_SHOW,
  hide: UI_ACTION_HIDE,
} as const;

const actionIndicies = Object.fromEntries(
  Object.keys(ACTION_TYPE).map((key) => [key, 0]),
) as Record<keyof typeof ACTION_TYPE, number>;

const eventKeys = ["click"] as const;
const createEventList = (props: BaseNodeProps): UIEvent[] => {
  const events: UIEvent[] = [];

  for (const eventName of eventKeys) {
    const event = props[eventName];

    if (typeof event === "string") {
      events.push({
        type: EVENT_TYPE[eventName],
        name: event,
        enabled: true,
        action_list: [],
        sound_id: null,
      });
    } else if (event) {
      events.push({
        type: EVENT_TYPE[eventName],
        name: `${eventName}_${eventIndicies[eventName]++}`,
        enabled: true,
        action_list: [{
          anim_duration: 1,
          anim_name: null,
          anim_type: 0,
          comp: event.comp ?? "",
          ease_type: UI_ANIM_UNIFORM,
          name: `${event.action}_${actionIndicies[event.action]++}`,
          type: ACTION_TYPE[event.action],
        }],
        sound_id: null,
      });
    }
  }

  return events;
};

export const createNode = (
  props: BaseNodeProps,
  type: keyof JSX.IntrinsicElements,
): BaseNode => {
  const parent = getParent();
  const width = props.width ?? props.size ?? parent.size.items[0];
  const height = props.height ?? props.size ?? parent.size.items[1];

  const usingAdapter = typeof props.top === "number" ||
    typeof props.bottom === "number" ||
    typeof props.left === "number" ||
    typeof props.right === "number";

  const adapterOption = usingAdapter
    ? [
      typeof props.top === "number",
      typeof props.bottom === "number",
      typeof props.left === "number",
      typeof props.right === "number",
      props.top ??
        (parent.size.items[1] - height - (props.bottom ?? 0)),
      props.bottom ??
        (parent.size.items[1] - height - (props.top ?? 0)),
      props.left ?? (parent.size.items[0] - width - (props.right ?? 0)),
      props.right ?? (parent.size.items[0] - width - (props.left ?? 0)),
    ] as const
    : undefined;

  const pos: Tuple<[number, number]> = {
    __tuple__: true,
    items: [
      props.x ??
        (usingAdapter
          ? adapterOption![6] + width / 2
          : parent.size.items[0] / 2),
      props.y ??
        (usingAdapter
          ? adapterOption![5] + height / 2
          : parent.size.items[1] / 2),
    ],
  };

  return {
    type: UI_COMP_TYPE_UNSET, // should be overwritten
    name: props.name,
    uid: props.uid ??
      `${parent.uid}.${props.name ?? type}${
        parent.children.filter((v) => v.name === props.name).length
      }`,
    opacity: props.opacity,
    event_list: createEventList(props),
    can_drag: props.draggable,
    rotation: props.rotation,
    swallow_touches: props.touchable,
    visible: props.visible,
    pos,
    pos_percent: {
      __tuple__: true,
      items: [
        pos.items[0] / parent.size.items[0] * 100,
        pos.items[1] / parent.size.items[1] * 100,
      ],
    },
    size: { __tuple__: true, items: [width, height] },
    adapter_option: adapterOption,
    children: [],
  };
};
