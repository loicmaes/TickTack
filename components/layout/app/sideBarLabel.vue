<script setup lang="ts">

</script>

<template>
  <div data-separator>
    <slot />
  </div>
</template>

<style scoped lang="sass">
[data-separator]
  @apply w-full mb-3 px-2 flex items-center gap-2 text-sm text-stone-300 dark:text-stone-600 before:h-[2px] before:w-3 before:bg-stone-200 dark:before:bg-stone-900 after:h-[2px] after:flex-1 after:bg-stone-200 dark:after:bg-stone-900
</style>
