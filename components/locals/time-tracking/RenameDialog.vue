<script setup lang="ts">
import {Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter} from "#components";
import {FloppyDisk} from "@iconoir/vue";
import type {IWorkSession} from "~/types/timeTracking/IWorkSession";
import {renameWorkSession} from "~/composables/useTimeTracking";

const emit = defineEmits(['renamed', 'state-change']);
const { renaming, session } = defineProps<{
  renaming: boolean,
  session: IWorkSession,
}>();

const newName = ref<string>(session.name);
const canSubmit = computed((): boolean => newName.value !== session.name && /^[\w ._|\-!?,;:=&@é"'(§èçà)òùñ]{4,}$/g.test(newName.value));
async function rename () {
  emit('renamed', await renameWorkSession(session.uid as string, newName.value));
}
</script>

<template>
  <Dialog :open="renaming" @update:open="$emit('state-change', $event)">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Rename</DialogTitle>
        <DialogDescription>Set a proper name to help you to recognize it easily when you're searching for something...</DialogDescription>
      </DialogHeader>

      <div>
        <Label for="rename">Name</Label>
        <Input id="rename" v-model="newName" />
      </div>

      <DialogFooter>
        <DialogClose as-child>
          <Button :disabled="!canSubmit" @click="rename">
            <FloppyDisk class="h-4 w-4 mr-2" />
            <span>Save changes</span>
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped lang="sass">

</style>
