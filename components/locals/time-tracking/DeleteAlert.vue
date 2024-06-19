<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent
} from "#components";
import {Button} from "~/components/ui/button";
import type {IWorkSession} from "~/types/timeTracking/IWorkSession";
import {deleteWorkSession} from "~/composables/useTimeTracking";

const emit = defineEmits(['deleted', 'state-updated']);
const { deleting, session } = defineProps<{
  deleting: boolean;
  session: IWorkSession;
}>();
async function confirmDelete () {
  emit('deleted', await deleteWorkSession(session.uid as string));
}
</script>

<template>
  <AlertDialog :open="deleting" @update:open="$emit('state-updated', $event)">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>This action is definitive.</AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>No, cancel</AlertDialogCancel>
        <AlertDialogAction @click="confirmDelete">Yes, delete it</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<style scoped lang="sass">

</style>
