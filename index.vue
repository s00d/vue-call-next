<template>
    <div>
        <div class="vue-call-input-group" @click.prevent="show = !show">
            <input ref="input"
                   class="vue-call-input"
                   type="text"
                   :value="inputText"
                   :placeholder="placeholder"
                   disabled
            >
            <span class="vue-call-input-group-addon">
                <span v-if="show">▲</span>
                <span v-else>▼</span>
            </span>
        </div>

        <div class="vue-call-wrap" v-if="show">
            <div class="vue-call-box">
                <div >
                    <div class="vue-call-year">
                        <button type="button" class="vue-call-year-previous" @click="monthYearClick(-1)">◀</button>
                        <span class="vue-call-year-text">
                            <span class="vue-call-show-month" @click.prevent="setStep('month')">{{ monthName[month-1] }}</span> 
                            <span class="vue-call-show-year" @click.prevent="setStep('year')">{{ year }}</span>
                        </span>
                        <button type="button" class="vue-call-year-next" @click="monthYearClick(1)">▶</button>
                    </div>
                    <month-block v-if="step === 'month'" @select-month="selectMonth" :select="parseInt(month)" :month-name="monthName"/>
                    <year-block v-if="step === 'year'" @select-year="selectYear" :select="parseInt(year)" :min="minYear"/>

                    <!--<transition name="fade" mode="out-in">-->
                    <cal-block v-if="step === 'cal-1'" :firstWeekDay="1" @set-day="setDay" v-model="startDate" :days-name="daysName" />
                    <!--</transition>-->
                    <transition name="slide-fade">
                        <cal-block v-if="step === 'cal-2'" :firstWeekDay="1" @set-day="setDay" v-model="startDate" :days-name="daysName" :first-date="firstDate" />
                    </transition>
                </div>

                <helper-block v-if="helper" @set-helper="setDate"/>
            </div>
        </div>

    </div>
</template>
<script>
    import CalBlock from './CalBlock'
    import MonthBlock from './MonthBlock'
    import YearBlock from './YearBlock'
    import HelperBlock from './HelperBlock'

    export default {
        name: "VueCal",
        props: {
            start: {
                type: [String, Boolean],
                default: null
            },
            daysName: {
                type: [Array, Object],
                default: function() {
                    return ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
                }
            },
            monthName: {
                type: [Array, Object],
                default: function() {
                    return ["January","February","March","April","May","June","July","August","September","October","November","December"]
                }
            },
            minYear: {
                type: Number,
                default: 2000
            },
            maxYear: {
                type: Number,
                default: 2019
            },
            range: {
                type: Boolean,
                default: true
            },
            helper: {
                type: Boolean,
                default: true
            },
            placeholder: {
                type: String,
                default: 'click'
            },
        },
        computed: {
            parse_date() {
                return new Date(this.startDate);
            },
            year() {
                return this.parse_date.getFullYear();
            },
            month() {
                let month = parseInt(this.parse_date.getMonth())+1;
                return month<10?'0'+month:month;
            },
            day() {
                return null;
            },
        },
        data() {
            return {
                show: false,
                step: 'cal-1',
                startDate: null,
                firstDate: null,
                lastDate: null,
                inputText: ''

            };
        },
        watch: {
            start(val) {
                if(this.isDate(val)) {
                    this.startDate = val
                }
            }
        },
        methods: {
            setDate(start, end = null) {
                this.inputText = start;
                if(this.range) {
                    this.inputText +=  ' - ' + end
                }
                this.$emit('set-dates', start, end);
                this.show = false;
                this.firstDate = null;
                this.setStep('cal-1');
            },
            setDay(val) {
                if(!this.range) {
                    this.show = false;
                    this.startDate = val;
                    this.setDate(val);
                } else if (this.step === 'cal-2')  {
                    this.setDate(this.firstDate, val);
                } else {
                    this.firstDate = val;
                    this.setStep('cal-2');
                }
            },
            monthYearClick(month) {
                month = parseInt(this.month) + month;
                let year = this.year;
                if(month === 0) {
                    month = 12;
                    year--;
                } else if(month > 12) {
                    month = 1;
                    year++;
                }
                this.startDate = year+'-'+month+'-01';
            },
            selectYear(year) {
                this.setStep(this.firstDate === null ? 'cal-1' : 'cal-2');
                this.startDate = year+'-'+this.month+'-01';
            },
            selectMonth(month) {
                this.setStep(this.firstDate === null ? 'cal-1' : 'cal-2');
                this.startDate = this.year+'-'+month+'-01';
            },
            setStep(step) {
               if(this.step === step && step !== 'cal-2')  {
                   this.step = 'cal-1'
               } else {
                   this.step = step
               }
            },
            isDate(date) {
                return!!(function(d){return(d!=='Invalid Date'&&!isNaN(d))})(new Date(date));
            }
        },
        mounted() {
            if(this.start && this.isDate(this.start)) {
                this.startDate = this.start
            } else {
                let date = new Date();
                var mm = date.getMonth() + 1; // getMonth() is zero-based
                var dd = date.getDate();
                this.startDate = [date.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('-')
            }
        },
        components: {
            CalBlock,
            YearBlock,
            MonthBlock,
            HelperBlock
        }
    };

</script>
<style lang="css">

</style>
