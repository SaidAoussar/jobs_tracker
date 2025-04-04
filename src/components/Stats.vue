<template>
  <h1 class="mb-6 text-2xl font-bold text-gray-800">Job Search Dashboard</h1>

  <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
    <div class="rounded-lg bg-white p-4 shadow">
      <div class="flex items-center">
        <div class="bg-primary/10 mr-4 rounded-full p-3">
          <svg class="text-primary h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500">Total Applications</p>
          <p class="text-2xl font-bold text-gray-800">{{ total }}</p>
        </div>
      </div>
    </div>
    <div class="rounded-lg bg-white p-4 shadow">
      <div class="flex items-center">
        <div class="mr-4 rounded-full bg-amber-100 p-3">
          <!-- Replace with your icon component or SVG -->
          <svg class="h-6 w-6 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500">Applied</p>
          <p class="text-2xl font-bold text-gray-800">{{ stats.applied }}</p>
        </div>
      </div>
    </div>
    <div class="rounded-lg bg-white p-4 shadow">
      <div class="flex items-center">
        <div class="mr-4 rounded-full bg-green-100 p-3">
          <!-- Replace with your icon component or SVG -->
          <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500">Interviewing</p>
          <p class="text-2xl font-bold text-gray-800">{{ stats.interview }}</p>
        </div>
      </div>
    </div>
    <div class="rounded-lg bg-white p-4 shadow">
      <div class="flex items-center">
        <div class="mr-4 rounded-full bg-blue-100 p-3">
          <!-- Replace with your icon component or SVG -->
          <svg class="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500">Offers</p>
          <p class="text-2xl font-bold text-gray-800">{{ stats.offers }}</p>
        </div>
      </div>
    </div>
    <div class="rounded-lg bg-white p-4 shadow">
      <div class="flex items-center">
        <div class="mr-4 rounded-full bg-red-100 p-3">
          <!-- Replace with your icon component or SVG -->
          <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500">Rejected</p>
          <p class="text-2xl font-bold text-gray-800">{{ stats.rejected }}</p>
        </div>
      </div>
    </div>
  </div>



  <div class="mb-6 grid grid-cols-1 lg:grid-cols-3">
    <div class="rounded-lg bg-white p-6 shadow lg:col-span-2 flex flex-col items-center w-full">
      <h2 class="mb-4 text-lg font-medium text-gray-800 self-start">Application Status</h2>
      <div class="h-80 w-full flex items-center justify-center">
        <div class="h-96 w-96">
          <Pie :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useJobStore } from "@/stores/jobStore";
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { computed } from 'vue'


ChartJS.register(Title,Tooltip,Legend,ArcElement)
const stats = computed(() => jobStore.stats)


const jobStore = useJobStore();

const total = jobStore.totalApplications;
const chartData = computed(() => ({
  labels: ['Applied','Interview','Offers','Rejected'],
  datasets: [
    {
      label: 'Applications',
      data: [
        stats.value.applied,
        stats.value.interview,
        stats.value.offers,
        stats.value.rejected
      ],
      backgroundColor: ['oklch(96.2% 0.059 95.617)','oklch(96.2% 0.044 156.743)','oklch(93.2% 0.032 255.585)','oklch(93.6% 0.032 17.717)'],
    },
  ],
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
}





</script>