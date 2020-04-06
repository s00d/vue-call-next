import Call from './src/index.vue'

export default {
    install: function (Vue, options) {
        Vue.component('vue-call-next', Call);
    },
}
export { Call }
