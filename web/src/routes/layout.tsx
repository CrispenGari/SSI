import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import styles from "./styles.css?inline";
import Footer from "~/components/Footer/Footer";

export default component$(() => {
  useStyles$(styles);
  return (
    <div class="app">
      <main class="app__main">
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
