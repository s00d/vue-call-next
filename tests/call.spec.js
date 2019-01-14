import Vue from 'vue/dist/vue'
import VueFullCalendar from '../index'
import { Call } from '../index'

Vue.use(VueFullCalendar)
Vue.component('call', Call)

const events = jest.fn()
const vm = new Vue({
    template: '<vue-call-next :start="startDate" ref="calendar" :helper="false" @set-dates="setDatesFilter"/>',
    data() {
        return {
          startDate: '2010-01-01',
          endDate: '2010-01-01',
        }
    },
    methods: {
      setDatesFilter(start, end) {
        this.startDate = start;
        this.endDate = end;
      },
    }
}).$mount();

describe('VueFullCalendar', () => {
    describe('installing plugin', () => {
        it('load component', () => {
            expect(typeof Vue.options.components['vue-call-next']).toEqual('function')
        })

        it('export standalone component', () => {
            expect(typeof Vue.options.components['call']).toEqual('function')
            expect(Vue.options.components['call']).toEqual(Vue.options.components['vue-call-next'])
        })
    })
})