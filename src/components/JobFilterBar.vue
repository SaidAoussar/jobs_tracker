<template>
  <div class="mb-6 rounded-lg bg-white p-4 shadow-md">
    <div class="flex flex-col space-y-4 md:flex-row md:items-end md:space-y-0 md:space-x-4">
      <div class="w-full md:w-1/4">
        <label for="job" class="block text-sm font-medium text-gray-700">Search Jobs</label>
        <input type="text" :value="props.job" @input="(e) => emit('update:job', e.target.value)" id="job"
          placeholder="Search jobs by company, jobTitle, or techStack"
          class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div class="w-full md:w-1/4">
        <label for="stage" class="block text-sm font-medium text-gray-700">Stage</label>
        <select id="stage" :value="props.stage" @change="(e) => emit('update:stage', e.target.value)"
          class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          <option value="">All Stages</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
    </div>
  </div>

</template>
<script setup>
const props = defineProps(["job","stage"]);
const emit = defineEmits(['update:job','update:stage'])
</script>
<style></style>