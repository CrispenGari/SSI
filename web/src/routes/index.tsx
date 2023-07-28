import { component$, useStore, useStylesScoped$ } from "@builder.io/qwik";
import ImgLogo from "~/media/gallery.png?jsx";
import { Form, type DocumentHead, routeAction$ } from "@builder.io/qwik-city";
import Header from "~/components/Header/Header";
import { type PredictionResponse } from "~/types";
import styles from "./index.css?inline";
export const usePredict = routeAction$(async (data, response) => {
  const formData = new FormData();
  formData.append("image", (data as any).image);
  console.log({ c: response.cookie, i: (data as any).image });
  const res = await fetch("http://127.0.0.1:3001/api/rest/identify", {
    body: formData,
    method: "POST",
  });
  const { success, predictions }: PredictionResponse = await res.json();
  return {
    success: success,
    predictions,
  };
});

export default component$(() => {
  useStylesScoped$(styles);
  const action = usePredict();

  const store = useStore({
    image: null,
  });

  return (
    <div class="home">
      <Header />
      <div class="home__main">
        <Form action={action}>
          {store.image && (
            <label for="image">
              <ImgLogo alt="ssi" />
              <p>Select Image</p>
            </label>
          )}
          <input
            onChange$={(e) => {
              const img = e.target.files ? e.target.files[0] : null;
              if (!img) return;
              const reader = new FileReader();
              reader.onload = function (e) {
                store.image = e.target?.result as any;
              };
              reader.readAsDataURL(img);
            }}
            type="file"
            hidden
            name="image"
            id="image"
            accept="image/*"
            multiple={false}
          />

          {store.image ? (
            <img src={store.image} alt="ssi" />
          ) : (
            <label for="image">
              <ImgLogo alt="ssi" />
              <p>Select Image</p>
            </label>
          )}

          <button type="submit">PREDICT</button>
          <div class="error">
            {action.value &&
              JSON.stringify({ data: action.value, store }, null, 2)}
          </div>
        </Form>
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
