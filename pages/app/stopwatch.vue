<script setup lang="ts">
import {useStrictProtectedAccess} from "~/composables/useAuth";
import PageHeader from "~/components/layout/app/page/pageHeader.vue";
import {Button} from "~/components/ui/button";

await useStrictProtectedAccess(true);

definePageMeta({
  layout: 'app-base',
});

enum TimeBase {
  HOUR = 1000 * 60 * 60,
  MINUTE = 1000 * 60,
  SECOND = 1000
}
interface FormattedTime {
  hours: string;
  minutes: string;
  seconds: string;
  milliseconds: string;
}

const isCounting = ref<boolean>(false);
const isPaused = ref<boolean>(false);
const timeElapsed = ref<number>(0);
const startedTime = ref<number | null>(null);
const countingInterval = ref();

const formattedElapsed = computed((): FormattedTime => {
  const h = Math.floor(timeElapsed.value / TimeBase.HOUR);
  const m = Math.floor((timeElapsed.value % TimeBase.HOUR) / TimeBase.MINUTE);
  const s = Math.floor((timeElapsed.value % TimeBase.MINUTE) / TimeBase.SECOND);
  const ms = Math.floor(timeElapsed.value % TimeBase.SECOND);

  return {
    hours: `${h < 10 ? '0' : ''}${h}`,
    minutes: `${m < 10 ? '0' : ''}${m}`,
    seconds: `${s < 10 ? '0' : ''}${s}`,
    milliseconds: `${ms < 100 ? (ms < 10 ? '00' : '0') : ''}${ms}`,
  }
});

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
}

function start () {
  reset();

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
</script>

<template>
  <main data-page="stopwatch" class="page stopwatch">
    <PageHeader name="Stopwatch" has-premium-feature />

    <div class="page--renderer">
      <p class="stopwatch__counter">{{ `${formattedElapsed.hours}:${formattedElapsed.minutes}:${formattedElapsed.seconds} ${formattedElapsed.milliseconds}ms` }}</p>

      <Button type="button" variant="destructive" @click="stop" v-if="isCounting">Stop</Button>
      <Button type="button" @click="start" v-else>Start</Button>

      <Button type="button" variant="secondary" @click="resume" v-if="isPaused && isCounting">Resume</Button>
      <Button type="button" variant="secondary" @click="pause" v-else-if="isCounting">Pause</Button>

      <Button type="button" variant="ghost" @click="reset(true)" v-if="startedTime && (!isCounting || isPaused)">Reset</Button>
    </div>
  </main>
</template>

<style scoped lang="sass">
@forward '../../assets/css/shared/authPage'
</style>
