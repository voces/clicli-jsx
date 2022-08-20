export const UI_EVENT_UNSET = -1;
export const UI_EVENT_CLICK = 1;
export const UI_EVENT_DOUBLE_CLICK = 22;
export const UI_EVENT_PRESS = 3;
export const UI_EVENT_ENTER = 24;
export const UI_EVENT_HOVER = 23;
export const UI_EVENT_RETURN_TO_LOBBY = 11;
export const UI_EVENT_GAME_RESUME = 18;
export const UI_EVENT_EXIT = 25;
export const UI_EVENT_RIGHT_CLICK = 26;
export type UI_EVENT =
  | typeof UI_EVENT_UNSET
  | typeof UI_EVENT_CLICK
  | typeof UI_EVENT_DOUBLE_CLICK
  | typeof UI_EVENT_PRESS
  | typeof UI_EVENT_ENTER
  | typeof UI_EVENT_HOVER
  | typeof UI_EVENT_RETURN_TO_LOBBY
  | typeof UI_EVENT_GAME_RESUME
  | typeof UI_EVENT_EXIT
  | typeof UI_EVENT_RIGHT_CLICK;

export const UI_ANIM_UNIFORM = 0;
export const UI_ANIM_EASE_IN = 12;
export const UI_ANIM_EASE_OUT = 22;
export const UI_ANIM_EASE_IN_OUT = 32;
export type UI_ANIM =
  | typeof UI_ANIM_UNIFORM
  | typeof UI_ANIM_EASE_IN
  | typeof UI_ANIM_EASE_OUT
  | typeof UI_ANIM_EASE_IN_OUT;

export const UI_ACTION_ANIMATE = 1;
export const UI_ACTION_SHOW = 2;
export const UI_ACTION_HIDE = 3;
export type UI_ACTION =
  | typeof UI_ACTION_ANIMATE
  | typeof UI_ACTION_SHOW
  | typeof UI_ACTION_HIDE;

// unknown
export const CLIP_TYPE = 0;

const PROGRESS_RING = 0;
export type PROGRESS = typeof PROGRESS_RING;

const BACKGROUND_COLOR = 0;
export type BACKGROUND = typeof BACKGROUND_COLOR;

const JUSTIFY_LEFT = 1;
const JUSTIFY_CENTER = 2;
const JUSTIFY_RIGHT = 4;
export type JUSTIFY =
  | typeof JUSTIFY_LEFT
  | typeof JUSTIFY_CENTER
  | typeof JUSTIFY_RIGHT;

const ALIGN_TOP = 0;
const ALIGN_CENTER = 8;
const ALIGN_BOTTOM = 16;
export type ALIGN =
  | typeof ALIGN_TOP
  | typeof ALIGN_CENTER
  | typeof ALIGN_BOTTOM;

const FONT_NAME_DEFAULT = "";
export type FONT_NAME = typeof FONT_NAME_DEFAULT;
