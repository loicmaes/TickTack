<script setup lang="ts">
import {Button} from "~/components/ui/button";
import User from "~/components/layout/user.vue";
</script>

<template>
  <header class="nav">
    <p>TickTack</p>

    <nav>
      <Button variant="link" as-child><NuxtLink to="/">Home</NuxtLink></Button>
      <Button variant="link" as-child><NuxtLink to="/">Pricing</NuxtLink></Button>
      <Button variant="link" as-child><NuxtLink to="/">About</NuxtLink></Button>
    </nav>

    <User />
  </header>
</template>

<style scoped lang="sass">
.nav
  @apply px-40 py-6 w-full flex items-center justify-between
</style>
