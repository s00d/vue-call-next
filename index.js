import Cal from './index.js'

export default {
    install: function (Vue, options) {
        Vue.component('vue-cal-next', Cal);
    },
}
export { Cal }
