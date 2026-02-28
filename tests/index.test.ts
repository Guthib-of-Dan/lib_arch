import runTests from "./abstraction"
import {createRequire} from "node:module"
var require = createRequire(import.meta.url);
await runTests(/*External dependencies not to be bundled with esbuild*/ ["uWebSockets.js"], [
  {
    // test "exports" field in package.json when running vitest
    normalCJS: require("mylib"),
    // test "exports" field in package.json when running vitest
    normalESM: await import("mylib"),
    // name of testing function from "all.ts"
    test: "testIndexModule",
    // name of file in 'src' with .js extension to be minified and bundled 
    name: "index.js"
  },
  // several entries
  {
    normalCJS: require("mylib/sub"),
    normalESM: await import("mylib/sub"),
    test: "testSubModule",
    name: "sub.js"
  }
])
