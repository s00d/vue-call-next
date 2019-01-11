import Cal from './index.js'

export default {
    install: function (Vue, options) {
        Vue.component('vue-call-next', Cal);
    },
}
export { Cal }
