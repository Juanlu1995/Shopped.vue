<script lang="ts" setup>
import ToastComponent from '@/components/toast/toastComponent/ToastComponent.vue';
import ToastStringComponentProp from '@/components/toast/toastStringComponentProp/ToastStringComponentProp.vue';
import { propClasses } from '@/components/toast/toastStringComponentProp/constants';
import { useToastStore } from '@/stores/useToastStore';
import { storeToRefs } from 'pinia';
import { TransitionGroup } from 'vue';

const { toasts } = storeToRefs(useToastStore());
</script>

<template>
  <div class="fixed bottom-2 right-2 flex flex-col-reverse gap-2">
    <TransitionGroup>
      <ToastComponent v-for="toast in toasts" :key="toast.id" :id="toast.id" :type="toast.type">
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
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  width: 0;
  opacity: 0;
}
</style>