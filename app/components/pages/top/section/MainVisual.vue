<script setup lang="ts">
import LogoImage from "~/components/parts/logo/LogoImage.vue";
import LogoText from "~/components/parts/logo/LogoText.vue";

defineEmits<{
  scroll: [];
}>();
</script>

<template>
  <section
    class="h-dvh bg-[url(~/assets/images/background_mv.png)] bg-no-repeat bg-cover flex items-center justify-center relative"
  >
    <h1>
      <LogoImage class="mb-3" />
      <LogoText class="mx-auto" />
    </h1>
    <button
      aria-label="メインコンテンツにスクロールする"
      class="size-8 absolute right-0 left-0 mx-auto bottom-6 animate-bounce hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-highlight-yellow"
      @click="$emit('scroll')"
    >
      <span
        class="i-ic-sharp-keyboard-double-arrow-down text-highlight-yellow size-8 inline-block"
      />
    </button>
  </section>
</template>
