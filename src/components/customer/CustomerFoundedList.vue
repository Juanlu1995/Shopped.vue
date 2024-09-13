<script setup lang="ts">
import { useCustomerStore } from '@/stores/useCustomerStore';
import type { Customer } from '@/types';
import { storeToRefs } from 'pinia';

const { setCustomerSearchText } = useCustomerStore();
const { customerSearch, customers } = storeToRefs(useCustomerStore());

const emit = defineEmits<{ onClick: [Customer] }>();

const handleClick = (customer: Customer) => {
  emit('onClick', customer);
  setCustomerSearchText('');
};
</script>

<template>
  <div class="flex flex-col fixed bg-gray-50 w-fit ml-1 px-2 border rounded">
    <label for="customers-select">Founded customers</label>
    <span
      v-if="!customers.length && customerSearch.length"
      class="text-gray-600">
      Nothing found!
    </span>
    <ul v-if="customers.length" class="w-full rounded-md divide-y">
      <li
        v-for="customer in customers"
        :key="customer.id"
        class="text-gray-400 leading-4 grow py-4 px-2 hover:bg-slate-200 active:ring-slate-300 active:ring-2 transition-all duration-75 hover:scale-x-[1.010]"
        @click="handleClick(customer)">
        {{ customer.name }}
      </li>
    </ul>
  </div>
</template>
