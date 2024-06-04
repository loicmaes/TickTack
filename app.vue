<script setup lang="ts">
import {IconoirProvider} from "@iconoir/vue";
import {type IUser} from "~/types/IUser";
import {useUser} from "~/composables/useAuth";

const nuxtApp = useNuxtApp();
nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0);
})

const user: IUser = await useUser();
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
