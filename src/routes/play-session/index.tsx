import type { DocumentHead } from "@builder.io/qwik-city";
export { PlaySessionPage as default } from "~/components/play-session-page";

export const head: DocumentHead = {
  title: "Play Session",
  meta: [
    {
      name: "description",
      content: "Play session page description",
    },
  ],
};
