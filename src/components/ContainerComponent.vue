<template>
  <div
    class="self-center flex justify-center"
    :class="{ 'md:justify-start': $slots.aside }">
    <div class="container lg:mx-4 xl:mx-auto grid grid-cols-12 gap-4 my-2 md:mx-2">
      <article class="col-span-12" :class="{ 'md:col-span-10': $slots.aside }">
        <slot />
      </article>

      <div v-if="$slots.aside" class="invisible md:visible">
        <div>
          <slot name="aside"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
