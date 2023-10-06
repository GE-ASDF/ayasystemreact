import {describe, expect} from "vitest";
import { removeNineDigit, setCodeCountry } from "./getOnlyNumbers";
import config from "../../config/config";
describe("Testing function getOnlyNumbers", ()=>{
    it("Testing function removeNineDigit", ()=>{
        const result = removeNineDigit('5585985164903',13);
        expect(result).toBe('558585164903')
    })
    it('Testing function setCodeCountry',()=>{
        const result = setCodeCountry("8512346789")
        expect(result).toBe(`${config.countryCode}8512346789`)
    })
})