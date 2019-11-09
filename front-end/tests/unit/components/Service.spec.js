import { shallowMount } from '@vue/test-utils';
import Service from '@/components/Service'

describe('Service.vue', () => {
  it('should render a header with instructions', () => {
    const wrapper = shallowMount(Service);
    const header = wrapper.find('#topHeader');
    expect(header.text()).toContain('Let´s go!\n' +
      '    Call a Spring Boot REST backend service, by selecting an input and clicking the button:');
  })
})

describe('Service.vue', () => {
  it('should render a form select with valid options', () => {
    const wrapper = shallowMount(Service);
    const button = wrapper.find('#bFormSelect');
    expect(button.text()).toEqual('C PHP JAVA PYTHON JAVA SCRIPT');
  })
})
