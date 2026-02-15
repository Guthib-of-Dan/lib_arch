import {expect, test, describe} from "vitest"
import {expectType, expectError} from "tsd"
var runningTsd: boolean = false;


// here if we write "typeof import" we test package.json (when write - "exports", when use tsd - "typesVersion") 
export function testIndexModule(module: typeof import("mylib")){
  describe("index module testing", () => {
    test("hello", () => {
      expect(module.hello(true)).toBe(true)
      if (runningTsd) {
        expectType<true>(module.hello(true))
      }
    })
  })
}

export function testSubModule(module: typeof import("mylib/sub")){
  describe("sub module testing", ()=>{
    test("hasPermission", () => {
      var permission = module.hasPermission("admin", "private");
      expect(permission).toBe(true);
      expect(module.getDataByPermission(permission)).toEqual({})
      if (runningTsd) {
        expectType<false>(module.hasPermission("user", "private"))
        expectType<true>(module.hasPermission("user", "public"))
        expectType<true>(module.hasPermission("admin", "private"))
        expectType<{}>(module.getDataByPermission(true))
        expectType<null>(module.getDataByPermission(false))
        expectError(module.hasPermission("elite", "private"))
        expectError(module.hasPermission("admin", "external"))
      }
    })

  })
}
