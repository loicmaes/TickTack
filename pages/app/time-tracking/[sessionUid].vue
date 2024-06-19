<script setup lang="ts">
import {useRoute} from "#imports";
import type {IWorkSession} from "~/types/timeTracking/IWorkSession";
import {useWorkSession} from "~/composables/useTimeTracking";
import PageHeader from "~/components/layout/app/page/pageHeader.vue";
import {
    Button,
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    Card,
    CardContent,
    Separator
} from "#components";
import RenameDialog from "~/components/locals/time-tracking/RenameDialog.vue";
import DeleteAlert from "~/components/locals/time-tracking/DeleteAlert.vue";
import {
    SecurityPass,
    MoreVert,
    EditPencil,
    Trash,
    Pause,
    Play,
    Plus,
} from "@iconoir/vue";
import PageContent from "~/components/layout/app/page/pageContent.vue";
import {type FormattedTime, getTimeFormatted} from "assets/scripts/time";
import {stopWorkSession, useLastStep} from "~/composables/useTimeTracking";
import type {IWorkSessionStep} from "~/types/timeTracking/IWorkSessionStep";

definePageMeta({
  layout: 'app-base'
});
useHead({
  title: `TickTack · Viewer`
});

const { params } = useRoute();
const uid: string = params.sessionUid as string;
const workSession = ref<IWorkSession | null>(await useWorkSession(uid));
const lastStep = ref<IWorkSessionStep | null>(await useLastStep(uid));

const sessionElapsed = ref<number>(workSession.value ? Date.now() - new Date(workSession.value.start).getTime() : 0);
const stepElapsed = ref<number>(lastStep.value ? Date.now() - new Date(lastStep.value.start).getTime() : 0);
const totalElapsed = computed((): FormattedTime => getTimeFormatted(sessionElapsed.value));
const localElapsed = computed((): FormattedTime => getTimeFormatted(stepElapsed.value));

const interval = ref();
onNuxtReady(() => interval.value = setInterval(() => {
  if (!workSession.value || !stepElapsed.value) return;
  sessionElapsed.value = Date.now() - new Date(workSession.value.start).getTime();
  stepElapsed.value = lastStep.value ? Date.now() - new Date(lastStep.value.start).getTime() : 0;
}, 500));

const renaming = ref<boolean>(false);
const deleting = ref<boolean>(false);
function handleRename (session: IWorkSession) {
  workSession.value = session;
}
function handleDelete () {
  navigateTo('/app/time-tracking');
}

onBeforeUnmount(() => {
  clearInterval(interval.value);
});
</script>

<template>
  <main data-page="workSessionViewer" class="page workSession" :key="`wsv-${workSession.uid}`" v-if="workSession">
    <PageHeader :name="workSession.name">
      <template #actions>
        <AlertDialog>
          <AlertDialogTrigger as-child>
            <Button type="button" variant="ghost">
              <SecurityPass class="h-4 w-4 mr-2" />
              <span>Terminate session</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you done?</AlertDialogTitle>
              <AlertDialogDescription>Is all your work done? This action is definitive. Take a time to be sure of what you're doing 👍</AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>No, continue working</AlertDialogCancel>
              <AlertDialogAction>Yes, terminate my session</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button type="button" variant="outline" class="px-3">
              <MoreVert class="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem class="item" @click.stop="renaming = true">
                <EditPencil class="item--icon" />
                <span>Rename</span>
              </DropdownMenuItem>
              <DropdownMenuItem class="item" @click.stop="deleting = true">
                <Trash class="item--icon" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <!-- dialogs -->
        <RenameDialog :renaming="renaming" :session="workSession" @state-change="renaming = $event" @renamed="handleRename" :key="`rn-${workSession.name}`" />
        <DeleteAlert :deleting="deleting" :session="workSession" @state-updated="deleting = $event" @deleted="handleDelete" :key="`dl-${workSession.name}`" />
      </template>
    </PageHeader>

    <PageContent>
      <Card class="controls">
        <CardContent class="controls--content">
          <div class="controls--info">
            <p class="controls--title">{{ lastStep.stepType === 'working' ? 'Working since' : 'Taking a nap since' }}</p>
            <p class="controls--value">{{ localElapsed.hours }}h {{ localElapsed.minutes }}min {{ localElapsed.seconds }}s</p>
            <p class="controls--subtitle">Total time: {{ totalElapsed.hours }}h {{ totalElapsed.minutes }}min {{ totalElapsed.seconds }}s</p>
          </div>
          <div class="controls--actions">
            <Button type="button" variant="outline" v-if="lastStep && lastStep.stepType === 'working'" @click.stop="requestANap">
              <Pause class="controls__action--icon" />
              <span>Take a break</span>
            </Button>
            <Button type="button" variant="outline" v-else-if="lastStep && lastStep.stepType === 'break'" @click.stop="requestToWork">
              <Play class="controls__action--icon" />
              <span>Back to work</span>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger as-child>
                <Button type="button" variant="outline">
                  <Plus class="controls__action--icon" />
                  <span>New step</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Be careful 👀</AlertDialogTitle>
                  <AlertDialogDescription>This action will stop the current step. Are you sure you wanna do that?</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No, continue this step</AlertDialogCancel>
                  <AlertDialogAction @click.stop="requestNewStep">Yes, start a new step</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button type="button" variant="secondary" v-if="lastStep.status === 'In Progress'" @click.stop="requestTerminateStep">
              <SecurityPass class="controls__action--icon" />
              <span>Terminate step</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageContent>
  </main>
</template>

<style scoped lang="sass">
@forward '../../../assets/css/shared/authPage'

.item
  @apply cursor-pointer

  &--icon
    @apply h-4 w-4 mr-2

.controls
  &--content
    @apply p-6 flex flex-col gap-8

  &--info
    @apply flex flex-col gap-2 items-center

  &--actions
    @apply flex gap-2 items-center justify-center

  &__action
    &--icon
      @apply h-4 w-4 mr-2

  &--title
    @apply text-stone-400 dark:text-stone-600

  &--value
    @apply text-5xl font-bold

  &--subtitle
    @apply mt-4 text-sm text-stone-300 dark:text-stone-700
</style>
