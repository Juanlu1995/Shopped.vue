import type { Customer } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCustomerStore = defineStore('customer', () => {
  const customers = ref<Customer[]>([]);
  const customerSelected = ref<Customer | null>(null);
  const customerSearch = ref('');

  const setCustomers = (newCustomers: Customer[]) => {
    customers.value = [...newCustomers];
  };
  const setCustomerSelected = (customer: Customer | null) => {
    customerSelected.value = customer;
  };
  const setCustomerSearchText = (newInput: string) => {
    customerSearch.value = newInput;
  };

  return {
    customers,
    customerSearch,
    customerSelected,
    setCustomers,
    setCustomerSearchText,
    setCustomerSelected,
  };
});
