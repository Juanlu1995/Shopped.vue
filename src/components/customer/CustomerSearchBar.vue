<script lang="ts" setup>
import { useCustomerStore } from '@/stores/useCustomerStore';
import CustomerFoundedList from '@/components/customer/CustomerFoundedList.vue';
import SearchSelectCustomerForm from '@/components/customer/SearchSelectCustomerForm.vue';
import SelectedCustomer from '@/components/customer/SelectedCustomer.vue';
import type { Customer } from '@/types';
import { storeToRefs } from 'pinia';

const { setCustomerSelected } = useCustomerStore();
const { customers } = storeToRefs(useCustomerStore());

const handleCustomerClick = (customer: Customer) => {
  setCustomerSelected(customer);
};
</script>

<template>
  <search
    role="search"
    class="px-4 py-4 bg-gray-100 rounded-md border-2 pb-4 grid grid-cols-12 gap-1">
    <div class="col-span-3 flex flex-col">
      <SelectedCustomer />
    </div>
    <div class="col-span-9 flex flex-col gap-1">
      <SearchSelectCustomerForm />
      <div v-if="customers.length" class="w-full">
        <CustomerFoundedList @onClick="handleCustomerClick" />
      </div>
    </div>
  </search>
</template>
