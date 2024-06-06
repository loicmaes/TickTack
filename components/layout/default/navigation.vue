<script setup lang="ts">
import {Button} from "~/components/ui/button";
import User from "~/components/layout/user.vue";
import {Dashboard} from "@iconoir/vue";
import {DropdownMenuGroup, DropdownMenuItem} from "~/components/ui/dropdown-menu";
</script>

<template>
  <header class="nav">
    <p>TickTack</p>

    <nav>
      <Button variant="link" as-child><NuxtLink to="/">Home</NuxtLink></Button>
      <Button variant="link" as-child><NuxtLink to="/">Pricing</NuxtLink></Button>
      <Button variant="link" as-child><NuxtLink to="/">About</NuxtLink></Button>
    </nav>

    <User>
      <template #content>
        <DropdownMenuGroup>
          <DropdownMenuItem class="item" as-child>
            <NuxtLink to="/app">
              <Dashboard class="icon" />
              <span>Dashboard</span>
            </NuxtLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </template>
    </User>
  </header>
</template>

<style scoped lang="sass">
.icon
  @apply mr-2 h-4 w-4

.nav
  @apply px-40 py-6 w-full flex items-center justify-between
</style>
