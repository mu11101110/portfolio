import { setup, type Preview } from "@storybook/vue3";
import "../app/assets/css/base.css";

const preview: Preview = {
  args: {
    modelValue: [],
  },
  parameters: {
    actions: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

setup((app) => {
  if (app) {
    app.component("NuxtLink", {
      props: {
        to: {
          type: String,
          required: true,
        },
      },
      template: '<a tabindex="-1"><slot></slot></a>',
    });
  }
});

export default preview;
