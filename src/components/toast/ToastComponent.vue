<script lang="ts" setup>
import { useToastStore } from '@/stores/useToastStore';
import type { Toast } from '@/types';
import { computed, ref, watch } from 'vue';
const TIMER = 10000;
const INTERVAL = 200;
const { id } = defineProps<{ id: Toast['id'] }>();
const { removeToast } = useToastStore();

const interval = ref<number>();
const timer = ref<number>(TIMER);

interval.value = setInterval(() => {
  if (timer.value === 0) {
    clearInterval(interval.value);
  } else {
    timer.value = timer.value - INTERVAL;
  }
}, INTERVAL);

watch(timer, () => {
  if (timer.value === 0) {
    removeToast(id);
  }
});

const percentageTimer = computed(
  () => `${Math.trunc((100 * timer.value) / TIMER)}%`,
);
</script>

<template>
  <div class="h-28 py-1 bg-red-600/80 rounded-md">
    <div class="bg-white h-2 m-1 rounded-md percentage" />
    <div class="p-2 w-56 overflow-scroll" role="alert">
      <slot name="title"></slot>
      <slot />
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.percentage {
  width: v-bind(percentageTimer);
  transition: all 0.2s linear;
}
</style>
