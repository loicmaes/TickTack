<script setup lang="ts">
import {Button} from "~/components/ui/button";
import {Timer} from "@iconoir/vue";

interface SideBarLinkProps {
  to?: string;
}
defineProps<SideBarLinkProps>();
</script>

<template>
  <Button variant="ghost" as-child>
    <NuxtLink :to="to ?? '/app'">
      <slot name="icon" />
      <span>
        <slot name="content" />
      </span>
    </NuxtLink>
  </Button>
</template>

<style scoped lang="sass">

</style>
