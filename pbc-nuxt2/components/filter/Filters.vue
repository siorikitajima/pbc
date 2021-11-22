<template>
<div class="filterBar">
  <FilterAFilter type="rhythm" @sendSlider="passValue($event)" :minValue.sync="rhythm.min" :maxValue.sync="rhythm.max" />
  <FilterAFilter type="speed" @sendSlider="passValue($event)" :minValue.sync="speed.min" :maxValue.sync="speed.max" />
  <FilterAFilter type="experimental" @sendSlider="passValue($event)" :minValue.sync="experimental.min" :maxValue.sync="experimental.max" />
  <FilterAFilter type="mood" @sendSlider="passValue($event)" :minValue.sync="mood.min" :maxValue.sync="mood.max" />
  <FilterAFilter type="organic" @sendSlider="passValue($event)" :minValue.sync="organic.min" :maxValue.sync="organic.max" />
</div>

</template>

<script>
export default {
    name: 'Filters',
    emits: ['loadSlider'],
    props: [ 'rhythm',  'speed', 'experimental', 'mood', 'organic'],
    data() {
        return {
        filterItems: [],
        filterPanel: false
        }
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
  /* z-index: -1; */
}
@media (max-width: 600px) {
    .filterBar {
    width: calc(100% - 40px);
    max-width: none;
    padding: 80px 20px 20px 20px;
    height: calc(100% - 198px);
    overflow-y: auto;
    }
}
</style>