<template>
  <div class="presetBar" v-if="presets">
      <div class="presetWrapper">
          <div v-for="(preset, index) in presets" class="preset" :key="preset.PresetId" @click="sendPresetValue(index)">
            <img :src="require('~/assets/images/preset/' + preset.Image)" :alt="preset.PresetName">
            <div class="screen">
                <h3>{{ preset.PresetName }}</h3>
            </div>
          </div>
      </div>
  </div>
</template>

<script>

export default {
    name: 'Presets',
    emits: ['loadPreset'],
    props: ['presets'],
    methods: {
        sendPresetValue(id) {
            let val = {
                rhythm : this.presets[id].PBRhythm.split(/\s*\-\s*/g),
                speed : this.presets[id].PBSpeed.split(/\s*\-\s*/g),
                experimental : this.presets[id].PBExperimental.split(/\s*\-\s*/g),
                mood : this.presets[id].PBMood.split(/\s*\-\s*/g),
                organic : this.presets[id].PBOrgnc.split(/\s*\-\s*/g)
            }
            console.log('Preset Value:', val)
            this.$emit('loadPreset', val)
        }
    }
}
</script>

<style scoped>
.presetBar {
  width: 220px;
  height: calc(100% - 170px);
  position: absolute;
  padding: 120px 20px 50px 20px;
  top: 0;
  left: 0;
  background: #b4acafcc;
  border-right: #44444444 1px solid;
  /* z-index: 100; */
  overflow-y: scroll;
}
.preset {
    width: calc(100% - 20px);
    height: 100px;
    display: inline-block;
    margin: 5px 10px;
    overflow: hidden;
    border-radius: 5px;
    position: relative;
    border: #444444aa 1px solid;
    cursor: pointer;
}
.preset img {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
}
.preset .screen {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    background: #00000066;
    padding: 20px;
    text-align: center;
}
.preset .screen:hover {
    background: #00000088;
    transition-duration: 200ms;
}
.preset .screen h3 {
    height: fit-content;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-weight: normal;
    font-size: 1em;
}
@media (max-width: 600px) {
    .presetBar {
    width: calc(100% - 40px);
    max-width: none;
    padding: 80px 20px 120px 20px;
    }
}
</style>