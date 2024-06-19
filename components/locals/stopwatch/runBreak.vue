<script setup lang="ts">
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem} from "~/components/ui/dropdown-menu";
import {Trash, EditPencil, MoreVert} from "@iconoir/vue";
import {getTimeFormatted} from "assets/scripts/time";

interface BreakProps {
  index: number;
  label?: string;
  relativeTimeElapsed: number;
  absoluteTimeElapsed: number;
}
const { absoluteTimeElapsed, relativeTimeElapsed } = defineProps<BreakProps>();
defineEmits(['delete']);

const time = getTimeFormatted(absoluteTimeElapsed);
const delay = getTimeFormatted(relativeTimeElapsed);
</script>

<template>
  <div class="break">
    <p class="break--label">{{ label ?? `Break ${index + 1}` }}</p>
    <span class="break--delay">({{ delay.hours }}:{{ delay.minutes }}:{{ delay.seconds }} {{ delay.milliseconds }}ms)</span>
    <span class="break--time">{{ time.hours }}:{{ time.minutes }}:{{ time.seconds }} {{ time.milliseconds }}ms</span>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button type="button" variant="ghost"><MoreVert class="h-5 w-5" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem class="break--item">
            <EditPencil class="break--icon" />
            <span>Rename</span>
          </DropdownMenuItem>
          <DropdownMenuItem class="break--item" @click="$emit('delete', index)">
            <Trash class="break--icon" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<style scoped lang="sass">
.break
  @apply flex items-center gap-8

  &--item
    @apply cursor-pointer

  &--time
    @apply block -mr-4

  &--delay
    @apply block ml-auto text-stone-400 dark:text-stone-600

  &--icon
    @apply h-4 w-4 mr-2
</style>
