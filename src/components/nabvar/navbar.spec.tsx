
import { createDOM } from '@builder.io/qwik/testing';
import { test, expect } from "vitest";

import { Navbar } from "./Navbar";


test("should render link planning", async () => {
  const { screen, render } = await createDOM();
  await render(<Navbar />);
  const planningLink = screen.querySelector('[role="planning"]')?.firstChild?.textContent;   
  expect(planningLink).toContain('Planning');
});
