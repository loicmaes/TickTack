<script setup lang="ts">
import {useStrictProtectedAccess} from "~/composables/useAuth";
import PageHeader from "~/components/layout/app/page/pageHeader.vue";
import {Button} from "~/components/ui/button";
import type {IBreak} from "~/types/stopwatch/IBreak";
import {Prohibition, FloppyDisk, Play, Pause, Square, KeyframePlusIn} from "@iconoir/vue";
import {TooltipProvider, Tooltip, TooltipTrigger, TooltipContent} from "~/components/ui/tooltip";
import {Card, CardContent, CardFooter, CardHeader} from "~/components/ui/card";
import {Separator} from "~/components/ui/separator";
import RunBreak from "~/components/locals/stopwatch/runBreak.vue";
import {type FormattedTime, getTimeFormatted} from "assets/scripts/time";

await useStrictProtectedAccess(true);

definePageMeta({
  layout: 'app-base',
});

useHead({
  title: `TickTack · Stop watch`
});

const isCounting = ref<boolean>(false);
const isPaused = ref<boolean>(false);
const timeElapsed = ref<number>(0);
const startedTime = ref<number | null>(null);
const countingInterval = ref();
const breaks = ref<IBreak[]>([]);
const history = ref<any[]>([]);

const formattedElapsed = computed((): FormattedTime => getTimeFormatted(timeElapsed.value));

const estimateElapsedTime = (): number => Date.now() - (startedTime.value ?? 0);

function reset (states?: boolean) {
  if (states) {
    isCounting.value = false;
    isPaused.value = false;
  }

  clearInterval(countingInterval.value);
  countingInterval.value = null;
  timeElapsed.value = 0;
  startedTime.value = null;
  breaks.value = [];
}

function start () {
  reset(true);

  isCounting.value = true;
  startedTime.value = Date.now();
  countingInterval.value = setInterval(_ => {
    if (isPaused.value) return;
    timeElapsed.value = timeElapsed.value + estimateElapsedTime();
    startedTime.value = Date.now();
  }, 1);
}
function stop () {
  clearInterval(countingInterval.value);
  countingInterval.value = null;
  isCounting.value = false;
}
function pause () {
  isPaused.value = true;
}
function resume () {
  isPaused.value = false;
}
function addBreak () {
  if (breaks.value.map(b => b.absoluteTimeElapsed).includes(timeElapsed.value)) return;
  breaks.value = [
      ...breaks.value,
    {
      relativeTimeElapsed: breaks.value.length === 0 ? timeElapsed.value : timeElapsed.value - breaks.value[breaks.value.length - 1].absoluteTimeElapsed,
      absoluteTimeElapsed: timeElapsed.value,
    }
  ];
}
function removeBreak (index: number) {
  breaks.value.splice(index, 1);
}
</script>

<template>
  <main data-page="stopwatch" class="page stopwatch">
    <PageHeader name="Stopwatch" has-premium-feature>
      <template #actions>
        <Button type="button">
          <FloppyDisk class="h-4 w-4 mr-2" />
          <span>Save</span>
        </Button>
      </template>
    </PageHeader>

    <div class="page--renderer stopwatch--grid">
      <Card class="stopwatch__head">
        <CardContent class="stopwatch__head--head">
          <p class="stopwatch__head--counter">
            {{ `${formattedElapsed.hours}:${formattedElapsed.minutes}:${formattedElapsed.seconds}` }}<br>
            <span class="stopwatch__head--counter-ms">{{ formattedElapsed.milliseconds }}ms</span>
          </p>
        </CardContent>

        <CardFooter class="stopwatch__head--foot">
          <TooltipProvider>
            <Tooltip  v-if="isCounting">
              <TooltipTrigger as-child>
                <Button class="stopwatch__head--action" type="button" @click="stop" variant="destructive"><Square /></Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Stop timer</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip v-else>
              <TooltipTrigger as-child>
                <Button class="stopwatch__head--action" type="button" @click="start"><Play /></Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Start timer</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip v-if="isCounting && isPaused">
              <TooltipTrigger as-child>
                <Button class="stopwatch__head--action" type="button" @click="resume"><Play /></Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Resume the stopwatch</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip v-else-if="isCounting && !isPaused">
              <TooltipTrigger as-child>
                <Button class="stopwatch__head--action" type="button" @click="pause" variant="secondary"><Pause /></Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Pause the timer</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip v-if="timeElapsed || isCounting">
              <TooltipTrigger as-child>
                <Button class="stopwatch__head--action" type="button" @click="reset(true)" variant="ghost"><Prohibition /></Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip v-if="isCounting">
              <TooltipTrigger as-child>
                <Button class="stopwatch__head--action" type="button" @click="addBreak" variant="ghost"><KeyframePlusIn /></Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add a break</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>

      <Card class="stopwatch__breaks">
        <CardContent as-child class="stopwatch__breaks--content" v-if="breaks.length">
          <ul class="stopwatch__breaks">
            <li v-for="(b, index) in breaks" :key="`break-${b.id ?? index}`">
              <RunBreak :relative-time-elapsed="b.relativeTimeElapsed" :index="index" :absolute-time-elapsed="b.absoluteTimeElapsed" @delete="removeBreak" />
            </li>
          </ul>
        </CardContent>
        <CardContent class="no-content" v-else>
          <div>
            No breaks for now...
          </div>
        </CardContent>
      </Card>

      <Card class="stopwatch__history">
        <CardHeader>
          <CardTitle>Saved runs</CardTitle>
        </CardHeader>
        <Separator class="w-full" />
        <CardContent class="stopwatch__history--container" v-if="history.length"></CardContent>
        <CardContent class="stopwatch__history--container-no" v-else>
          No runs saved for now...
        </CardContent>
      </Card>
    </div>
  </main>
</template>

<style scoped lang="sass">
@forward '../../assets/css/shared/authPage'

.stopwatch
  @apply h-full

  &--grid
    @apply grid grid-rows-[auto_1fr] grid-cols-3 gap-6

  &__head
    @apply pt-12 pb-6 col-span-3

    &--head
      @apply flex justify-center

    &--action
      @apply px-3

    &--counter
      @apply font-black text-7xl text-center

      &-ms
        @apply block text-2xl font-normal text-stone-400 dark:text-stone-600

    &--foot
      @apply flex justify-center gap-3

  &__breaks
    @apply col-span-2 overflow-auto

    &--content
      @apply py-3

  &__history
    @apply flex flex-col

    &--container
      @apply py-6 overflow-y-auto

      &-no
        @apply py-6 text-stone-300 dark:text-stone-700

.no-content
  @apply w-full h-full flex flex-col items-center justify-center gap-2 text-stone-300 dark:text-stone-700
</style>
