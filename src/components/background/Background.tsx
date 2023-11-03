import { Slot, component$ } from "@builder.io/qwik";
import style from "./background.module.css";

export const Background = component$(() => {
  return (
    <>
      <div class={style.leftBlur}></div>
      <Slot />
      <div class={style.rightBlur}></div>
    </>
  );
});
