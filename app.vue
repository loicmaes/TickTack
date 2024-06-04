<script setup lang="ts">
import {IconoirProvider} from "@iconoir/vue";
</script>

<template>
  <IconoirProvider :icon-props="{
    'width': '1.5rem',
    'height': '1.5rem',
    'stroke-width': '2',
  }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </IconoirProvider>
</template>
