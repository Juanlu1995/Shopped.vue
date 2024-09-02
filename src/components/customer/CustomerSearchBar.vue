<script lang="ts" setup>
import api from '@/api/endpoints';
import type { Customer } from '@/types';
import { ref, watch } from 'vue';
import debounce from 'lodash/debounce';
import { createCustomerService } from '@/api/services/customer';

const input = ref('');

const handleSubmit = () => {
  try {
    // TODO - set selected customer
    const customer = createCustomerService(input.value);
  } catch (e) {
    // TODO - toast an error
    console.error(e);
  }
};

watch(
  input,
  debounce((newInput: string) => {
    
  }),
);
</script>

<template>
  <search role="search" class="px-4 py-2 bg-gray-100 rounded-md border-2">
    <form @submit.prevent="handleSubmit" class="flex">
      <label class="mr-2 grow flex items-center">
        <i class="fi fi-tr-search-dollar" alt="Search customer" />
        <input
          name="customer"
          class="divide-x-2 m-2 bg-transparent h-fit focus:outline-none grow"
          type="search"
          placeholder="Search customer"
          v-model.trim="input" />
      </label>
      <button
        class="p-2 rounded hover:ring-offset-2 hover:ring-2 hover:ring-gray-900 active:ring-cyan-400">
        Create
      </button>
    </form>
  </search>
</template>

<style>
@import url('https://cdn-uicons.flaticon.com/2.5.1/uicons-thin-rounded/css/uicons-thin-rounded.css');
</style>
