import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

import JobBoard from '@/components/JobBoard.vue';
import JobColumn from '@/components/JobColumn.vue';
import { useJobStore } from '@/stores/jobStore';

describe('JobBoard.vue (with global JobColumn)', () => {
  let jobStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    jobStore = useJobStore();

    // Set jobs in the store
    jobStore.jobs = [
      { id: 'job-1', jobTitle: 'Frontend Dev', company: 'Vue Corp', stage: 'Applied' },
      { id: 'job-2', jobTitle: 'UX Designer', company: 'DesignCo', stage: 'Interview' },
      { id: 'job-3', jobTitle: 'Backend Dev', company: 'Vue Corp', stage: 'Applied' },
    ];
  });

  it('renders JobColumn components for each stage', () => {
    const wrapper = mount(JobBoard, {
      global: {
        components: {
          JobColumn,
        },
      },
    });

    jobStore.stages.forEach(stage => {
      expect(wrapper.html()).toContain(stage);
    });

    const columns = wrapper.findAllComponents(JobColumn);
    expect(columns.length).toBe(jobStore.stages.length);
  });

  it('filters jobs when user types in search input', async () => {
    const wrapper = mount(JobBoard, {
      global: {
        components: {
          JobColumn,
        },
      },
    });

    const searchInput = wrapper.find('[data-test="search-input"]');
    await searchInput.setValue('UX');

    // Check that the Interview column now has only the matching job
    const interviewColumn = wrapper.findAllComponents(JobColumn).find(c => c.props('stage') === 'Interview');
    expect(interviewColumn.props('jobs').length).toBe(1);

    const appliedColumn = wrapper.findAllComponents(JobColumn).find(c => c.props('stage') === 'Applied');
    expect(appliedColumn.props('jobs').length).toBe(0);
  });

  it('updates job stage when job-dropped is emitted', async () => {
    const wrapper = mount(JobBoard, {
      global: {
        components: {
          JobColumn,
        },
      },
    });

    const column = wrapper.findComponent(JobColumn);
    await column.vm.$emit('job-dropped', { jobId: 'job-1', newStage: 'Offer' });

    expect(jobStore.jobs.find(j => j.id === 'job-1').stage).toBe('Offer');
  });
});
