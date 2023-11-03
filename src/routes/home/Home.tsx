import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/button/Button";
import { Title } from "~/components/title/Title";
import { Subtitle } from "~/components/subtitle/Subtitle";

import style from "./home.module.css";
import { MenuBurger } from "~/components/menu-burger/MenuBurger";
import { PrimaryButton } from "~/components/primary-button/PrimaryButton";
import { Footer } from "~/components/footer/Footer";

export const Home = component$(() => {
  return (
    <div class={style.container}>
      <div class={style.nav}>
        <MenuBurger />
        <Button text="Donate" />
      </div>
      <div class={style.content}>
        <div class={style.textsContainer}>
          <section>
            <Title text="Poker Session" />
            <Subtitle text="Poker Planning" />
          </section>
          <p class={style.informativeText}>
            An application to planning sessions to make a effective communicate
            point stories from agile teams
          </p>
        </div>
        <PrimaryButton text="START A SESSION" />
      </div>
      <Footer />
    </div>
  );
});
