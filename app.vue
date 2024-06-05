<script setup lang="ts">
import {IconoirProvider} from "@iconoir/vue";
import {useUser} from "~/composables/useAuth";
import Toast from "~/components/ui/toast/Toaster.vue";

const nuxtApp = useNuxtApp();
nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0);
})

await useUser();
</script>

<template>
  <Toast />
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
