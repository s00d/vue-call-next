<template>
    <div>
        <div class="vue-call-years-list">
            <div v-for="(month, key) in months" :key="key" 
                class="vue-call-years-list-item" 
                :class="{'vue-call-years-list-item-selected': month===select}" 
                v-text="monthName[month-1]" 
                @click="selectMonth(month)">
            </div>
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
                type: [Array, Object],
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
