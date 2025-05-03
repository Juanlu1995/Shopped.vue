<template>
  <div class="flex flex-wrap gap-1">
    <button
      class="rounded-full border p-1 hover:border-gray-600"
      title="Remove">
      <Trash />
    </button>
    <button class="rounded-full border p-1 hover:border-gray-600" title="Edit">
      <Pencil />
    </button>
  </div>
</template>
<script setup lang="ts">
import { Pencil, Trash } from 'lucide-vue-next';
</script>
<style></style>
