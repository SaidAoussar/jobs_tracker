import { describe, it, expect, vi , beforeEach} from 'vitest';
import { mount } from '@vue/test-utils';
import JobColumn from '@/components/JobColumn.vue';
import JobCard from '../JobCard.vue';
import { createPinia, setActivePinia } from 'pinia'; 


const mockJobs = [
  {
    id: 'job-001',
    jobTitle: 'Frontend Developer',
    company: 'TechNova Inc.',
    appliedDate: '2024-04-10',
    stage: 'Applied',
  },
  {
    id: 'job-002',
    jobTitle: 'UX Designer',
    company: 'Design Studios',
    appliedDate: '2024-04-12',
    stage: 'Applied',
  },
];

describe('JobColumn.vue', () => {

  beforeEach(() => {
    setActivePinia(createPinia());
  });


  it('renders stage title and job count', () => {
    const wrapper = mount(JobColumn, {
      props: {
        stage: 'Applied',
        jobs: mockJobs,
      },
      global: {
        components: {
          JobCard,
        },
      },
    });

    expect(wrapper.text()).toContain('Applied');
    expect(wrapper.text()).toContain('2');

    const jobCards = wrapper.findAllComponents(JobCard);
    expect(jobCards.length).toBe(mockJobs.length);

    expect(wrapper.text()).toContain('Frontend Developer');
  });

  it('shows empty message when no jobs', () => {
    const wrapper = mount(JobColumn, {
      props: {
        stage: 'Applied',
        jobs: [],
      },
      global: {
        components: {
          JobCard,
        },
      },
    });

    expect(wrapper.text()).toContain('No jobs yet');
  });

  it('emits job-dropped event on drop', async () => {
    const wrapper = mount(JobColumn, {
      props: {
        stage: 'Interview',
        jobs: mockJobs,
      },
      global: {
        components: {
          JobCard,
        },
      },
    });

    const dropZone = wrapper.find('[data-test="job-column"]');

    const dataTransfer = {
      getData: vi.fn().mockReturnValue('job-001'),
    };

    await dropZone.trigger('drop', {
      dataTransfer,
    });

    expect(wrapper.emitted('job-dropped')).toBeTruthy();
    expect(wrapper.emitted('job-dropped')[0][0]).toEqual({
      jobId: 'job-001',
      newStage: 'Interview',
    });
  });
});
