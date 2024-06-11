<script setup lang="ts">

</script>

<template>
  <div class="renderer">
    <slot />
  </div>
</template>

<style scoped lang="sass">
.renderer
  @apply px-8 py-8 flex-1 overflow-y-auto
</style>
