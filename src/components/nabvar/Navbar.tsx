import { component$, useComputed$ } from "@builder.io/qwik";
import style from "./navbar.module.css";
import { Link, useLocation } from "@builder.io/qwik-city";

const Navbar = component$(() => {
  const loc = useLocation();
  const pathname = useComputed$(() => {
    return loc.url.pathname;
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

export { Navbar };
