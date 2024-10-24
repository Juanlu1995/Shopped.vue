<script lang="ts" setup>
import type { Toast } from '@/types';

const { prop, classes } = defineProps<{
  prop: Toast['title'] | Toast['description'];
  classes: string;
}>();
const isStringProp = typeof prop === 'string';
</script>

<template>
  <div v-if="!isStringProp" :class="classes">
    <component :is="prop" />
  </div>

  <p v-else>{{ prop }}</p>
</template>
