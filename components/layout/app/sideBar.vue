<script setup lang="ts">
import {TaskList, ListSelect, Timer, Alarm, GraphUp} from "@iconoir/vue";
import SideBarLabel from "~/components/layout/app/sideBarLabel.vue";
import SideBarLink from "~/components/layout/app/sideBarLink.vue";
import Logo from "~/components/logo.vue";
import SideBarUser from "~/components/layout/app/sideBarUser.vue";
</script>

<template>
  <aside class="sidebar">
    <header class="sidebar__head">
      <Logo class="sidebar__head--logo" />
      <p class="sidebar__head--title">Tick Tack</p>
    </header>

    <div class="sidebar--wrapper">
      <section data-section="productivity">
        <SideBarLabel>Productivity</SideBarLabel>

        <SideBarLink data-section-item>
          <template #icon><ListSelect data-section-item-icon /></template>
          <template #content>Today task</template>
        </SideBarLink>
        <SideBarLink data-section-item>
          <template #icon><GraphUp data-section-item-icon /></template>
          <template #content>Time track</template>
        </SideBarLink>
      </section>
      <section data-section="features">
        <SideBarLabel>Features</SideBarLabel>

        <SideBarLink data-section-item to="/app/stopwatch">
          <template #icon><Alarm data-section-item-icon /></template>
          <template #content>Stopwatch</template>
        </SideBarLink>
        <SideBarLink data-section-item>
          <template #icon><Timer data-section-item-icon /></template>
          <template #content>Timer</template>
        </SideBarLink>
      </section>
      <section data-section="methodology">
        <SideBarLabel>Methodology</SideBarLabel>

        <SideBarLink data-section-item>
          <template #icon><TaskList data-section-item-icon /></template>
          <template #content>Pomodoro</template>
        </SideBarLink>
      </section>
      <!-- <section data-section="history"></section> -->
    </div>

    <footer class="sidebar__foot">
      <SideBarUser />
    </footer>
  </aside>
</template>

<style scoped lang="sass">
.sidebar
  @apply min-w-56 max-w-80 flex flex-col border-r-2 border-stone-100 dark:border-stone-900

  &__head
    @apply flex py-8 px-7 mb-4

    &--logo
      @apply mr-2

    &--title
      @apply font-extrabold

  &--wrapper
    @apply flex flex-col gap-8 flex-1

  &--separator
    @apply mx-2 rounded-full border-[1px] border-stone-100 dark:border-stone-900

  section[data-section]
    @apply flex flex-col

    [data-section-item]
      @apply justify-start mx-4

      [data-section-item-icon]
        @apply h-5 w-5 mr-2

  &__foot
    @apply flex flex-col gap-4 p-3
</style>
