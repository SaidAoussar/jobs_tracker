<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div class="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-white shadow-xl">
      <div class="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
        <div class="flex items-center">
          <div class="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-600">T
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900"></h3>{{ job.jobTitle }}
            <p class="text-sm text-gray-600">{{ job.company }}</p>
          </div>
        </div>
        <button class="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer" @click="close">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto px-6 py-4">
        <div class="mb-6 flex flex-wrap items-center gap-4">
          <span class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"> {{ job.stage }} </span>
          <div class="flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Applied on {{ formatDate(job.appliedDate) }}
          </div>
        </div>

        <div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="flex items-start">
            <div class="mr-3 rounded-md bg-gray-100 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h4 class="mb-1 text-sm font-medium text-gray-700">Location</h4>
              <p class="text-sm text-gray-600">{{ job.location }}</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="mr-3 rounded-md bg-gray-100 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 class="mb-1 text-sm font-medium text-gray-700">Salary Range</h4>
              <p class="text-sm text-gray-600">{{ job.salaryRange }}</p>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <h4 class="mb-2 text-sm font-medium text-gray-700">Tech Stack</h4>
          <div class="flex flex-wrap gap-2">
            <span v-for="(tech, index) in job.techStack" :key="index"
              class="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700">{{ tech }}</span>
          </div>
        </div>

        <div class="mb-6">
          <h4 class="mb-2 text-sm font-medium text-gray-700">Notes</h4>
          <div class="rounded border-l-4 border-yellow-400 bg-yellow-50 p-4">
            <p class="text-sm text-gray-700">{{ job.notes }}</p>
          </div>
        </div>

        <div class="mb-6">
          <h4 class="mb-2 text-sm font-medium text-gray-700">Job Posting</h4>
          <a :href="job.jobPostingURL" target="_blank"
            class="flex items-center text-sm text-blue-600 hover:text-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View on LinkedIn
          </a>
        </div>

      </div>
      <div class="flex justify-between border-t border-gray-100 bg-gray-50 px-6 py-4">
        <div class="space-x-2">
          <button
            class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none cursor-pointer"
            @click="close">Close</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { formatDate } from '@/utils/formatDate';
const props = defineProps(["visible","job"])

const emit = defineEmits(['close']);
const close = () => emit('close');
</script>