import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { QwikQL } from "qwikql";
import "./global.css";
import { RouterHead } from "./components/Head/Head";

export default component$(() => {
  return (
    <QwikQL url="http://localhost:3001/graphql">
      <QwikCityProvider>
        <head>
          <meta charSet="utf-8" />
          <link rel="manifest" href="/manifest.json" />
          <RouterHead />
          <ServiceWorkerRegister />
        </head>
        <body lang="en">
          <RouterOutlet />
        </body>
      </QwikCityProvider>
    </QwikQL>
  );
});
