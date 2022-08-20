/** @jsx createElement */

import { convertAndRunLua } from "./util/lua";

it("works", async () => {
  const obj = await convertAndRunLua(`/** @jsx createElement */

import { createElement, createContext, useState, useContext } from "basic-pragma";

const MyContext = createContext(7);

const Child = () => null;

const App = () => {
  const [state, setState] = useState(useContext(MyContext));

  return <MyContext.Provider value={state}>
      <Child />
    </MyContext.Provider>
}

const ret = <App />

export = ret;`);

  console.log(obj);
});

// const MyContext = createContext(7);

// const Child = () => {
//   const contextValue = useContext(MyContext);
//   console.log("Child", contextValue);
//   return null;
// };

// const App = () => {
//   const [state, setState] = useState(useContext(MyContext));

//   console.log("App", state);

//   return (
//     <MyContext.Provider value={state * 2}>
//       <Child />
//     </MyContext.Provider>
//   );
// };

// console.log(<App />);
