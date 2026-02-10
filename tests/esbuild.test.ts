import {describe, afterAll} from "vitest"
import {rmSync, mkdirSync } from "node:fs"
import {build, type BuildOptions} from "esbuild"
import {createRequire} from "node:module"
var require = createRequire(import.meta.url)
import runTests from "./all"
var buildOptions: BuildOptions = {
  platform: "node",
  bundle: true,
  external: ["uWebSockets.js"],
  target: "node25",
  minify: true,
  alias: {
    stream: "node:stream",
    fs: "node:fs",
    crypto: "node:crypto",
    util: "node:util",
    process: "node:process",
    buffer: "node:buffer",
    events: "tseep",
    "node:events": "tseep",
    timers: "node:timers",
  },
  minifyIdentifiers: false,
  charset: "utf8",
  ignoreAnnotations: false,
  resolveExtensions: [".mts", ".ts", ".js", ".mjs", ".cts", ".cjs"],
}
try { mkdirSync("tmp") } catch {}
var mjsFile = "../tmp/esm.mjs"
var cjsFile = "../tmp/cjs.cjs"
await Promise.all([
  build({
    ...buildOptions,
    format: "esm",
    entryPoints: ["dist/esm/index.js"],
    outfile: mjsFile
  }),
  build({
    ...buildOptions,
    format: "cjs",
    entryPoints: ["dist/cjs/index.js"],
    outfile: cjsFile
  })
])
var esm: typeof import("mylib") = await import(mjsFile)
var cjs: typeof import("mylib") = require(mjsFile)
afterAll(()=>{
  rmSync(mjsFile)
  rmSync(cjsFile)
  rmSync("tmp", {recursive: true, force: true})
})
describe("ESM", ()=>runTests(esm))
describe("CJS", ()=>runTests(cjs))

