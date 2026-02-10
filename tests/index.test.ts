import runTests from "./all"
import {createRequire} from "node:module"
import {describe} from "vitest"
var require = createRequire(import.meta.url)
import * as esm from "mylib"
var cjs: any = require("mylib")
describe("ESM", ()=>runTests(esm))
describe("CJS", ()=>runTests(cjs))
