
import { createDOM } from '@builder.io/qwik/testing';
import { test, expect } from "vitest";

import { Navbar } from "./navbar";
import { QwikCityMockProvider } from '@builder.io/qwik-city';


test(`should render link planning ⭐`, async () => {
  const { screen, render } = await createDOM();
  await render(
    <QwikCityMockProvider>
    <Navbar />
    </QwikCityMockProvider>
    
  );
  const div =  screen.querySelector('[role="planning"]');
  expect(div.outerHTML).toContain("Planning");
});

