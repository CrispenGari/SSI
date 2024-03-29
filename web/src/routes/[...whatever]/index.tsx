import ImgLogo from "~/media/logo.png?jsx";
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./index.css?inline";
import { Link } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import Footer from "~/components/Footer/Footer";

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="not__found">
      <div class="not__found__main">
        <h1>Page Not Found</h1>
        <ImgLogo alt="logo" />
        <h2>
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </h2>
        <Link class="not__found__main__link" href="/">
          SSI TOOL
        </Link>
      </div>
      <Footer />
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
