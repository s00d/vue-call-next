import Vue from 'vue/dist/vue'
import VueFullCalendar from '../index'
import { Call } from '../index'

Vue.use(VueFullCalendar)
Vue.component('cal', Call)

const events = jest.fn()
const vm = new Vue({
    template: '<vue-call-next :start="startDate" ref="calendar" :helper="false" @set-dates="(start, end) => {startDate = start; endDate = end}" placeholder="change" />',
    data() {
        return {
            config: {
              startDate: '2010-01-01',
              endDate: '2010-01-01',
            },
        }
    },
}).$mount();

describe('VueFullCalendar', () => {
    describe('installing plugin', () => {
        it('load component', () => {
            expect(typeof Vue.options.components['vue-call-next']).toEqual('function')
        })

        it('export standalone component', () => {
            expect(typeof Vue.options.components['cal']).toEqual('function')
            expect(Vue.options.components['cal']).toEqual(Vue.options.components['vue-call-next'])
        })
    })

    describe('handle eventSources', () => {
        it('should call callback', () => {
            vm.$refs.calendar.fireMethod('fetchEvents', moment(), moment().add(7, 'd'))
            expect(events).toBeCalled()
        })

        it('should add events to calendar', () => {
            expect(vm.$refs.calendar.fireMethod('clientEvents').length).toEqual(1)            
        })
    })

    describe('handle firemethod', () => {
        it('should be transparent', () => {
            expect($(vm.$refs.calendar.$el).fullCalendar('getDate')).toEqual(vm.$refs.calendar.fireMethod('getDate'))
        })
        
        it('should set current view', () => {
            vm.$refs.calendar.fireMethod('changeView', 'agendaDay')
            expect($(vm.$refs.calendar.$el).fullCalendar('getView').name).toEqual('agendaDay')
        })
    })

    describe('handle custom config', () => {
        it('should have set weekends options', () => {
            expect($(vm.$refs.calendar.$el).fullCalendar('option', 'weekends')).toEqual(false)
        })
    })
})