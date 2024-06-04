<script setup lang="ts">
import {FormField, FormItem, FormLabel, FormControl} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import {ArrowLeft} from "@iconoir/vue";

definePageMeta({
  layout: 'auth',
});
</script>

<template>
  <Card data-page="register" class="auth register">
    <CardHeader>
      <Button class="auth--back register--back" variant="ghost" type="button" @click="$router.back()">
        <ArrowLeft class=" w-4 h-4 mr-2" /> Back
      </Button>
      <CardTitle class="auth--title register--title">Register</CardTitle>
    </CardHeader>
    <CardContent>
      <form class="auth__form register__form">
        <div class="auth__form--line">
          <FormField name="firstName" v-slot="{ componentField }">
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input v-bind="componentField" placeholder="Ex: John" />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField name="lastName" v-slot="{ componentField }">
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input v-bind="componentField" placeholder="Ex: DOE" />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
        <div class="auth__form--line">
          <FormField name="email" v-slot="{ componentField }">
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input v-bind="componentField" placeholder="Ex: john.doe@example.xyz" />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField name="password" v-slot="{ componentField }">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input v-bind="componentField" placeholder="Ex: ••••••••••••••" />
              </FormControl>
            </FormItem>
          </FormField>
        </div>

        <Button type="submit" class="auth__form--submit register__form--submit">Create my account</Button>
      </form>
    </CardContent>
    <CardFooter class="auth--footer register--footer">
      <Button variant="link" as-child>
        <NuxtLink to="/auth/login">I already have an account!</NuxtLink>
      </Button>
    </CardFooter>
  </Card>
</template>

<style scoped lang="sass">
@forward "../../assets/css/shared/auth"
</style>
