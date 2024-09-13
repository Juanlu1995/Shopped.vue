<script lang="ts" setup>
import {
  createCustomerService,
  searchCustomerSocketService,
} from '@/api/services/customer';
import { useCustomerStore } from '@/stores/useCustomerStore';
import type { Customer } from '@/types';
import debounce from 'lodash/debounce';
import { storeToRefs } from 'pinia';
import { getCurrentInstance, onMounted, onUnmounted, ref, watch } from 'vue';

const { customers, setCustomerSelected, setCustomers, setCustomerSearchText } =
  useCustomerStore();
const { customerSearch } = storeToRefs(useCustomerStore());
const instance = getCurrentInstance();
const uuid = ref(instance?.uid.toString());

const listener = (customers: Customer[]) => {
  setCustomers(customers);
};

const socketListen = () => {
  searchCustomerSocketService.listen(listener);
};
const socketStopListen = () => {
  searchCustomerSocketService.stopListen();
};

const cleanCustomerSearch = () => {
  socketStopListen();
  setCustomers([]);
};

const debounceInput = debounce((newInput: string) => {
  if (newInput) {
    searchCustomerSocketService.listen;
    searchCustomerSocketService.query(newInput);
  }
});

onMounted(() => {
  searchCustomerSocketService.connect();
  socketListen();
});
onUnmounted(() => {
  searchCustomerSocketService.disconnect();
});

const handleSubmit = async () => {
  try {
    const customer = await createCustomerService(customerSearch.value);
    setCustomerSelected(customer);
    setCustomerSearchText('');
    socketStopListen();
  } catch (e) {
    // TODO - toast an error
    console.error(e);
  }
};

watch(customerSearch, (newInput) => {
  if (newInput) {
    socketListen();
    debounceInput(newInput);
  } else {
    cleanCustomerSearch();
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
