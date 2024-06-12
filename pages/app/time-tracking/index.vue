<script setup lang="ts">
import {
    Button,
    Input,
    Label,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
    SheetHeader,
    SheetFooter,
    SheetClose,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    Separator,
    DonutChart
} from "#components";
import type {IUser} from "~/types/IUser";
import {Plus, FastArrowRight} from "@iconoir/vue";
import {useStrictProtectedAccess} from "~/composables/useAuth";
import PageHeader from "~/components/layout/app/page/pageHeader.vue";
import PageContent from "~/components/layout/app/page/pageContent.vue";
import type {IWorkSession} from "~/types/timeTracking/IWorkSession";
import {useWorkHistory} from "~/composables/useTimeTracking";

await useStrictProtectedAccess(true);

definePageMeta({
  layout: 'app-base',
});
useHead({
  title: 'TickTack · Time tracking',
});

const user = useState<IUser>('user').value;
const length = ref<number>(3);
const premium = computed((): boolean => user?.premium || length.value < 4);

const sessionName = ref<string | undefined>();
const canSubmit = computed((): boolean => /^[\w ._|\-!?,;:=&@é"'(§èçà)òùñ]{4,}$/g.test(sessionName.value ?? ''));
const history = ref<IWorkSession[]>(await useWorkHistory());

async function submit () {
  if (!sessionName.value) return;
  await startSession(sessionName.value);
}
</script>

<template>
  <main data-page="timeTracking" class="page timeTracking">
    <PageHeader name="Time Track" has-premium-feature :premium="premium">
      <template #actions>
        <Sheet>
          <SheetTrigger as-child>
            <Button>
              <Plus class="w-4 h-4 mr-2" />
              <span>New session</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>New session</SheetTitle>
              <SheetDescription>Don't waste another second and track your working time precisely.</SheetDescription>
            </SheetHeader>

            <div class="w-full my-8">
              <Label for="name">Name</Label>
              <Input class="mt-2" id="name" v-model="sessionName" placeholder="Type something..." />
              {{ sessionName }}
            </div>

            <SheetFooter>
              <SheetClose as-child>
                <Button :disabled="!canSubmit" type="submit" @click="submit">
                  <span>Continue</span>
                  <FastArrowRight class="h-4 w-4 ml-2" />
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </template>
    </PageHeader>

    <PageContent grid="default">
      <Card class="flex flex-col">
        <CardHeader>
          <CardTitle>Resume</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent class="flex-1 grid place-items-center py-0">
          <DonutChart v-if="history?.length"
            :data="history"
            index="name"
            category="elapsed"
            type="pie"
          />
        </CardContent>
      </Card>

      <Card class="col-start-1">
        <CardHeader>
          <CardTitle>Active sessions</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent></CardContent>
      </Card>

      <Card class="col-start-2 col-span-2 row-start-1 row-span-2">
        <CardHeader>
          <CardTitle>Previous sessions</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent class="flex flex-col gap-5">
          <NuxtLink :to="`/app/time-tracking/${session.uid}`" v-for="session in history" :key="session.name">
            {{ session.name }}
          </NuxtLink>
        </CardContent>
      </Card>
    </PageContent>
  </main>
</template>

<style scoped lang="sass">
@forward '../../../assets/css/shared/authPage'
</style>
