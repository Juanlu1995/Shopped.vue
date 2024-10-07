<script lang="ts" setup>
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';
import { onMounted, onUnmounted, ref } from 'vue';
import debounce from 'lodash/debounce';
const fullConfig = resolveConfig(tailwindConfig);

const mdPixels = Number(fullConfig.theme.screens.md.replace(/\D/g, ''));
const oldWidth = ref(window.innerWidth);
const show = ref(false);

const mustShowNavbar = debounce(() => {
  if (window.innerWidth > mdPixels) {
    if (!show.value) {
      show.value = true;
    }
  } else {
    if(oldWidth.value > mdPixels) {
      show.value = false;
    }
  }
  oldWidth.value = window.innerWidth;
}, 200);
onMounted(() => {
  window.onresize = mustShowNavbar;
  mustShowNavbar();
});
onUnmounted(() => {
  removeEventListener('onresize', mustShowNavbar);
});
</script>

<template>
  <nav class="relative bg-white border-gray-200 dark:bg-gray-900">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-end md:justify-start p-4">
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="relative inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        :aria-expanded="show"
        @click="show = !show">
        <span class="sr-only">Open main menu</span>
        <i class="text-3xl fi fi-br-menu-burger"></i>
      </button>
      <Transition>
        <div
          v-show="show"
          class="absolute left-[0.005%] top-12 md:top-0 md:left-0 w-full md:static md:w-auto z-10"
          id="navbar-default">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800/95 md:dark:bg-gray-900 dark:border-gray-700">
            <RouterLink
              activeClass="underline active"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent *:"
              to="/">
              Home
            </RouterLink>
            <RouterLink
              activeClass="underline active"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              to="/debts">
              Debts
            </RouterLink>
          </ul>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
