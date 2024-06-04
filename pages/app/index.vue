<script setup lang="ts">
import {useState} from "#imports";
import type {IUser} from "~/types/IUser";

const user = useState<IUser>('user');
if (!user.value) navigateTo('/auth/login');
</script>

<template>
  <p>Hello {{user?.firstName}} {{ user?.lastName }}</p>
</template>

<style scoped lang="sass">

</style>
