import { component$ } from "@builder.io/qwik";
import style from "./menu-burger.module.css";

export const MenuBurger = component$(() => {
  return <span class={`material-icons-outlined ${style.menu}`}>menu</span>;
});
