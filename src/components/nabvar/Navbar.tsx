import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import style from "./navbar.module.css";
import { Link, useLocation } from "@builder.io/qwik-city";

export const Navbar = component$(() => {
  const loc = useLocation();
  const pathname = useSignal("");

  useVisibleTask$(({ track }) => {
    track(() => loc.url.pathname);
    pathname.value = loc.url.pathname;
  });

  return (
    <nav class={style.nav}>
      <ul class={style.listlink}>
        <Link
          href="/"
          role="planning"
          class={{
            active: pathname.value === "/",
          }}
        >
          Planning
        </Link>
        <Link
          href="/about"
          role="meetTheTeam"
          class={{
            active: pathname.value === "/about/",
          }}
        >
          Meet the team
        </Link>
      </ul>
      <section class={style.action}>
        <button>Donate</button>
      </section>
    </nav>
  );
});
