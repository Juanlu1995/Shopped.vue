<template>
  <div class="flex flex-wrap gap-1">
    <span
      v-for="name in otherNames"
      :key="name"
      :class="getRandomColor()"
      class="px-2.5 py-0.5 rounded-sm">
      {{ name }}
    </span>
  </div>
</template>

<script setup lang="ts">
const { otherNames } = defineProps<{ otherNames: string[] }>();

const tailwindBgColors = [
  'bg-red-50',
  'bg-blue-50',
  'bg-green-50',
  'bg-yellow-50',
  'bg-purple-50',
  'bg-pink-50',
  'bg-indigo-50',
  'bg-teal-50',
  'bg-orange-50',
];
function getRandomColor() {
  return tailwindBgColors[Math.floor(Math.random() * tailwindBgColors.length)];
}
</script>
