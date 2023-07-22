import ImgLogo from "~/media/logo.png?jsx";
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./index.css?inline";
import { Link } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="not__found">
      <div class="not__found__main">
        <h1>Page Not Found</h1>
        <ImgLogo alt="logo" />
        <Link href="/">GO HOME</Link>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "SSI Tool",
  meta: [
    {
      name: "description",
      content: "SSI Web Application Tool.",
    },
  ],
};
