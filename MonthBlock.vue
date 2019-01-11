<template>
    <div>
        <div class="vue-cal-years-list">
            <div class="vue-cal-years-list-item" :class="{'vue-cal-years-list-item-selected': month===select}" v-for="month in months" v-text="monthName[month-1]" @click="selectMonth(month)"></div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "MonthBlock",
        props: {
            select: {
                type: Number,
                default: 1
            },
            monthName: {
                type: Array,
                default: function() {
                    return []
                }
            }
        },
        computed: {
            months() {
                let result = [];
                let start = 1;
                while (start <= 12) {
                    result.push(start++)
                }
                return result;
            }
        },
        data() {
            return {

            };
        },
        watch: {

        },
        methods: {
            selectMonth(selected) {
                this.$emit('select-month', selected)
            }
        },
        mounted() {

        },
        components: {}
    };
</script>
<style lang="css">

</style>
