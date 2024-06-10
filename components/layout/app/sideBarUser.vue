<script setup lang="ts">
import {
    Avatar,
    AvatarFallback,
    Button,
    DropdownMenu,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "#components";
import {localLogout, useState} from "#imports";
import {type IUser} from "~/types/IUser";
import {LogOut, Settings, User} from "@iconoir/vue";

const user = useState<IUser>('user').value;
const initials = computed(_ => `${user.firstName.substring(0, 1)}${user.lastName.substring(0, 1)}`);
const colorMode = useColorMode();

async function logout () {
  await localLogout();
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="ghost" class="user__trigger">
        <Avatar>
          <AvatarFallback>{{ initials }}</AvatarFallback>
        </Avatar>
        <div class="user__trigger__user">
          <p class="user__trigger__user--name">{{ user.firstName }} {{ user.lastName }}</p>
          <span class="user__trigger__user--email">{{ user.premium ? 'Pro' : 'Freemium' }}</span>
        </div>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="min-w-44">
      <DropdownMenuLabel>
        {{ user.firstName }} {{ user.lastName }}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem class="user__item">
          <User class="user__item--icon" />
          <span>My Profile</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem class="user__item">
          <Settings class="user__item--icon" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem class="user__item" @click="logout">
          <LogOut class="user__item--icon" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped lang="sass">
.user
  &__trigger
    @apply h-min w-full flex items-center justify-start text-left gap-3 pl-2 pr-5 py-3

    &__user
      &--email
        @apply font-light text-stone-400 dark:text-stone-600

  &__item
    @apply cursor-pointer

    &--icon
      @apply h-4 w-4 mr-2
</style>
