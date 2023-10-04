import { describe, expect, it, test } from 'vitest'
import { sum } from './math'

describe("Testing math functions", ()=>{
  it("Testing sum math function", ()=>{
    let result = sum(5,5);
    expect(result).toBe(10) 
  })
})