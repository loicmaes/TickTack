<script setup lang="ts">
import {useState} from "#imports";
import {type IUser} from "~/types/IUser";
import {useHead} from "#imports";
import {useStrictProtectedAccess} from "~/composables/useAuth";

definePageMeta({
  layout: 'app-base'
});

useHead({
  title: 'TickTack · Home'
});

await useStrictProtectedAccess(true);

useState<string>('page-name').value = 'Overview';

const user = useState<IUser>('user').value;
</script>

<template>
  <div class="flex flex-col gap-3 items-start">
    <p>Hello {{ user.firstName }} {{ user.lastName }}</p>
  </div>
</template>

<style scoped lang="sass">

</style>
