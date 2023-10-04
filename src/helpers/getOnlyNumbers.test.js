import { describe, expect, it } from 'vitest'
import { getOnlyNumbers} from './getOnlyNumbers'

describe("Testing function that clear string taking only numbers", ()=>{
  it("Testing getOnlyNumbers function", ()=>{
    let result = getOnlyNumbers("(85)98855-5588");
    expect(result).toBe("558588555588") 
  })

})