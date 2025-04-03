import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import JobCard from '@/components/JobCard.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useJobStore } from '@/stores/jobStore';

describe('JobCard.vue', () => {
  let job;
  let jobStore;

  beforeEach(() => {
    setActivePinia(createPinia());

    jobStore = useJobStore();

    job = {
      id: 'job-001',
      jobTitle: 'Frontend Developer',
      company: 'TechNova Inc.',
      appliedDate: '2024-04-10',
    };
    jobStore.jobs = [job];
  });

  it('renders job information correctly', () => {
    const wrapper = mount(JobCard, {
      props: { job },
    });

    expect(wrapper.text()).toContain(job.jobTitle);
    expect(wrapper.text()).toContain(job.company);
    expect(wrapper.text()).toContain('2024-04-10');
  });

  it('opens and closes the dropdown menu', async () => {
    const wrapper = mount(JobCard, {
      props: { job },
    });

    const dropdownBtn = wrapper.find('[data-test="dropdown-btn"]');
    expect(dropdownBtn.exists()).toBe(true);

    await dropdownBtn.trigger('click');
    expect(wrapper.html()).toContain('Details');
    expect(wrapper.html()).toContain('Delete');
  });

  it('shows job details modal when clicking "Details"', async () => {
    const wrapper = mount(JobCard, {
      props: { job },
    });

    await wrapper.find('button').trigger('click'); // open dropdown
    const detailBtn = wrapper.find('[data-test="detail-btn"]');

    expect(detailBtn.exists()).toBe(true);

    await detailBtn.trigger('click');

    expect(wrapper.findComponent({ name: 'JobDetailsModal' }).exists()).toBe(true);
  });

  it('deletes job from store when clicking "Delete"', async () => {
    const wrapper = mount(JobCard, {
      props: { job },
    });

    await wrapper.find('button').trigger('click'); // open dropdown
    const deleteBtn = wrapper.find('[data-test="delete-btn"]');
    expect(deleteBtn.exists()).toBe(true);

    await deleteBtn.trigger('click');
    expect(jobStore.jobs).toHaveLength(0);
  });
});
