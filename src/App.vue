<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';

const modal = useTemplateRef('modal');
const modalInactive = computed(() => !modal.value?.innerHTML);

</script>

<template>
  <div
    class="relative z-10"
    :class="{ invisible: modalInactive }"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true">
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      aria-hidden="true"></div>
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div
        id="modal"
        ref="modal"
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"></div>
    </div>
  </div>
  <RouterView />
</template>
