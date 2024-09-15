<script lang="ts" setup>
import { TOAST_TYPE_CLASS } from '@/components/toast/toastComponent/constants';
import { useToastStore } from '@/stores/useToastStore';
import type { Toast } from '@/types';
import { computed, ref, watch } from 'vue';
const TIMER = 10000;
const INTERVAL = 200;
const { id, type } = defineProps<{ id: Toast['id']; type: Toast['type'] }>();
const { removeToast } = useToastStore();

const interval = ref<number>();
const timer = ref<number>(TIMER);
const handleRemove = () => {
  removeToast(id);
};

interval.value = setInterval(() => {
  if (timer.value === 0) {
    clearInterval(interval.value);
  } else {
    timer.value = timer.value - INTERVAL;
  }
}, INTERVAL);

watch(timer, () => {
  if (timer.value === 0) {
    handleRemove();
  }
});

const percentageTimer = computed(
  () => `${Math.trunc((100 * timer.value) / TIMER)}%`,
);
</script>

<template>
  <div
    class="h-28 py-1 rounded-md sticky"
    :class="TOAST_TYPE_CLASS[type]"
    role="alert">
    <button class="absolute -right-1 -top-1" aria-label="Close toast" @click="handleRemove">
      <i class="fi fi-br-cross-circle"></i>
    </button>
    <div class="bg-white h-2 m-1 rounded-md percentage" />
    <div class="p-2 w-56 overflow-scroll">
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
