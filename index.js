import Cal from './index.vue'

export default {
    install: function (Vue, options) {
        Vue.component('vue-call-next', Cal);
    },
}
export { Cal }
