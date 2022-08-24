import { colorPropToNode } from "./utils";

it("rgb", () => {
  expect(colorPropToNode(0x123456).items).toEqual([0x12, 0x34, 0x56, 255]);
});

it("rgb0", () => {
  expect(colorPropToNode(0x12345600).items).toEqual([0x12, 0x34, 0x56, 0]);
});

it("rgba", () => {
  expect(colorPropToNode(0x12345678).items).toEqual([0x12, 0x34, 0x56, 0x78]);
});

it("rgb string (short)", () => {
  expect(colorPropToNode("123").items).toEqual([0x11, 0x22, 0x33, 255]);
});

it("rgba string (short)", () => {
  expect(colorPropToNode("1234").items).toEqual([0x11, 0x22, 0x33, 0x44]);
});

it("rgb string (long)", () => {
  expect(colorPropToNode("123456").items).toEqual([0x12, 0x34, 0x56, 255]);
});

it("rgba string (long)", () => {
  expect(colorPropToNode("12345678").items).toEqual([0x12, 0x34, 0x56, 0x78]);
});

it("ignores hash", () => {
  expect(colorPropToNode("#123").items).toEqual([0x11, 0x22, 0x33, 255]);
});
