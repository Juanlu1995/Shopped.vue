import type { Customer } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCustomerStore = defineStore('customer', () => {
  const customers = ref<Customer[]>([]);
  const customerSelected = ref<Customer | null>(null);

  const setCustomers = (newCustomers: Customer[]) => {
    console.debug(customers);
    customers.value = [...newCustomers];
  };
  const setCustomerSelected = (customer: Customer) => {
    customerSelected.value = customer;
  };


  return {
    customers,
    customerSelected,
    setCustomers,
    setCustomerSelected,
  };
});
