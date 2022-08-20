import type { UI_ACTION, UI_ANIM, UI_EVENT } from "./constants";
import type { ImageNodeProps } from "./nodes/Image";
import type { LayoutNodeProps } from "./nodes/Layout";
import type { PanelNodeProps } from "./nodes/Panel";
import type { ProgressNodeProps } from "./nodes/Progress";
import type { TextNodeProps } from "./nodes/Text";

type UIActionProp = {
  action: "show" | "hide";
  comp?: string;
};

export type SimpleAction = string | UIActionProp;

export type Tuple<T> = { __tuple__: true; items: T };

export type Color = Tuple<
  [red: number, blue: number, green: number, alpha: number]
>;

export type ColorProp = number;

export type NODE_TYPE_UNSET = -1;
export type NODE_TYPE_PANEL = 2;
export type NODE_TYPE_TEXT = 3;
export type NODE_TYPE_IMAGE = 4;
export type NODE_TYPE_PROGRESS = 5;
export type NODE_TYPE_LAYOUT = 7;
export type NODE_TYPE =
  | NODE_TYPE_UNSET
  | NODE_TYPE_PANEL
  | NODE_TYPE_TEXT
  | NODE_TYPE_IMAGE
  | NODE_TYPE_PROGRESS
  | NODE_TYPE_LAYOUT;

type UIAction = {
  anim_duration: number;
  anim_name: null;
  anim_type: 0;
  comp: string;
  ease_type: UI_ANIM;
  name: string;
  type: UI_ACTION;
};

export type UIEvent = {
  type: UI_EVENT;
  name: string;
  enabled: boolean;
  action_list: UIAction[];
  sound_id: number | null;
  time?: number;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      image: ImageNodeProps;
      layout: LayoutNodeProps;
      panel: PanelNodeProps;
      progress: ProgressNodeProps;
      text: TextNodeProps;
    }
  }
}
