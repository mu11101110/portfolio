import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  {
    ignores: [
      ".nuxt/**",
      ".output/**",
      "storybook-static/**",
      "node_modules/**",
      "components.d.ts",
      "types/vue-shim.d.ts",
    ],
  },
  {
    rules: {
      // props 属性名をケバブケースに統一
      "vue/attribute-hyphenation": "off",
      // v-on のイベント名をケバブケースに統一
      "vue/v-on-event-hyphenation": "off",
      // 属性順序ルール
      "vue/attributes-order": "off",
      // HTML要素 / Vue コンポーネント の self-closing 制限
      "vue/html-self-closing": "off",
      // 複数 root 禁止
      // Vue3 では複数 root が許可されているため off
      "vue/no-multiple-template-root": "off",
      // required でない props にデフォルト値を要求
      "vue/require-default-prop": "off",
    },
  },
);
