<template>
  <div class="bg-gray-100 rounded-lg p-4" @dragover.prevent @drop="onDrop" data-test="job-column">
    <h3 class="font-medium text-gray-700 mb-3 flex items-center justify-between">
      {{ stage }}
      <span class="bg-white text-gray-600 text-xs rounded-full px-2 py-1">
        {{ jobs.length }}
      </span>
    </h3>
    <div class="space-y-3">
      <JobCard v-for="job in jobs" :key="job.id" :job="job" />
      <div v-if="jobs.length === 0"
        class="bg-white p-3 rounded-md shadow-sm border border-dashed border-gray-300 text-center">
        <p class="text-gray-400 text-sm">No jobs yet</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import JobCard from './JobCard.vue';

const props = defineProps({
  stage: String,
  jobs: Array,
});

const emit = defineEmits(['job-dropped']);

const onDrop = (event) => {
  const jobId = event.dataTransfer.getData('text/plain');
  emit('job-dropped',{ jobId,newStage: props.stage });
};
</script>

<style scoped></style>
