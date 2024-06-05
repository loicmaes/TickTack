<script setup lang="ts">
import {useState} from "#imports";
import {type IUser} from "~/types/IUser";
import {useHead} from "#imports";
import {Button} from "~/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "~/components/ui/alert-dialog";
import {localLogout, generalLogout} from "~/composables/useAuth";

definePageMeta({
  middleware: 'is-authenticated',
});

useHead({
  title: 'TickTack · Home'
});

const user = useState<IUser>('user').value;

async function logoutFromHere () {
  await localLogout();
}
async function logoutFromEverywhere () {
  await generalLogout();
}
</script>

<template>
  <div class="flex flex-col gap-3 items-start">
    <p>Hello {{ user.firstName }} {{ user.lastName }}</p>
    <hr class="border-[1px] border-stone-100 dark:border-stone-800 w-full" />

    <Button variant="secondary" type="button" @click="logoutFromHere">Logout</Button>
    <AlertDialog>
      <AlertDialogTrigger as-child>
        <Button variant="destructive" type="button">Logout everywhere</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You're about to close your session. Is it what you really wanna do?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction @click="logoutFromEverywhere">Yes, logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<style scoped lang="sass">

</style>
