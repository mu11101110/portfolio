<script setup lang="ts">
import { useId } from "vue";
import { UseFocusTrap } from "@vueuse/integrations/useFocusTrap/component";
import ModalContainer from "~/components/parts/modal/parts/ModalContainer.vue";
import type { UseFocusTrapOptions } from "@vueuse/integrations/useFocusTrap";

const {
  isShow,
  isHeaderCloseButton = true,
  isMessageModal = false,
  isSubmitting = false,
  ariaLabelledby,
} = defineProps<{
  isShow: boolean;
  isHeaderCloseButton?: boolean;
  isMessageModal?: boolean;
  isSubmitting?: boolean;
  ariaLabelledby?: string;
}>();

const emit = defineEmits<{
  back: [];
  next: [];
  close: [];
  afterLeave: [];
}>();

const modalId = `modal-${useId()}`;
const focusTrapOptions: UseFocusTrapOptions = {
  immediate: true,
  escapeDeactivates: false,
  fallbackFocus: () => document.getElementById(modalId) ?? document.body,
};

const closeModal = () => {
  if (isSubmitting) return;
  emit("close");
};
</script>

<template>
  <Transition @after-leave="$emit('afterLeave')">
    <UseFocusTrap
      v-if="isShow"
      :id="modalId"
      as="div"
      :options="focusTrapOptions"
      class="fixed z-40 inset-0 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="ariaLabelledby"
      tabindex="-1"
      @keydown.esc.prevent.stop="closeModal"
    >
      <ModalContainer
        :isHeaderCloseButton="isHeaderCloseButton"
        :isMessageModal="isMessageModal"
        :isSubmitting="isSubmitting"
        @close="closeModal"
        ><slot
      /></ModalContainer>
      <div class="absolute z-10 w-full h-full bg-black/30" />
    </UseFocusTrap>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
