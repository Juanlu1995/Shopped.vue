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

const { customers, setCustomerSelected, setCustomers, setCustomerSearchText } = useCustomerStore();
const {customerSearch} = storeToRefs(useCustomerStore());
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
    cleanCustomerSearch();
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
  <form @submit.prevent="handleSubmit" class="grid grid-cols-8 gap-2">
    <div class="col-span-7 relative flex flex-col mx-1">
      <input
        :id="uuid"
        name="customer"
        :class="{ 'rounded-b-none': customers.length }"
        class="py-4 grow peer px-2 bg-slate-50 rounded-md h-fit focus:outline-none border"
        type="search"
        v-model.trim="customerSearch" />
      <label
        :for="uuid"
        class="-top-7 absolute pointer-events-none mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 dark:text-neutral-400 dark:peer-focus:text-primary"
        :class="{
          'scale-75 -left-2': customerSearch.length,
          'peer-focus:-translate-x-2 peer-[&:not(:focus)]:translate-x-2 peer-[&:not(:focus)]:translate-y-9 transition-all duration-150 ease-out peer-focus:scale-75 peer-focus:text-primary motion-reduce:transition-none':
            !customerSearch,
        }">
        Search / Create customer
      </label>
    </div>
    <button
      class="h-fit p-2 rounded hover:ring-offset-2 hover:ring-2 hover:ring-gray-900 active:ring-cyan-400">
      Create
    </button>
  </form>
</template>
