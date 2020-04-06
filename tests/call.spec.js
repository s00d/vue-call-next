import VueCallNext from '../index'
import { Call } from '../index'
import { mount } from '@vue/test-utils'

const wrapper = mount(Call, {
  data() {
    return {
      startDate: '2010-01-01',
      endDate: '2010-01-01',
    }
  }
});

describe('VueCallNext', () => {
    describe('installing plugin', () => {
        it('load component', () => {
          expect(wrapper.element).toMatchSnapshot()
          expect(wrapper.find('.vue-call-input-group').exists()).toBeTruthy()
        });
    })
})
