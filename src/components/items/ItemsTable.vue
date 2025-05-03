<template>
  <div class="shadow-lg border-1">
    <input
      type="search"
      name="search"
      id="search"
      placeholder="Search"
      class="w-full min-h-6 p-2" />
    <table class="w-full table-auto">
      <thead class="bg-gray-600 border-2">
        <tr>
          <th class="hidden sm:table-cell text-start p-1">ID</th>
          <th class="text-start p-1">Name</th>
          <th class="text-start p-1">Price</th>
          <th class="text-start p-1">Measure</th>
          <th class="text-start p-1 max-sm:max-w-3 max-sm:w-3">Other names</th>
          <th class="hidden sm:table-cell text-start p-1">Sells</th>
          <th class="text-start p-1"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          class="odd:bg-white even:bg-gray-100 hover:bg-gray-300"
          :key="item.id">
          <td class="p-1 hidden sm:table-cell">{{ item.id }}</td>
          <td class="p-1">{{ item.name }}</td>
          <td class="p-1">{{ item.price }}</td>
          <td class="p-1">{{ item.measure }}</td>
          <td class="p-1">
            <ItemsTableOtherNames :other-names="item.otherNames" />
          </td>
          <td class="p-1 hidden sm:table-cell">{{ item.sells }}</td>
          <td class="p-1"><ItemsTableItemActions /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import ItemsTableOtherNames from '@/components/items/ItemsTableOtherNames.vue';
import ItemsTableItemActions from '@/components/items/ItemsTableItemActions.vue';

const items = [
  {
    id: 1,
    name: 'Apple',
    price: 0.5,
    measure: 'kg',
    otherNames: ['Manzana', 'Pomme'],
    sells: 150,
  },
  {
    id: 2,
    name: 'Milk',
    price: 1.2,
    measure: 'liter',
    otherNames: ['Leche', 'Lait'],
    sells: 80,
  },
  {
    id: 3,
    name: 'Bread',
    price: 1.0,
    measure: 'unit',
    otherNames: ['Pan', 'Pain'],
    sells: 200,
  },
  {
    id: 4,
    name: 'Tomato',
    price: 0.8,
    measure: 'kg',
    otherNames: ['Tomate', 'Tomate (FR)'],
    sells: 120,
  },
  {
    id: 5,
    name: 'Cheese',
    price: 2.5,
    measure: 'kg',
    otherNames: ['Queso', 'Fromage'],
    sells: 60,
  },
];
</script>
