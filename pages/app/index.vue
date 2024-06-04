<script setup lang="ts">
import {useState} from "#imports";
import {type IUser} from "~/types/IUser";
import {useHead} from "#imports";

definePageMeta({
  middleware: 'is-authenticated',
});

useHead({
  title: 'TickTack · Home'
});

const user = useState<IUser>('user').value;
</script>

<template>
  <p>Hello {{ user.firstName }} {{ user.lastName }}</p>
</template>

<style scoped lang="sass">

</style>
