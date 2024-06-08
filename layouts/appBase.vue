<script setup lang="ts">
import SideBar from "~/components/layout/app/sideBar.vue";
</script>

<template>
  <div data-layout="app-base" class="layout app-base">
    <SideBar />

    <main class="app-container">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="sass">
.app
  &-base
    @apply h-screen flex

  &-container
    @apply flex-1 overflow-y-auto

  &-renderer
    @apply flex-1 px-8 py-6
</style>
