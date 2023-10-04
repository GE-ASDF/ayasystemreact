import { render, screen } from "@testing-library/react";
import {describe, expect, test} from "vitest";
import Home from "./Home";

describe("Home text test", ()=>{
    test("Should show Home", ()=>{
        render(<Home title="Testing">Content</Home>);
        expect(screen.getByText(/Testing/i)).toBeDefined()
    })
})

