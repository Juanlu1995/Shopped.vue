<script setup lang="ts">
import Navbar from '@/components/NavbarComponent.vue';
import Footer from '@/components/FooterComponent.vue';
import { useSlots } from 'vue';

const slots = useSlots();
if (!slots?.default) {
  console.error('The template should contain something!');
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <slot name="header">
        <Navbar />
      </slot>
    </header>

    <main class="grow">
      <slot />
    </main>

    <footer class="bg-white dark:bg-gray-800">
      <slot name="footer">
        <Footer />
      </slot>
    </footer>
  </div>
</template>
