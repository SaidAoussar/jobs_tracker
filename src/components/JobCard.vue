<template>
  <div
    class="bg-white p-3 rounded-md shadow-sm border-l-4 border-blue-500 cursor-pointer hover:shadow transition-shadow mb-2"
    draggable="true" @dragstart="onDragStart">
    <div class="flex justify-between items-start mb-1">
      <h4 class="font-medium text-gray-900 text-sm">{{ job.jobTitle }}</h4>
      <div class="relative dropdown-trigger">
        <button class="text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-gray-100"
          @click.stop="dropdownOpen = !dropdownOpen" data-test="dropdown-btn">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
        <div v-if="dropdownOpen"
          class="absolute right-0 z-10 mt-2 w-40 divide-y divide-gray-50 overflow-hidden rounded-lg border border-gray-100 bg-white text-sm shadow-md">
          <button @click.stop="viewDetails" data-test="detail-btn"
            class="flex w-full items-center px-4 py-2.5 text-left transition-colors hover:bg-gray-50 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Details
          </button>
          <button @click.stop="deleteJob" data-test="delete-btn"
            class="flex w-full items-center px-4 py-2.5 text-left font-medium text-red-600 transition-colors hover:bg-red-50 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>

    </div>

    <p class="text-gray-600 text-xs mb-2">{{ job.company }}</p>

    <div class="flex items-center justify-between mt-2">
      <span class="text-xs text-gray-500">{{ job.appliedDate }}</span>
    </div>
  </div>
  <JobDetailsModal :visible="showDetails" :job="selectedJob" @close="showDetails = false" />


</template>

<script setup>
import { useJobStore } from '@/stores/jobStore';
import { ref,onMounted,onBeforeUnmount } from 'vue';
import JobDetailsModal from './JobDetailsModal.vue';



const jobStore = useJobStore();

const props = defineProps({
  job: Object,
});
const dropdownOpen = ref(false);

const selectedJob = ref(null);
const showDetails = ref(false);



const onDragStart = (event) => {
  event.dataTransfer.setData('text/plain',props.job.id);
};

// Click outside to close dropdown
const handleClickOutside = (event) => {
  if (!event.target.closest('.dropdown-trigger')) {
    dropdownOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click',handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener('click',handleClickOutside);
});


// ✅ Internal actions
const viewDetails = () => {
  console.log('Viewing details for:',props.job);
  selectedJob.value = props.job;
  showDetails.value = true;
};

const deleteJob = () => {
  jobStore.removeJob(props.job.id);
};
</script>

<style scoped></style>
