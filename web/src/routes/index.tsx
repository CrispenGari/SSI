import { component$ } from "@builder.io/qwik";

import { Form, type DocumentHead, routeAction$ } from "@builder.io/qwik-city";
import { type PredictionResponse } from "~/types";
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
  const action = usePredict();

  return (
    <div class="home">
      <Form action={action}>
        <input type="file" name="image" id="image" multiple={false} />
        <button type="submit">PREDICT</button>
        <div class="error">
          {action.value && JSON.stringify({ data: action.value }, null, 2)}
        </div>
      </Form>
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
