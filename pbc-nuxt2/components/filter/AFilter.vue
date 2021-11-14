<template>
  <div class='range-slider'>
    <div class="sliderTitle">
        <div><b>{{ filterName }}</b></div>
        <div>{{minValue}} - {{maxValue}}</div>
    </div>
    <input type="range" :min="minNum" :max="maxNum" step="0.25" v-model="minV" @input="slider">
    <input type="range" :min="minNum" :max="maxNum" step="0.25" v-model="maxV" @input="slider" :class="backgroundimg">
    <div class="fading min" :style="minSpace"></div>
    <div class="fading max" :style="maxSpace"></div>
  </div>
</template>

<script>
export default {
    name: 'AFilter',
    props: ['type', 'minValue', 'maxValue'],
    emits: ['update:minValue', 'update:maxValue'],
    data() {
    return {
      minNum: 0,
      maxNum: 10
  }},
  methods: {
    slider() {
      if (this.minValue > this.maxValue) {
        let tmp = this.maxValue;
        this.$emit('update:maxValue', this.minValue)
        this.$emit('update:minValue', tmp)
      }
    }
  },
  computed: {
    minV: {
        get () { return this.minValue },
        set (value) { this.$emit('update:minValue', value) },
      },
    maxV: {
        get () { return this.maxValue },
        set (value) { this.$emit('update:maxValue', value) },
      },
    minSpace() {
        let leftSpace = (24 * this.minValue - 3) + 'px'
        return { "width": leftSpace }
      },
    maxSpace() {
          let leftSpace = (240 - (24 * this.maxValue) - (6 - (6 * this.maxValue / 10))) + 'px'
          return { "width": leftSpace }
      },
    filterName() {
        if (this.type == 'speed') { return 'Speed'}
        else if (this.type == 'rhythm') { return 'Rhythm'}
        else if (this.type == 'experimental') { return 'Experimental'}
        else if (this.type == 'mood') { return 'Mood'}
        else if (this.type == 'organic') { return 'Organic'}
    },
    backgroundimg() {
        if (this.type == 'speed') { return 'speed'}
        else if (this.type == 'rhythm') { return 'rhythm'}
        else if (this.type == 'experimental') { return 'experimental'}
        else if (this.type == 'mood') { return 'mood'}
        else if (this.type == 'organic') { return 'organic'}
    }
  }
}
</script>

<style>
.range-slider {
  width: 240px;
  margin: 0 0 30px 0; 
  padding: 0;
  text-align: center;
  position: relative;
  height: 60px;
  font-size: 0.9em;
}

.sliderTitle {
    display: flex;
    justify-content: space-between;
}
.range-slider input[type=range] {
  position: absolute;
  left: 0;
  bottom: -5px;
}

.fading {
    position: absolute;
    bottom: -5px;
    height: 38px;
    background: #f2f2f2aa;
    pointer-events: none;
    z-index: 0;
}

.fading.min {
    left: 0;
}
.fading.max {
    right: 0;
}

input[type=range] {
  -webkit-appearance: none;
  padding: 0;
  margin: 0;
  width: 240px;
  height: 38px;
  border: none;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 38px;
  /* cursor: pointer; */
  /* animate: 0.2s; */
  border-radius: 1px;
  box-shadow: none;
  border: 0;
}

input.speed::-webkit-slider-runnable-track {
  background-image: url('~/assets/images/filter/speed.png');
  background-size: cover;
}
input.rhythm::-webkit-slider-runnable-track {
  background-image: url('~/assets/images/filter/rhythm.png');
  background-size: cover;
}
input.experimental::-webkit-slider-runnable-track {
  background-image: url('~/assets/images/filter/experimental.png');
  background-size: cover;
  mix-blend-mode: multiply;
}
input.mood::-webkit-slider-runnable-track {
  background-image: url('~/assets/images/filter/mood.png');
  background-size: cover;
  mix-blend-mode: multiply;
}
input.organic::-webkit-slider-runnable-track {
  background-image: url('~/assets/images/filter/organic.png');
  background-size: cover;
  mix-blend-mode: multiply;
}

input[type=range]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  height: 46px;
  width: 6px;
  top: -4px;
  background: #0092c5;
  border-radius: 3px;
  cursor: pointer;
  -webkit-appearance: none;
}

</style>