import { component$ } from "@builder.io/qwik";
import style from "./button.module.css";

export const Button = component$(({ text }: { text: string }) => {
  return <button class={style.button}>{text}</button>;
});
