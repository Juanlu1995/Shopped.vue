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
  <div class="flex justify-between">
    <div>
      <label className="text-xs">Selected customer</label>
      <p class="flex">
        {{ customerSelected?.name }}
      </p>
    </div>
    <button
      class="p-1 h-8 w-8 hover:bg-gray-200 hover:shadow-md rounded-full flex place-content-center"
      :class="{'invisible': !customerSelected}"
      @click="handleClick">
      <i class="fi fi-br-cross place-self-center pt-1"></i>
    </button>
  </div>
</template>
<style>
@import url('https://cdn-uicons.flaticon.com/2.6.0/uicons-bold-rounded/css/uicons-bold-rounded.css');
</style>
