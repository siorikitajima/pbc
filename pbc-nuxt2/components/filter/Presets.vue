<template>
  <div class="presetBar">
      <div class="presetWrapper" v-if="presets">
          <div v-for="(preset, index) in presets" class="preset" :key="preset.PresetId" @click="sendPresetValue(index)">
            <img :src="require('~/assets/images/preset/' + preset.Image)" :alt="preset.PresetName">
            <div class="screen">
                <h3>{{ preset.PresetName }}</h3>
            </div>
          </div>
      </div>
      <div v-else><TableLoading /></div>
  </div>
</template>

<script>
export default {
    name: 'Presets',

    emits: ['loadPreset'],
    props: ['presets'],
    methods: {
        sendPresetValue(id) {
            this.$emit('loadPreset')
            if(window.innerWidth <= 600) {
              this.$store.commit('SHOW_PLAYER')
            }

            const rhy = this.presets[id].PBRhythm.split(/\s*\-\s*/g)
            const spd = this.presets[id].PBSpeed.split(/\s*\-\s*/g)
            const exp = this.presets[id].PBExperimental.split(/\s*\-\s*/g)
            const mod = this.presets[id].PBMood.split(/\s*\-\s*/g)
            const org = this.presets[id].PBOrgnc.split(/\s*\-\s*/g)

            console.log('PRESET VALUES:::', 'rhy', rhy[0],rhy[1], 'spd', spd[0], spd[1], 'exp', exp[0], exp[1], 'mod', mod[0], mod[1], 'org', org[0], org[1])

            this.$store.commit('SET_PRESETS_OG', {rhyMin: rhy[0], rhyMax:rhy[1], spdMin:spd[0], spdMax:spd[1], expMin:exp[0], expMax:exp[1], modMin:mod[0], modMax:mod[1], orgMin:org[0], orgMax:org[1]})

            const query = {
                rhythm: { min: rhy[0], max: rhy[1] },
                speed: { min: spd[0], max: spd[1] },
                experimental: { min: exp[0], max: exp[1] },
                mood: { min: mod[0], max: mod[1] },
                organic: { min: org[0], max: org[1] }
            }
            localStorage.setItem("filterValues", JSON.stringify(query))         
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
  background: #b4acaf;
  border-right: #44444444 1px solid;
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