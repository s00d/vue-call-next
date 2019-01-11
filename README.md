# vue-call-next

![preview](https://s2.gifyu.com/images/image65236dec4b3e998b.gif)

Simple calendar with selectable dates

## Installation
```
npm install --save vue-call-next
```

Installing the plugin will globally add the `vue-call-next` component to your project.

```js
//main.js
import Cal from 'vue-call-next'
Vue.use(Cal)
```

But you can also import the standalone component to add locally or for more complex installations.

```js
// foo.vue
import { Cal } from 'vue-call-next'
export default {
  components: {
    Cal,
  },
}
```

### CSS
you will need to explicitly import this css file in your project.
```js
import 'vue-call-next/call.css'
```

## Basic Usage

You can pass an array of cal objects through the props

```html
<vue-call-next :start="startDate" :helper="false" @set-dates="(start, end) => {startDate = start; endDate = end}" placeholder="change" />
...
<script>
...
  data() {
    return {
      startDate: '2010-01-01',
      endDate: '2010-01-01',
    }
  }
...
</script>
```
Param | Default | Description
------ | ------ | ------
start | NOW() | date started, format: YYYY-MM-DD
daysName | ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'] | array with day name
monthName | ["January","February","March","April","May","June","July","August","September","October","November","December"] | array with month name
minYear | 2000 | Minimal year to change
range | true | enable or disable range change
placeholder | click | text to input placeholder


