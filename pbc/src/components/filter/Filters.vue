<template>
<div class="filterBar">
  <AFilter type="rhythm" @sendSlider="passValue($event)" :minValue="rhythm.min" :maxValue="rhythm.max" />
  <AFilter type="speed" @sendSlider="passValue($event)" :minValue="speed.min" :maxValue="speed.max" />
  <AFilter type="experimental" @sendSlider="passValue($event)" :minValue="experimental.min" :maxValue="experimental.max" />
  <AFilter type="mood" @sendSlider="passValue($event)" :minValue="mood.min" :maxValue="mood.max" />
  <AFilter type="organic" @sendSlider="passValue($event)" :minValue="organic.min" :maxValue="organic.max" />

</div>

</template>

<script>
import { ref } from '@vue/reactivity'
import AFilter from './AFilter.vue'
// import HistogramSlider from 'vue-histogram-slider';
// import 'vue-histogram-slider/dist/histogram-slider.css';

export default {
    name: 'Filters',
    emits: ['loadSlider'],
    props: [ 'rhythm',  'speed', 'experimental', 'mood', 'organic'],
    components: { AFilter },
    setup() {
      const filterItems = ref([])
      const filterPanel = ref(false)
      return { filterItems, filterPanel }
    },
    methods: {
      passValue(val) {
        this.$emit('loadSlider', val)
      }
    }

}
</script>

<style>
.filterBar {
  width: 240px;
  height: calc(100% - 170px);
  position: absolute;
  padding: 120px 20px 50px 20px;
  top: 0;
  left: 0;
  background: #e7eceeee;
  border-right: #44444444 1px solid;
  z-index: -1;
}

</style>