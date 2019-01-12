<template>
    <div>
        <div class="vue-call-years-list">
            <div class="vue-call-years-list-item" :class="{'vue-call-years-list-item-selected': year===select}" v-for="year in years" v-text="year" @click="selectYear(year)"></div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "YearBlock",
        props: {
            select: {
                type: [Number, String],
                default: 2019
            },
            min: {
                type: Number,
                default: 1970
            },
            max: {
                type: Number,
                default: 0
            }
        },
        computed: {
            years() {
                let result = [];
                let start = this.min
                while (start <= this.set_max) {
                    result.push(start++)
                }
                return result;
            }
        },
        data() {
            return {
                set_max: 2019
            };
        },
        watch: {
            max(val) {
                this.updateMax()
            }
        },
        methods: {
            selectYear(selected) {
                this.$emit('select-year', selected)
            },
            updateMax() {
                if (this.max===0) {
                    let date = new Date();
                    this.set_max = date.getFullYear();
                } else {
                    this.set_max = this.max;
                }
            }
        },
        mounted() {
            this.updateMax()
        },
        components: {}
    };
</script>
<style lang="css">

</style>
