import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h1>About 👋</h1>
    </>
  );
});

export const head: DocumentHead = {
  title: "Meet the Team",
  meta: [
    {
      name: "description",
      content: "Meet the team page description",
    },
  ],
};
