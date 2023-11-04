import { component$ } from "@builder.io/qwik";
import style from "./counter.module.css";

export const Counter = component$(
  ({ number, text }: { number: number; text: string }) => {
    return (
      <div class={style.counter}>
        <p class={style.number}>+{number}</p>
        <p class={style.text}>{text}</p>
      </div>
    );
  }
);
