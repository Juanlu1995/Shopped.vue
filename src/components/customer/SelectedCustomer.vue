<script lang="ts" setup>
import { useCustomerStore } from '@/stores/useCustomerStore';
import { storeToRefs } from 'pinia';
const { setCustomerSelected } = useCustomerStore();
const { customerSelected } = storeToRefs(useCustomerStore());

const handleClick = () => {
  setCustomerSelected(null);
};
</script>

<template>
  <fieldset class="border border-solid border-gray-300 px-3 py-1">
    <legend class="text-xs">Selected customer</legend>
    <div class="flex justify-between">
      <p>
        {{ customerSelected?.name }}
      </p>
      <button
        class="p-1 h-8 w-8 hover:bg-gray-200 hover:shadow-md rounded-full flex justify-self-end"
        :class="{ invisible: !customerSelected }"
        @click="handleClick">
        <i class="fi fi-br-cross place-self-center self-end pt-1"></i>
      </button>
    </div>
  </fieldset>
</template>
<style>
@import url('https://cdn-uicons.flaticon.com/2.6.0/uicons-bold-rounded/css/uicons-bold-rounded.css');
</style>
