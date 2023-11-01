
import { Navbar } from "./Navbar";
import { createDOM } from "@builder.io/qwik/testing";
import { test, expect } from "vitest";


test("should render link planning", async () => {
  const { screen, render } = await createDOM();
  await render(<Navbar> </Navbar>);
  const planningLink = screen.querySelector('[role="planning"]')?.firstChild as HTMLDivElement;
  console.log("🚀 ~ file: navbar.spec.tsx:11 ~ test ~ planningLink:", planningLink?.textContent)

  expect(planningLink?.textContent).toEqual('Planning');
});

