<script setup lang="ts">
import dummyImage from "~/assets/images/card_dummy.png";

defineProps<{
  title: string;
  text?: string;
  imgUrl?: string;
}>();
</script>

<template>
  <div class="text-center w-[21.4375rem] lg:w-[332px]">
    <dt class="text-lg font-bold">
      <img
        class="mb-3"
        :src="imgUrl ?? dummyImage"
        alt=""
        aria-hidden="true"
      />{{ title }}
    </dt>
    <dd>
      <slot>{{ text }}</slot>
    </dd>
  </div>
</template>
