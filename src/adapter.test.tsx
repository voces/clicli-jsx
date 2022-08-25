import { createElement } from "basic-pragma";
import {
  UI_COMP_TYPE_IMAGE,
  UI_COMP_TYPE_PANEL,
  UI_COMP_TYPE_TEXT,
} from "./constants";
import { render } from "./static/render";

const INVENTORY_BACKGROUND = 134280992;
const CLOSE_ICON = 134272484;
const TRANSPARENT = 999;

it("js generation", () => {
  const Slot = ({ x, y }: { x: number; y: number }) => (
    <image
      name="slot"
      size={49}
      x={38 + x * 49.75}
      y={338 - y * 49.75}
      image={TRANSPARENT}
    >
      <text text={"1"} height={18} bottom={0} />
    </image>
  );

  const Inventory = () => (
    <image
      name="inventory"
      image={INVENTORY_BACKGROUND}
      width={342}
      height={484}
      right={16}
      top={285}
      draggable
      touchable
    >
      <image
        image={CLOSE_ICON}
        size={24}
        top={2}
        right={2}
        click={{ action: "hide", comp: "inventory" }}
      />

      {Array.from(
        Array(7),
        (_, y) => Array.from(Array(6), (_, x) => <Slot x={x} y={y} />),
      ).flat()}
    </image>
  );

  const App = () => (
    <panel name="mainTsx">
      <Inventory />
    </panel>
  );

  const mainTsx = render(<App />);
  expect(mainTsx.name).toEqual("mainTsx");
  expect(mainTsx.uid).toEqual("mainTsx");
  expect(mainTsx.type).toEqual(UI_COMP_TYPE_PANEL);
  expect(mainTsx.children.length).toEqual(1);

  const inventory = mainTsx.children[0];
  expect(inventory.name).toEqual("inventory");
  expect(inventory.uid).toEqual("mainTsx.inventory0");
  expect(inventory.type).toEqual(UI_COMP_TYPE_IMAGE);
  expect(inventory.children.length).toEqual(7 * 6 + 1);

  const closeButton = inventory.children[0];
  expect(closeButton.name).toEqual(undefined);
  expect(closeButton.uid).toEqual("mainTsx.inventory0.image0");
  expect(closeButton.type).toEqual(UI_COMP_TYPE_IMAGE);

  for (let i = 1; i < inventory.children.length; i++) {
    const slot = inventory.children[i];
    expect(slot.name).toEqual("slot");
    expect(slot.uid).toEqual(`mainTsx.inventory0.slot${i - 1}`);
    expect(slot.type).toEqual(UI_COMP_TYPE_IMAGE);
    expect(slot.children).toHaveLength(1);

    const text = slot.children[0];
    expect(text.name).toEqual(undefined);
    expect(text.uid).toEqual(`mainTsx.inventory0.slot${i - 1}.text0`);
    expect(text.type).toEqual(UI_COMP_TYPE_TEXT);
    // expect(text.type === UI_COMP_TYPE_TEXT ? text.text)
  }
});
