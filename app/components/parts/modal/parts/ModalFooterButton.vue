<script setup lang="ts">
import ButtonOutline from "~/components/parts/button/ButtonOutline.vue";
import ButtonSolid from "~/components/parts/button/ButtonSolid.vue";
import type { ModalFooterButton } from "~/types/Modal";

defineProps<{
  footerButton: ModalFooterButton;
}>();

defineEmits<{
  back: [];
  next: [];
}>();
</script>

<template>
  <div class="flex justify-center mt-8">
    <ButtonOutline
      size="md"
      :label="footerButton.backButton.label"
      :ariaLabel="footerButton.backButton.ariaLabel"
      :disabled="footerButton.backButton.disabled"
      @click="$emit('back')"
    />
    <ButtonSolid
      v-if="footerButton.nextButton"
      class="ml-2"
      size="md"
      :label="footerButton.nextButton.label"
      :ariaLabel="footerButton.nextButton.ariaLabel"
      :type="footerButton.nextButton.type"
      :confirmed="footerButton.nextButton.confirmed"
      :disabled="footerButton.nextButton.disabled"
      @click="$emit('next')"
    />
  </div>
</template>
