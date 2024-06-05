import {defineNuxtRouteMiddleware, useState} from "#imports";
import type {IUser} from "~/types/IUser";

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState<IUser>('user').value;
  if (!user) return navigateTo('/auth/login');
})
