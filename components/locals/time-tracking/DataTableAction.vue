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

const { session } = defineProps<{
  session: IWorkSession,
}>();
const { uid, end, steps } = session;
const _steps = steps as IWorkSessionStep[];
const lastStep = _steps[_steps.length - 1];
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
        <DropdownMenuItem class="item" v-if="!end && lastStep.type === 'working'">
          <Pause class="item--icon" />
          <span>Take a break</span>
        </DropdownMenuItem>
        <DropdownMenuItem class="item" v-else-if="!end && lastStep.type === 'break'">
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
        <DropdownMenuItem class="item">
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
</template>

<style scoped lang="sass">
.item
  @apply cursor-pointer

  &--icon
    @apply h-4 w-4 mr-2
</style>
