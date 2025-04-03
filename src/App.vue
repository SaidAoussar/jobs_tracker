<script setup>
import { RouterLink,RouterView } from 'vue-router'
import Sidebar from "@/components/Sidebar.vue"
import TopNaviation from "@/components/TopNaviation.vue"
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Sidebar />
    <div class="md:pl-64">
      <TopNaviation />

      <main class="p-4 md:p-6">
        <RouterView />
      </main>
    </div>
  </div>

</template>

<style scoped></style>
