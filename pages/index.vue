<script setup lang="ts">
import { Button } from "~/components/ui/button";
import {useHead} from "#imports";

useHead({
  title: 'TickTack, the new time tracking tool'
});
</script>

<template>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-8">
    <h1 class="text-4xl font-extrabold">Hello world!</h1>
    <Button>Say hi 👋</Button>
  </div>
</template>

<style scoped lang="sass">

</style>
