import { defineStore } from "pinia";


const STORAGE_KEY = 'jobtracker.jobs';


export const useJobStore = defineStore('jobStore', {
  state: () => ({
    jobs: JSON.parse(localStorage.getItem(STORAGE_KEY)) || [],
    stages: ['Applied', 'Interview', 'Offer', 'Accepted', 'Rejected'],
  }),
  actions: {
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.jobs));
    },

    addJob(newJob) {
      this.jobs.push({
        id: `job-${Date.now()}`,
        createdAt: new Date().toISOString(),
        stage: "Applied",
        ...newJob,
      });

      this.persist();
    },

    updateJob(id, updatedFields) {
      const jobIndex = this.jobs.findIndex((job) => job.id === id);
      if (jobIndex !== -1) {
        this.jobs[jobIndex] = { ...this.jobs[jobIndex], ...updatedFields };
        this.persist();
      }
    },


    moveJob(id, newStage) {
      const job = this.jobs.find((j) => j.id === id);
      if (job) {
        job.stage = newStage;
        this.persist();
      }
    },
    removeJob(id) {
      this.jobs = this.jobs.filter((job) => job.id !== id);
      this.persist();
    },
  },

  getters:{
    totalApplications: (state) => state.jobs.length,

    jobsByStage: (state) => (stage) => {
      return state.jobs.filter((job) => job.stage === stage);
    },

    stats: (state) => {
      return {
        applied: state.jobs.filter((j) => j.status === "Applied").length,
        interviewing: state.jobs.filter((j) => j.status === "Interviewing").length,
        offers: state.jobs.filter((j) => j.status === "Offer").length,
        rejected: state.jobs.filter((j) => j.status === "Rejected").length,
      };
    },
  
  }
});