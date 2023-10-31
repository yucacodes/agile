import { component$ } from "@builder.io/qwik";
import style from "./navbar.module.css";

export const Navbar = component$(() => {
  return (
    <nav class={style.nav}>
      <ul class={style.listlink}>
        <li>Planning</li>
        <li>Meet the team</li>
      </ul>
      <section class={style.action}>
        <button>Donate</button>
      </section>
    </nav>
  );
});
