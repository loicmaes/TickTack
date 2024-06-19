<script setup lang="ts">
type GridType = 'default' | 'top-first' | 'auto';
interface PageContentProps {
  grid?: GridType;
}
defineProps<PageContentProps>();
</script>

<template>
  <div class="renderer" :class="{ 'grid-view': grid, 'top-first': grid === 'top-first', 'auto': grid === 'auto', 'default': grid === 'default' }">
    <slot />
  </div>
</template>

<style scoped lang="sass">
.renderer
  @apply px-8 py-8 flex-1 overflow-y-auto

  &.grid-view
    @apply grid grid-cols-3 gap-6

    &.default
      @apply grid-rows-2

    &.auto
      @apply auto-rows-min

    &.top-first
      @apply grid-rows-[auto_1fr]
</style>
