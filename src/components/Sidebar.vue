<template>
  <div
    class="fixed inset-y-0 left-0 z-10 w-64 transform bg-white shadow-lg transition-transform duration-300 md:translate-x-0"
    :class="{ '-translate-x-full': !sidebarOpen, 'translate-x-0': sidebarOpen }">
    <div class="flex h-16 items-center justify-between border-b px-4 border-gray-200">
      <h1 class="text-xl font-bold text-gray-800">JobTracker</h1>
    </div>
    <nav class="mt-4 px-2">
      <router-link to="/" class="mb-1 flex items-center rounded-lg px-4 py-2" active-class="bg-primary/10 text-primary">
        <ChartArea class="mr-3 h-5 w-5" />
        <span>Stats</span>
      </router-link>
      <router-link to="/list" class="mb-1 flex items-center rounded-lg px-4 py-2"
        active-class="bg-primary/10 text-primary">
        <LayoutList class="mr-3 h-5 w-5" />
        <span>Applications</span>
      </router-link>
      <router-link to="/board" class="mb-1 flex items-center rounded-lg px-4 py-2"
        active-class="bg-primary/10 text-primary">
        <layout-dashboard class="mr-3 h-5 w-5" />
        <span>Jobs board</span>
      </router-link>
    </nav>
  </div>
</template>
<script setup>
import {
  LayoutDashboard,LayoutList,ChartArea
} from 'lucide-vue-next';

import { sidebarOpen } from '../stores/sidebarState.js'




</script>