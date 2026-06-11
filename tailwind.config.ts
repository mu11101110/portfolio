import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";

module.exports = {
  content: [
    "./app/components/**/*.{vue,js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(["ic"]),
    }),
  ],
};
