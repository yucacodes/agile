
import { createDOM } from '@builder.io/qwik/testing';
import { test, expect } from "vitest";

import { Navbar } from "./Navbar";


test("should render link planning", async () => {


  try {
    const { screen, render } = await createDOM();
    await render(<Navbar />);
    const planningLink = screen.querySelector('[role="planning"]')?.firstChild?.textContent;   
    expect(planningLink).toContain('Planning');
  } catch (error) {
     console.log(error);
     
  }

});
