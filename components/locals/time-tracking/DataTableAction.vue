<script setup lang="ts">
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuGroup,
    DropdownMenuTrigger,
    DropdownMenuItem,
    Button,
    Separator
} from "#components";
import { MoreHoriz, Trash, Edit, SecurityPass, Play, Pause, Eye } from "@iconoir/vue";
import type {IWorkSession} from "~/types/timeTracking/IWorkSession";
import type {IWorkSessionStep} from "~/types/timeTracking/IWorkSessionStep";
import RenameDialog from "~/components/locals/time-tracking/RenameDialog.vue";
defineEmits(['session-renamed', 'session-deleted']);

const { session } = defineProps<{
  session: IWorkSession,
}>();
const { uid, end, steps, status } = session;
const ended: boolean = status === 'Ended';
const lastStep: IWorkSessionStep | undefined = (steps as IWorkSessionStep[]).findLast(step => step.status === 'In Progress');
const isRenaming = ref<boolean>(false);
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <MoreHoriz class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="min-w-36" :avoid-collisions="true" :collision-padding="{ top: 16, right: 16 }">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <Separator />
      <DropdownMenuGroup>
        <DropdownMenuItem class="item" as-child>
          <NuxtLink :to="`/app/time-tracking/${uid}`">
            <Eye class="item--icon" />
            <span>View details</span>
          </NuxtLink>
        </DropdownMenuItem>
        <DropdownMenuItem class="item" v-if="!ended && lastStep && lastStep.stepType === 'working'">
          <Pause class="item--icon" />
          <span>Take a break</span>
        </DropdownMenuItem>
        <DropdownMenuItem class="item" v-else-if="!ended && lastStep && lastStep.stepType === 'break'">
          <Play class="item--icon" />
          <span>Back to work</span>
        </DropdownMenuItem>
        <DropdownMenuItem class="item" v-if="!end">
          <SecurityPass class="item--icon" />
          <span>Terminate</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <Separator />
      <DropdownMenuGroup>
        <DropdownMenuItem class="item" @click.stop="isRenaming = true">
          <Edit class="item--icon" />
          <span>Rename</span>
        </DropdownMenuItem>
        <DropdownMenuItem class="item">
          <Trash class="item--icon" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
  <RenameDialog :renaming="isRenaming" :session="session" @renamed="$emit('session-renamed', $event)" @state-change="isRenaming = $event" />
</template>

<style scoped lang="sass">
.item
  @apply cursor-pointer

  &--icon
    @apply h-4 w-4 mr-2
</style>
