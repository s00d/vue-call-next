<template>
    <div class="vue-cal-helper">
        <div class="vue-cal-helper-item" @click="change(0, 0)">Today</div>
        <div class="vue-cal-helper-item" @click="change(1, 1)">Yesterday</div>
        <div class="vue-cal-helper-item" @click="change(7, 0)">Last 7 days</div>
        <div class="vue-cal-helper-item" @click="change(30, 0)">Last 30 days</div>
        <div class="vue-cal-helper-item" @click="changeMonth()">This month</div>
        <div class="vue-cal-helper-item" @click="changePreviousMonth()">Previous month</div>
        <div class="vue-cal-helper-item" @click="changeYear()">Year</div>
    </div>
</template>
<script>
    export default {
        name: "HelperBlock",
        props: {
            range: {
                type: Boolean,
                default: true
            },
        },
        computed: {

        },
        data() {
            return {

            };
        },
        watch: {

        },
        methods: {
            formatDate(date) {
                var mm = date.getMonth() + 1; // getMonth() is zero-based
                var dd = date.getDate();

                return [date.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('-');
            },

            change(first = 0, last = 0) {
                let startData = new Date();
                let endData = new Date();
                startData.setDate(startData.getDate() - first);
                endData.setDate(startData.getDate() - last);
                this.$emit('set-helper', this.formatDate(startData), this.formatDate(endData))
            },

            changeMonth() {
                let startData = new Date();
                let endData = new Date();
                startData.setDate(1);
                endData.setMonth(startData.getMonth() + 1);
                endData.setDate(0);
                this.$emit('set-helper', this.formatDate(startData), this.formatDate(endData))
            },
            changePreviousMonth() {
                let startData = new Date();
                let endData = new Date();
                startData.setMonth(startData.getMonth() - 1);
                startData.setDate(1);
                endData.setMonth(startData.getMonth() + 1);
                endData.setDate(0);
                this.$emit('set-helper', this.formatDate(startData), this.formatDate(endData))
            },
            changeYear() {
                let startData = new Date();
                let endData = new Date();
                startData.setFullYear(endData.getFullYear() - 1);

                this.$emit('set-helper', this.formatDate(startData), this.formatDate(endData))
            },
        },
        mounted() {

        },
        components: {}
    };
</script>
<style lang="css">

</style>
