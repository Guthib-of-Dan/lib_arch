import {expect, test} from "vitest"
import {expectType} from "tsd"
var runningTsd: boolean = false;

export default function(module: typeof import("mylib")){
  test("hello", ()=>{
    expect(module.hello(true)).toBe(true)
    if(runningTsd){
      expectType<true>(module.hello(true))
    }
  })
}
