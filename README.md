# clicli-jsx

An [adapter](https://github.com/voces/basic-pragma) for creating
[CliCli](https://www.theclicli.com/) UI in code.

## Installation

basic-pragma is available via npm. You should install it and the peer
dependencies clicli-types and basic-pragma.

```bash
npm i -D clicli-jsx clicli-types basic-pragma
```

## Configuration

Add the following lines to your tsconfig:

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "createElement",
    "jsxFragmentFactory": "Fragment"
  }
}
```

## Usage

CliCli requires all nodes to be predefined in JSON files located in the `ui`
directory. For this reason, the adapter has two modes: build and hydration.

### Build

Use `build` to convert JSX to objects and `write` to generate JSON files:

```jsx
import { createElement, Fragment } from "basic-pragma";
import { render, write } from "clicli-jsx/dist/static";

const App = () => (
  <>
    <panel name="main">
      <image image={1023} x={1920 / 2} y={1080 / 2} width={50} height={50} />
    </panel>
  </>
);

write(render(<App />), "dist/ui");
```