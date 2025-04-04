import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AddJobModal from '@/components/JobFormModal.vue'

describe('AddJobModal.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AddJobModal, {
      props: {
        visible: true,
      },
    })
  })

  it('renders modal when visible is true', () => {
    expect(wrapper.find('[data-test="add-job-modal"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="modal-title"]').text()).toBe('Add New Job Application')
  })

  it('does not render modal when visible is false', async () => {
    await wrapper.setProps({ visible: false })
    expect(wrapper.find('[data-test="add-job-modal"]').exists()).toBe(false)
  })

  it('emits close event when cancel button is clicked', async () => {
    await wrapper.find('[data-test="cancel-button"]').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('emits close event when close icon is clicked', async () => {
    await wrapper.find('[data-test="close-button"]').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('submits form and emits formatted data, then resets form', async () => {
    await wrapper.find('[data-test="input-company"]').setValue('Vue Inc')
    await wrapper.find('[data-test="input-jobTitle"]').setValue('Frontend Engineer')
    await wrapper.find('[data-test="input-jobPostingURL"]').setValue('https://vuejobs.com')
    await wrapper.find('[data-test="input-location"]').setValue('Remote')
    await wrapper.find('[data-test="input-salaryRange"]').setValue('$100k')
    await wrapper.find('[data-test="input-appliedDate"]').setValue('2024-04-10')
    await wrapper.find('[data-test="input-techStack"]').setValue('Vue, Tailwind, Pinia')
    await wrapper.find('[data-test="input-notes"]').setValue('Remote position')

    await wrapper.find('[data-test="job-form"]').trigger('submit')
    const [submitted] = wrapper.emitted('submit')[0]
    expect(submitted).toEqual({
      company: 'Vue Inc',
      jobTitle: 'Frontend Engineer',
      jobPostingURL: 'https://vuejobs.com',
      location: 'Remote',
      salaryRange: '$100k',
      notes: 'Remote position',
      appliedDate: '2024-04-10',
      techStack: ['Vue', 'Tailwind', 'Pinia'],
    })

    // Check that form reset worked
    expect(wrapper.find('[data-test="input-company"]').element.value).toBe('')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
