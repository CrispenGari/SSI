import { component$, useStore, useStylesScoped$ } from "@builder.io/qwik";
import ImgSnakes from "~/media/snakes.webp?jsx";
import { Form, type DocumentHead, routeAction$ } from "@builder.io/qwik-city";
import Header from "~/components/Header/Header";
import { type PredictionResponse } from "~/types";
import styles from "./index.css?inline";
import Footer from "~/components/Footer/Footer";
export const usePredict = routeAction$(async (data, response) => {
  const formData = new FormData();
  formData.append("image", (data as any).image);
  console.log({ c: response.cookie });
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
          {store.image ? (
            <img class="home__main__image" src={store.image} alt="ssi" />
          ) : (
            <ImgSnakes class="home__main__image" alt="ssi" />
          )}
          <div class="home__image__selector">
            <p>Chose an image of a snake.</p>
            <label for="image">CHOOSE SNAKE IMAGE</label>
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
          </div>
          <button disabled={!store.image} type="submit">
            IDENTIFY
          </button>
        </Form>
        <div class="home__main__results">
          {action.value?.predictions?.top_prediction ? (
            <h2>
              {action.value.predictions.top_prediction.specie.common_name}
            </h2>
          ) : (
            <h2>None</h2>
          )}
          <h1>Top Prediction</h1>
          <table>
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Label</th>
                <th>Probability</th>
              </tr>
            </thead>
            <tbody>
              {action.value?.predictions?.top_prediction ? (
                <tr>
                  <td>{action.value.predictions.top_prediction.class_name}</td>
                  <td>{action.value.predictions.top_prediction.label}</td>
                  <td>
                    {action.value.predictions.top_prediction.probability.toFixed(
                      2
                    )}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td>None</td>
                  <td>None</td>
                  <td>None</td>
                </tr>
              )}
            </tbody>
          </table>

          <h1>Predicted Specie</h1>
          <table>
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Common Name</th>
                <th>Specie Name</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {action.value?.predictions?.top_prediction ? (
                <tr>
                  <td>
                    {action.value.predictions.top_prediction.specie.class_}
                  </td>
                  <td>
                    {action.value.predictions.top_prediction.specie.common_name}
                  </td>
                  <td>
                    {action.value.predictions.top_prediction.specie.specie_name}
                  </td>
                  <td>{action.value.predictions.top_prediction.specie.id}</td>
                </tr>
              ) : (
                <tr>
                  <td>None</td>
                  <td>None</td>
                  <td>None</td>
                  <td>None</td>
                </tr>
              )}
            </tbody>
          </table>
          <h1>Prediction Distribution</h1>
          <table>
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Label</th>
                <th>Probability</th>
              </tr>
            </thead>
            <tbody>
              {action.value?.predictions?.predictions ? (
                action.value.predictions.predictions.map(
                  ({ class_name, probability, label }) => (
                    <tr key={class_name}>
                      <td>{class_name}</td>
                      <td>{label}</td>
                      <td>{probability.toFixed(2)}</td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td>None</td>
                  <td>None</td>
                  <td>None</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
