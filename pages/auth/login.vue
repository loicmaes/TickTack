<script setup lang="ts">
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import {FormControl, FormField, FormItem, FormLabel} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {ArrowLeft} from "@iconoir/vue";
import {useHead} from "#imports";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useForm} from "vee-validate";
import {loginWithEmail, useStrictProtectedAccess} from "~/composables/useAuth";

definePageMeta({
  layout: 'auth'
});

useHead({
  title: 'TickTack · Connection'
});

await useStrictProtectedAccess();

const schema = toTypedSchema(z.object({
  email: z.string().email().min(1),
  password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).min(1),
}));
const { handleSubmit } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit(async ({ email, password }) => await loginWithEmail(email, password));
</script>

<template>
  <Card data-page="login" class="auth login">
    <CardHeader>
      <Button class="auth--back login--back" variant="ghost" type="button" @click="$router.back()">
        <ArrowLeft class=" w-4 h-4 mr-2" /> Back
      </Button>
      <CardTitle class="auth--title login--title">Login</CardTitle>
    </CardHeader>
    <CardContent>
      <form class="auth__form login__form" @submit="onSubmit">
        <FormField name="email" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Email Address</FormLabel>
            <FormControl>
              <Input v-bind="componentField" type="email" placeholder="Ex: john.doe@example.xyz" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField name="password" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input v-bind="componentField" type="password" placeholder="Enter your secret pass" />
            </FormControl>
          </FormItem>
        </FormField>

        <Button type="submit" class="auth__form--submit login__form--submit">Take me into it</Button>
      </form>
    </CardContent>
    <CardFooter class="auth--footer login--footer">
      <Button variant="link" as-child>
        <NuxtLink to="/auth/register">I don't have an account!</NuxtLink>
      </Button>
    </CardFooter>
  </Card>
</template>

<style scoped lang="sass">
@forward '../../assets/css/shared/auth'

.login
  @apply max-w-80 sm:max-w-96 mx-auto
</style>
