import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          "Noto+Sans+JP": true,
        },
      },
    ],
    "@nuxt/eslint",
  ],
  app: {
    head: {
      title: "Sample Site",
      meta: [
        { charset: "utf-8" },
        { name: "robots", content: "noindex,nofollow" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
  components: [
    {
      path: "~/components",
      extensions: ["vue"],
    },
  ],
  css: ["./app/assets/css/base.css"],
  typescript: {
    typeCheck: true,
    strict: true,
    tsConfig: {
      include: ["../stories/**/*.stories.ts", "../types/**/*.d.ts"],
    },
  },
  sourcemap: false,
});
