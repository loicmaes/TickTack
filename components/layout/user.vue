<script setup lang="ts">
import {useState} from "#imports";
import type {IUser} from "~/types/IUser";
import {Button} from "~/components/ui/button";
import {
  ColorFilter,
  Settings,
  LogOut,
  Dashboard,
  HalfMoon,
  SunLight
} from "@iconoir/vue";
import {localLogout} from "~/composables/useAuth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "~/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";

const user = ref<IUser | null>(useState<IUser>('user').value);
const initials = computed(_ => user.value ? `${user.value.firstName.substring(0, 1)}${user.value.lastName.substring(0, 1)}`.toUpperCase() : null);

const colorMode = useColorMode();
const theme = computed(_ => {
  switch (colorMode.preference) {
    case 'system':
      return window?.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
    default:
      return colorMode.preference;
  }
})
const logout = async _ => {
  await localLogout();
  user.value = null;
}
</script>

<template>
  <DropdownMenu v-if="user">
    <DropdownMenuTrigger>
      <Avatar>
        <AvatarFallback>{{ initials }}</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="min-w-44">
      <DropdownMenuLabel>{{ user.firstName }} {{ user.lastName }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem class="item" as-child>
          <NuxtLink to="/app">
            <Dashboard class="icon" />
            <span>Dashboard</span>
          </NuxtLink>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger class="item">
            <ColorFilter class="icon" />
            <span>Appearance</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup v-model="colorMode.preference">
                <DropdownMenuRadioItem class="item" value="light">Light</DropdownMenuRadioItem>
                <DropdownMenuRadioItem class="item" value="dark">Dark</DropdownMenuRadioItem>
                <DropdownMenuRadioItem class="item" value="system">System</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem class="item" as-child>
          <NuxtLink to="/">
            <Settings class="icon" />
            <span>Settings</span>
          </NuxtLink>
        </DropdownMenuItem>
        <DropdownMenuItem class="item" @click="logout">
          <LogOut class="icon" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
  <div class="account" v-else>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ClientOnly>
          <HalfMoon v-if="theme === 'dark'" />
          <SunLight v-else-if="theme === 'light'" />
        </ClientOnly>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup v-model="colorMode.preference">
          <DropdownMenuRadioItem class="item" value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem class="item" value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem class="item" value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    <Button as-child>
      <NuxtLink to="/auth/login">Join now!</NuxtLink>
    </Button>
  </div>
</template>

<style scoped lang="sass">
.icon
  @apply w-4 h-4 mr-2

.item
  @apply cursor-pointer

.account
  @apply flex items-center gap-4
</style>
