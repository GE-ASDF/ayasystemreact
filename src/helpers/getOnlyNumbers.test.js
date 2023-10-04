import { describe, expect, it } from 'vitest'
import { getOnlyNumbers} from './getOnlyNumbers'

describe("Testing function that clears string and keeps only numbers", ()=>{
  it("Testing getOnlyNumbers function", ()=>{
    let result = getOnlyNumbers("(85)98855-5588");
    expect(result).toBe("558588555588") 
  })
  it("Testing getOnlyNumbers function", ()=>{
    let result = getOnlyNumbers("558596969696");
    expect(result).toBe("558596969696") 
  })
  it("Testing getOnlyNumbers function", ()=>{
    let result = getOnlyNumbers("5585996969696");
    expect(result).toBe("558596969696") 
  })
  it("Testing getOnlyNumbers function", ()=>{
    let result = getOnlyNumbers("8596969696");
    expect(result).toBe("558596969696") 
  })
  it("Testing getOnlyNumbers function", ()=>{
    let result = getOnlyNumbers("85996969696");
    expect(result).toBe("558596969696") 
  })

})