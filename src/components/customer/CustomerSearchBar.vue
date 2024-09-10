<script lang="ts" setup>
import SearchBarCustomerSelect from '@/components/customer/SearchBarCustomerSelect.vue'
import SearchSelectCustomerForm from '@/components/customer/SearchSelectCustomerForm.vue';
import { useCustomerStore } from '@/stores/useCustomerStore';
import type { Customer } from '@/types';

const { setCustomerSelected } = useCustomerStore();

const handleCustomerClick = (customer: Customer) => {
  setCustomerSelected(customer);
};
</script>

<template>
  <search role="search" class="px-4 py-4 bg-gray-100 rounded-md border-2 pb-4 grid grid-cols-12 gap-1">
    <div class="col-span-4">
      <SearchBarCustomerSelect @onClick="handleCustomerClick" />
    </div>
    <div class="col-span-8">
      <SearchSelectCustomerForm />
    </div>
  </search>
</template>

