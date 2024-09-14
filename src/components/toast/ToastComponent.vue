<script lang="ts" setup>
import { useToastStore } from '@/stores/useToastStore';
import type { Toast } from '@/types';
import { ref, watch } from 'vue';

const { id } = defineProps<{ id: Toast['id'] }>();
const { removeToast } = useToastStore();

const interval = ref<number>();
const timer = ref<number>(5);

interval.value = setInterval(() => {
  if (timer.value === 0) {
    clearInterval(interval.value);
  } else {
    timer.value--;
  }
}, 1000);

watch(timer, () => {
  if (timer.value === 0) {
    removeToast(id);
  }
});
</script>

<template>
  <div
    class="fixed bottom-2 right-2 p-4 w-56 h-28 bg-red-600/80 rounded-md"
    role="alert">
    {{ id }}
    {{ timer }}
    <slot name="title"></slot>
    <slot />
    <slot name="footer"></slot>
  </div>
</template>
