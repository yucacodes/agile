
 import { Navbar } from "./Navbar";
 import { createDOM } from "@builder.io/qwik/testing";
 import { test, expect } from "vitest";


test("should render correctly", async () => {
 const { screen, render } = await createDOM();
   await render(<Navbar />);
   const planningLink = screen.querySelector('[role="planning"]')?.firstChild?.textContent;   
    expect(planningLink).toContain('Planning');
  });

