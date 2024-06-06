<script setup lang="ts">
import {useState} from "#imports";
import {type IUser} from "~/types/IUser";
import {useHead} from "#imports";

definePageMeta({
  layout: 'app-base',
  middleware: 'is-authenticated',
  name: 'Overview'
});

useHead({
  title: 'TickTack · Home'
});

const user = useState<IUser>('user').value;
</script>

<template>
  <div class="flex flex-col gap-3 items-start">
    <p>Hello {{ user.firstName }} {{ user.lastName }}</p>
  </div>
</template>

<style scoped lang="sass">

</style>
