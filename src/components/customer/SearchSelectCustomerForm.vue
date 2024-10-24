<script lang="ts" setup>
import { createCustomerService, searchCustomer } from '@/api/services/customer';
import { useCustomerStore } from '@/stores/useCustomerStore';
import { useToastStore } from '@/stores/useToastStore';
import debounce from 'lodash/debounce';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
const { setToastError } = useToastStore();

const { setCustomerSelected, setCustomers, setCustomerSearchText } =
  useCustomerStore();
const { customerSearch, customers } = storeToRefs(useCustomerStore());

const debounceInput = debounce(async (newInput: string) => {
  if (newInput) {
    const customersFound = await searchCustomer(newInput);
    setCustomers(customersFound);
  }
}, 500);

const handleSubmit = debounce(async () => {
  try {
    const customer = await createCustomerService(customerSearch.value);
    setCustomerSelected(customer);
    setCustomerSearchText('');
  } catch (e) {
    console.error(e);
    setToastError({
      description: h('p', [
        'There has been an error creating the customer ',
        h('span', { class: 'font-bold' }, customerSearch.value),
      ]),
    });
  }
});

watch([customerSearch, customers], ([newInput]) => {
  if (newInput) {
    debounceInput(newInput);
  } else {
    setCustomers([]);
  }
});
</script>

<template>
  <form @submit.prevent="handleSubmit" class="grid grid-cols-8 gap-2 items-end">
    <div class="col-span-7 relative flex flex-col mx-1">
      <label :for="uuid" class="">Search / Create customer</label>
      <input
        :id="uuid"
        name="customer"
        :class="{ 'rounded-b-none': customers.length }"
        class="py-4 grow peer px-2 bg-slate-50 rounded-md h-fit focus:outline-none border"
        type="search"
        placeholder="Search / Create customer"
        v-model.trim="customerSearch" />
    </div>
    <button
      class="h-full rounded hover:bg-gray-300 ring-1 ring-inset hover:ring-2 hover:text-base ring-gray-400 active:ring-gray-600">
      Create
    </button>
  </form>
</template>
