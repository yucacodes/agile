
import { createDOM } from '@builder.io/qwik/testing';
import { test, expect } from "vitest";

import { Navbar } from "./navbar";


test(`should render link planning ⭐`, async () => {
  const { screen, render } = await createDOM();
  await render(<Navbar />);
  const div =  screen.querySelector('[role="planning"]') as HTMLElement;
  expect(div.outerHTML).toContain("Planning");
});

