<template>
    <div>
        <div class="vue-call-month">
            <div class="vue-call-week">
                <div class="vue-call-day-name" v-for="(day, key) in days" v-text="dayConv(day)" :key="key"></div>
            </div>
            <div class="vue-call-week" v-for="(dates, key) in cal" :key="key">
                <div :class="{
                    'vue-call-day-hide': day.hide,
                    'vue-call-day-select': day.day === preventSelect && !day.hide,
                    'vue-call-day': !day.hide,
                    'vue-call-day-preview':checkSelect(hover, day)
                }"
                    v-for="(day, key_day) in dates"
                    :key="key_day"
                    v-text="day.day"
                    @mouseover="setHover(day)"
                    @click="selectDay(day)">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "CalBlock",
        props: {
            value: {
                type: String,
                default: '2019-01-01'
            },
            firstWeekDay: {
                type: Number,
                default: 0
            },
            firstDate: {
                type: [String, Boolean],
                default: false
            },
            daysName: {
                type: [Array, Object],
                default: function() {
                    return []
                }
            }
        },
        computed: {
            days() {
                if(this.firstWeekDay === 0) return this.daysName;
                return this.daysName.slice(this.firstWeekDay).concat(this.daysName.slice(0,this.firstWeekDay));
            },
            parse_date() {
                return new Date(this.value);
            },
            year() {
                return this.parse_date.getFullYear();
            },
            month() {
                return this.parse_date.getMonth()+1;
            },
            day() {
                return null;
            },

            cal() {
                let result = {0: []};
                let week = 0;
                let firstDay = new Date(this.year, this.month-1, 1);
                let lastDayOfMonth = new Date(this.year, this.month, 0).getDate();
                let lastDayPreviousOfMonth = new Date(this.year, this.month-1, 0).getDate();
                let firstDayOfMonth = firstDay.getDay() - this.firstWeekDay;
                let days = 0;
                for (let i = firstDayOfMonth; i > 0; i--) {
                    result[week].push({day: lastDayPreviousOfMonth - i + 1, hide:true});
                    if (result[week].length === 7) result[++week] = [];
                    days++
                }
                for (let i = 0; i < lastDayOfMonth; i++) {
                    result[week].push({day: i + 1, hide:false});
                    if (result[week].length === 7) result[++week] = [];
                    days++
                }
                let last = 41 - days;
                for (let i = 0; i <= last; i++) {
                    result[week].push({day: i + 1, hide:true});
                    if (result[week].length === 7) result[++week] = [];
                    days++
                }
                if (result[week].length === 0) {
                    delete result[week];
                }

                return result;
            },
            firstDateParse() {
                if(!this.firstDate) return false;
                let date = new Date(this.firstDate)

                return {year: date.getFullYear(), month: date.getMonth(), day: date.getDate()}
            },
            preventSelect() {
                if(!this.firstDateParse) return false;
                if(this.firstDateParse.year === this.year && this.firstDateParse.month === this.month-1) {
                    return this.firstDateParse.day
                } else {
                    return 0
                }
            }
        },
        data() {
            return {
                show: false,
                hover: 0
            };
        },
        watch: {

        },
        methods: {
            selectDay(selected) {
                if(selected.hide) return;
                let month = this.month < 10 ? '0'+this.month : this.month;
                let day = selected.day < 10 ? '0'+selected.day : selected.day;

                this.$emit('set-day', this.year+'-'+month+'-'+day)
            },
            checkSelect(hover, {day, hide}) {
                if(!this.firstDateParse) return false;
                if(this.hover === 0) return false;
                if(hide) return false;

                let first_int = '' + this.firstDateParse.year + this.firstDateParse.month
                let select_int = '' + this.year + (this.month-1)
                let select_day = '' + this.firstDateParse.day

                if(select_int === first_int) {
                    return (day > select_day && day < hover || day < select_day && day > hover);
                }
                return (select_int >= first_int) ? day < hover : day > hover;
            },
            setHover(select) {
                if(select.hide) {
                    this.hover = 0;
                } else {
                    this.hover = select.day
                }
            },
            dayConv(day) {
                    return day.replace('о', '').substring(0, 2)
            }
        },
        mounted() {

        },
        components: {}
    };
</script>
<style lang="css">

</style>
