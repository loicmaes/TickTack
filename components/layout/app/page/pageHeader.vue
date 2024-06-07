<script setup lang="ts">
import {Button} from "~/components/ui/button";
import type {IUser} from "~/types/IUser";

interface PageHeaderProps {
  name?: string;
  hasPremiumFeature?: boolean;
}
defineProps<PageHeaderProps>();

const user = useState<IUser>('user').value;
const isPremium = computed(_ => user.premium ?? false);
</script>

<template>
  <header class="page__header">
    <h1 class="page__header--title" v-if="name">{{ name }}</h1>
    <Button v-if="hasPremiumFeature && !isPremium">Upgrade</Button>
  </header>
</template>

<style scoped lang="sass">
@forward '../../../../assets/css/shared/authPage'
</style>
