<script setup lang="ts">
import {Button} from "~/components/ui/button";
import type {IUser} from "~/types/IUser";
import {SparksSolid} from "@iconoir/vue";

interface PageHeaderProps {
  name?: string;
  premium?: boolean
  hasPremiumFeature?: boolean;
}
const { premium } = defineProps<PageHeaderProps>();

const user = useState<IUser>('user').value;
const isPremium = computed(_ => /*user.premium*/premium ?? false);
</script>

<template>
  <header class="page__header">
    <h1 class="page__header--title" v-if="name">{{ name }}</h1>

    <Button v-if="hasPremiumFeature && !isPremium"><SparksSolid class="w-4 h-4 mr-2" /> Upgrade</Button>
    <div class="page__header--actions" v-if="!hasPremiumFeature || isPremium">
      <slot name="actions" />
    </div>
  </header>
</template>

<style scoped lang="sass">
@forward '../../../../assets/css/shared/authPage'
</style>
