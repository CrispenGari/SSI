import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import styles from "./styles.css?inline";
import Header from "~/components/Header/Header";
import Footer from "~/components/Footer/Footer";

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <Header />
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
