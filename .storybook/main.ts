import type { StorybookConfig } from "@storybook/vue3-vite";
import { mergeConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

const config: StorybookConfig = {
  framework: { name: "@storybook/vue3-vite", options: {} },
  stories: ["../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-interactions"],
  core: {
    builder: "@storybook/builder-vite",
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [
        vue(),
        AutoImport({
          imports: ["vue"],
          dts: false,
          include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.stories\.ts$/],
        }),
        Components({
          dirs: ["../app/components"],
          directoryAsNamespace: true,
          extensions: ["vue"],
          deep: true,
          dts: false,
          include: [/\.vue$/, /\.vue\?vue/, /\.stories\.ts$/],
        }),
      ],
      resolve: {
        alias: {
          "~": path.resolve(__dirname, "../app"),
          "@": path.resolve(__dirname, "../app"),
          "#storybook": path.resolve(__dirname, "./"),
        },
      },
      publicDir: path.resolve(__dirname, "../public"),
    });
  },
};

export default config;
