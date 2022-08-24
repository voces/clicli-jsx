import { Color, ColorProp } from "./types";

type ColorPropToNode = <T extends ColorProp | undefined>(
  prop: T,
) => T extends ColorProp ? Color : undefined;

const parseShortInt = (str: string) => {
  const num = parseInt(str, 16);
  return num * 16 + num;
};

const getRGBA = (prop: ColorProp): [number, number, number, number] => {
  if (typeof prop === "number") {
    return [
      prop > 0xffffff
        ? Math.floor(prop / 0x1000000) % 0x100
        : Math.floor(prop / 0x10000) % 0x100,
      prop > 0xffffff
        ? Math.floor(prop / 0x10000) % 0x100
        : Math.floor(prop / 0x100) % 0x100,
      prop > 0xffffff
        ? Math.floor(prop / 0x100) % 0x100
        : Math.floor(prop) % 0x100,
      prop > 0xffffff ? Math.floor(prop) % 0x100 : 255,
    ];
  }

  if (prop[0] === "#") prop = prop.slice(1);

  if (prop.length === 3 || prop.length === 4) {
    return [
      parseShortInt(prop[0]),
      parseShortInt(prop[1]),
      parseShortInt(prop[2]),
      prop.length === 3 ? 255 : parseShortInt(prop[3]),
    ];
  }

  if (prop.length === 6 || prop.length === 8) {
    return getRGBA(parseInt(prop, 16));
  }

  throw `Expected color string of length 3, 4, 6, 8; got ${prop}`;
};

export const colorPropToNode =
  ((prop: ColorProp | undefined): Color | undefined => {
    if (prop === undefined) return;
    return { __tuple__: true, items: getRGBA(prop) };
  }) as ColorPropToNode;
