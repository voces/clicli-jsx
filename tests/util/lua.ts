import { inspect } from "util";
import { mkdir, rm, writeFile } from "fs/promises";
import { lauxlib, lua, lualib, to_luastring } from "fengari";
import * as tstl from "typescript-to-lua";
import { JsxEmit } from "typescript";

const absurd = (v: never) => {
  throw `Unexpected ${inspect(v, false, 2, true)}`;
};

const lauTableToJsObject = (table: LuaTable) => {
  const v: Record<string, unknown> = {};
  for (const { key, value } of table.strong.values()) {
    v[luaToJs(key) as string] = luaToJs(value);
  }
  return v;
};

const luaToJs = (value: TValue) => {
  if (value.type === 20) {
    return new TextDecoder().decode(value.value.realstring);
  }
  if (value.type === 5) return lauTableToJsObject(value.value);
  if (value.type === 19) return value.value;
  absurd(value);
};

const runLua = (code: string) => {
  const L = lauxlib.luaL_newstate();
  lualib.luaL_openlibs(L);
  lauxlib.luaL_requiref(L, to_luastring("idk"), () => 0, 1);
  lua.lua_pop(L, 1);
  const status = lauxlib.luaL_dostring(L, to_luastring(code));

  console.log(lua.lua_tojsstring(L, -1));
  expect(status).toBe(lua.LUA_OK);

  const type = lua.lua_type(L, -1);

  switch (type) {
    case 4:
      return lua.lua_tojsstring(L, -1);
    case 5:
      return lauTableToJsObject(lua.lua_topointer(L, -1) as LuaTable);
    case 20:
      return lua.lua_tojsstring(L, -1);
    default:
      throw new Error(
        `Unknown return type ${type} : ${
          inspect(L.stack[L.top - 1], false, 2, true)
        }`,
      );
  }
};

export const convertAndRunLua = async (code: string) => {
  await rm("temp", { recursive: true, force: true });
  await mkdir("temp").catch(() => {});
  await writeFile("temp/source.tsx", code);

  const ret = tstl.transpileProject("tests/tsconfig.basic-pragama.test.json");

  console.log(ret);

  //   console.log(inspect(ret, false, 1, true));

  //   const transpiled = ret.transpiledFiles[0]?.lua;

  //   await writeFile("test.lua", transpiled!);

  //   //   console.log(transpiled);

  //   expect(transpiled).not.toBeUndefined();

  //   return runLua(transpiled!);
};
