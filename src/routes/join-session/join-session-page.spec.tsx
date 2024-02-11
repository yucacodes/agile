
import { createDOM } from '@builder.io/qwik/testing';
import { test, expect, vi, beforeAll, it } from "vitest";

import { QwikCityMockProvider } from '@builder.io/qwik-city';
import JoinSession from '.';



test(`should render title`, async () => {
    const { screen, render } = await createDOM();
    await render(
        <QwikCityMockProvider>
            <JoinSession />
        </QwikCityMockProvider>

    );
    const title = screen.querySelector('[role="title"]');

});

test(`should render button  in create session ⭐`, async () => {
    const { screen, render, userEvent } = await createDOM();
    await render(
        <QwikCityMockProvider>
            <JoinSession />
        </QwikCityMockProvider>

    );
    const tag = screen.querySelector('[role="button-primary"]');

    await userEvent("button", "click");
   
});
