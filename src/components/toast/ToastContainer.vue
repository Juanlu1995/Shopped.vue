<script lang="ts" setup>
import ToastComponent from '@/components/toast/ToastComponent.vue';
import ToastStringComponentProp from '@/components/toast/toastStringComponentProp/ToastStringComponentProp.vue';
import { propClasses } from '@/components/toast/toastStringComponentProp/constants';
import { useToastStore } from '@/stores/useToastStore';
import { storeToRefs } from 'pinia';
import { TransitionGroup } from 'vue';

const { toasts } = storeToRefs(useToastStore());
</script>

<template>
  <TransitionGroup tag="ToastComponent">
    <ToastComponent v-for="toast in toasts" :key="toast.id" :id="toast.id">
      <template #title>
        <ToastStringComponentProp
          :prop="toast.title"
          :classes="propClasses.title" />
      </template>
      <ToastStringComponentProp
        v-if="toast.description"
        :prop="toast.description"
        :classes="propClasses.description" />
    </ToastComponent>
  </TransitionGroup>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  width: 0;
  opacity:0;
}
</style>
