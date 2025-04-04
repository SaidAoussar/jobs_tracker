<template>
  <div v-if="visible" data-test="add-job-modal"
    class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div class="m-4 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-xl">
      <div class="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white p-4">
        <h2 data-test="modal-title" class="text-xl font-semibold text-gray-800">{{ props.job ? 'Edit Job Application' :
          'Add New Job Application' }}
        </h2>
        <button @click="closeModal" data-test="close-button"
          class="text-gray-500 transition-colors hover:text-gray-800 focus:outline-none">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div class="p-6">
        <form id="jobForm" data-test="job-form" @submit.prevent="submitJob" class="space-y-6">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div class="space-y-4">
              <div>
                <label for="company" class="mb-1 block text-sm font-medium text-gray-700">Company*</label>
                <input type="text" data-test="input-company" id="company" name="company" v-model="form.company"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  required />
              </div>
              <div>
                <label for="jobTitle" class="mb-1 block text-sm font-medium text-gray-700">Job Title*</label>
                <input v-model="form.jobTitle" data-test="input-jobTitle" type="text" id="jobTitle" name="jobTitle"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  required />
              </div>
              <div>
                <label for="jobPostingURL" class="mb-1 block text-sm font-medium text-gray-700">Job Posting URL</label>
                <input v-model="form.jobPostingURL" data-test="input-jobPostingURL" type="url" id="jobPostingURL"
                  name="jobPostingURL"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label for="location" class="mb-1 block text-sm font-medium text-gray-700">Location</label>
                <input v-model="form.location" data-test="input-location" type="text" id="location" name="location"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label for="salaryRange" class="mb-1 block text-sm font-medium text-gray-700">Salary Range</label>
                <input v-model="form.salaryRange" data-test="input-salaryRange" type="text" id="salaryRange"
                  name="salaryRange"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div class="space-y-4">
              <div>
                <label for="appliedDate" class="mb-1 block text-sm font-medium text-gray-700">Applied Date</label>
                <input v-model="form.appliedDate" data-test="input-appliedDate" type="date" id="appliedDate"
                  name="appliedDate"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label for="techStack" class="mb-1 block text-sm font-medium text-gray-700">techStack</label>
                <small class="block text-xs text-gray-500 mt-1 mb-2">
                  Use commas to separate technologies </small>
                <input v-model="form.techStack" data-test="input-techStack" type="text" id="techStack" name="techStack"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div>
            <label for="notes" class="mb-1 block text-sm font-medium text-gray-700">Notes</label>
            <textarea v-model="form.notes" data-test="input-notes" id="notes" name="notes" rows="3"
              class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
        </form>
      </div>

      <div class="flex justify-end space-x-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
        <button data-test="cancel-button"
          class="rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none cursor-pointer"
          @click="closeModal">Cancel</button>
        <button form="jobForm" data-test="submit-button"
          class="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
          type="submit"> {{ props.job ? 'Update' : 'Save Application' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,watch } from 'vue';

const props = defineProps({
  visible: Boolean,
  job: Object
});
const emit = defineEmits(['close','submit']);

const form = ref({
  company: '',
  jobTitle: '',
  jobPostingURL: '',
  location: '',
  salaryRange: '',
  notes: '',
  techStack: '',
  appliedDate: '',
});

watch(
  () => props.job,
  (newJob) => {
    if (newJob) {
      form.value = {
        company: newJob.company || '',
        jobTitle: newJob.jobTitle || '',
        jobPostingURL: newJob.jobPostingURL || '',
        location: newJob.location || '',
        salaryRange: newJob.salaryRange || '',
        notes: newJob.notes || '',
        techStack: Array.isArray(newJob.techStack)
          ? newJob.techStack.join(', ')
          : '',
        appliedDate: newJob.appliedDate || '',
      };
    }
  },
  { immediate: true }
);

const closeModal = () => {
  emit('close');
};

const submitJob = () => {
  const formattedTechStack = form.value.techStack
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  emit('submit',{
    ...form.value,techStack: formattedTechStack,id: props.job ? props.job.id : undefined
  });

  form.value = {
    company: '',jobTitle: '',jobPostingURL: '',location: '',salaryRange: '',notes: '',techStack: '',appliedDate: ''
  };
  closeModal();
};
</script>
