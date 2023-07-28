import { component$, useStylesScoped$ } from "@builder.io/qwik";
import ImgLogo from "~/media/logo.png?jsx";
import GitHubLogo from "~/media/github.png?jsx";
import styles from "./index.css?inline";
export default component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="header">
      <ImgLogo alt="logo" />
      <a href="https://github.com/CrispenGari/SSI/issues">
        <GitHubLogo alt="logo" />
      </a>
    </div>
  );
});
