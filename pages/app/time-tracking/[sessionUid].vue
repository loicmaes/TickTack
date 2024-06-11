<script setup lang="ts">
import {useRoute} from "#imports";
import type {IWorkSession} from "~/types/timeTracking/IWorkSession";
import {useWorkSession} from "~/composables/useTimeTracking";
import PageHeader from "~/components/layout/app/page/pageHeader.vue";

definePageMeta({
  layout: 'app-base'
});
useHead({
  title: `TickTack · Viewer`
});

const { params } = useRoute();
const uid: string = params.sessionUid as string;
const workSession = ref<IWorkSession | null>(await useWorkSession(uid));
</script>

<template>
  <main data-page="workSessionViewer" class="page workSession">
    <PageHeader :name="workSession?.name">

    </PageHeader>
  </main>
</template>

<style scoped lang="sass">
@forward '../../../assets/css/shared/authPage'
</style>
