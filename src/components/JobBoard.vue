<template>
  <div class="max-w-7xl mx-auto">
    <div class="mb-6 flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-sm">
      <div class="relative w-full sm:w-64 mb-4 sm:mb-0">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input v-model="searchQuery" type="text" placeholder="Search jobs..." data-test="search-input"
          class="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <JobColumn v-for="stage in jobStore.stages" :key="stage" :stage="stage" :jobs="filteredJobs(stage)"
        @job-dropped="handleJobDropped" />
    </div>

    <div class="fixed bottom-6 right-6">
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center cursor-pointer"
        @click="showJobFormModal = true">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  </div>
  <JobFormModal :visible="showJobFormModal" @close="showJobFormModal = false" @submit="handleJobFormSubmit" />
</template>

<script setup>
import JobColumn from './JobColumn.vue';
import JobFormModal from './JobFormModal.vue';

import { useJobStore } from '@/stores/jobStore';
import { ref } from 'vue';

const jobStore = useJobStore();
const showJobFormModal = ref(false);
const searchQuery = ref('');



const handleJobDropped = ({ jobId,newStage }) => {
  jobStore.moveJob(jobId,newStage);
};

const handleJobFormSubmit = (jobData) => {
  jobStore.addJob(jobData);
};

const filteredJobs = (stage) => {
  const jobs = jobStore.jobsByStage(stage);
  if (!searchQuery.value.trim()) return jobs;
  const lowerQuery = searchQuery.value.toLowerCase();
  return jobs.filter((job) =>
    job.jobTitle.toLowerCase().includes(lowerQuery) ||
    job.company.toLowerCase().includes(lowerQuery)
  );
};

</script>

<style scoped></style>
