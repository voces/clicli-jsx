import type { UI_ACTION, UI_ANIM, UI_EVENT } from "./constants";
import type { ImageNode, ImageNodeProps } from "./nodes/Image";
import type { LayoutNode, LayoutNodeProps } from "./nodes/Layout";
import type { PanelNode, PanelNodeProps } from "./nodes/Panel";
import type { ProgressNode, ProgressNodeProps } from "./nodes/Progress";
import type { TextNode, TextNodeProps } from "./nodes/Text";

type UIActionProp = {
  action: "show" | "hide";
  comp?: string;
};

export type SimpleAction = string | UIActionProp;

export type Tuple<T> = { __tuple__: true; items: T };

export type Color = Tuple<
  [red: number, blue: number, green: number, alpha: number]
>;

export type ColorProp = number | string;

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

export type Node = ImageNode | LayoutNode | PanelNode | ProgressNode | TextNode;
