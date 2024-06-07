<script setup lang="ts">
import User from "~/components/layout/user.vue";
import {DropdownMenuGroup, DropdownMenuItem} from "~/components/ui/dropdown-menu";
import {PasteClipboard} from "@iconoir/vue";

const pageName = useState<string>('page-name');
</script>

<template>
  <header class="top-bar">
    <p>{{ pageName }}</p>

    <User>
      <template #content>
        <DropdownMenuGroup>
          <DropdownMenuItem class="item">
            <PasteClipboard class="icon" />
            <span>My sessions</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </template>
    </User>
  </header>
</template>

<style scoped lang="sass">
.icon
  @apply mr-2 h-4 w-4

.top-bar
  @apply flex justify-end items-center px-8 py-4 border-b-2 border-b-stone-100 dark:border-b-stone-800
</style>
