<script setup lang="ts">
import { useCustomerStore } from '@/stores/useCustomerStore';
import type { Customer } from '@/types';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const { customers } = storeToRefs(useCustomerStore());
const size = computed(() => customers.value.length || 0);

const emit = defineEmits<{ onClick: [Customer] }>();

const handleClick = (customer: Customer) => {
  emit('onClick', customer)
};
</script>

<template>
  <label for="customers-select">Founded customers</label>
  <ul class="w-full rounded-md">
    <li
      v-for="customer in customers"
      v-bind:size="size"
      :key="customer.id"
      class="leading-4 divider grow p-4 hover:bg-slate-200 active:ring-slate-300 active:ring-2 transition-all duration-75 hover:scale-x-[1.010]"
      @click="handleClick(customer)">
      {{ customer.name }}
    </li>
  </ul>
</template>
