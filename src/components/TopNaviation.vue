<template>
  <header
    class="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">
    <button @click="toggleSidebar" class="rounded p-1 hover:bg-gray-100 md:hidden cursor-pointer">
      <Menu class="h-6 w-6 text-gray-500" />
    </button>
    <div class="ml-auto flex items-center space-x-4">
      <Bell class="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700" />
      <div class="relative">
        <div class="flex cursor-pointer items-center space-x-2" @click="profileOpen = !profileOpen">
          <span class="hidden text-sm font-medium text-gray-700 md:block">Jane Doe</span>
          <img src="https://randomuser.me/api/portraits/women/42.jpg" alt="Profile"
            class="h-8 w-8 rounded-full border border-gray-200" />
          <chevron-down class="h-4 w-4 text-gray-500" />
        </div>
        <div v-if="profileOpen"
          class="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import {
  Menu,Bell,ChevronDown,
} from 'lucide-vue-next';

import { sidebarOpen } from '../stores/sidebarState.js'

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>