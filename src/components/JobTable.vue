<template>
  <div class="container mx-auto px-4 py-6">
    <JobFilterBar v-model:job="searchJob" v-model:stage="selectedStage" />
    <div class="overflow-x-auto rounded-lg border border-gray-200 shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Company</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Job
              Title</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Location</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Applied Date</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="job in jobStore.filterJobs(searchJob, selectedStage)" class="hover:bg-gray-50">
            <td class="whitespace-nowrap px-4 py-3">{{ job.company }}</td>
            <td class="whitespace-nowrap px-4 py-3">{{ job.jobTitle }}</td>
            <td class="whitespace-nowrap px-4 py-3">{{ job.location }}</td>
            <td class="whitespace-nowrap px-4 py-3">{{ job.appliedDate }}</td>
            <td class="whitespace-nowrap px-4 py-3">
              <div class="flex space-x-1">
                <button @click="viewDetails(job)"
                  class="rounded bg-emerald-100 p-1 text-emerald-600 hover:bg-emerald-200 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" fill="none" stroke="currentColor" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      fill="none" stroke="currentColor" />
                  </svg>
                </button>
                <button @click="openJobFormModal(job)"
                  class="rounded bg-blue-100 p-1 text-blue-600 hover:bg-blue-200 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button class="rounded bg-red-100 p-1 text-red-600 hover:bg-red-200 cursor-pointer"
                  @click="jobStore.removeJob(job.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
  <JobFormModal :visible="showJobFormModal" :job="updatedJob" @close="showJobFormModal = false"
    @submit="handleJobSubmit" />
  <JobDetailsModal :visible="showDetails" :job="selectedJob" @close="showDetails = false" />
</template>
<script setup>
import { ref } from 'vue';
import { useJobStore } from '@/stores/jobStore';
import JobFilterBar from '@/components/JobFilterBar.vue'
import JobFormModal from '@/components/JobFormModal.vue';
import JobDetailsModal from '@/components/JobDetailsModal.vue';

const jobStore = useJobStore();
const searchJob = ref('');
const selectedStage = ref('');
const showJobFormModal = ref(false);
const showDetails = ref(false);
const selectedJob = ref({});
const updatedJob = ref({});


const viewDetails = (job) => {
  showDetails.value = true;
  selectedJob.value = job;
}

const handleJobSubmit = (job) => {
  const { id,...restJob } = job;
  if (id) {
    jobStore.updateJob(id,restJob);
  } else {
    jobStore.addJob(restJob)
  }
}

const openJobFormModal = (job) => {
  showJobFormModal.value = true;
  updatedJob.value = job
}


</script>
<style></style>