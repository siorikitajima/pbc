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
// import { mapState } from 'vuex';

export default {
    name: 'Presets',

    emits: ['loadPreset'],
    props: ['presets'],
    computed: {
    // ...mapState(['rhythm', 'speed', 'experimental', 'mood', 'organic'])
    },
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


            // this.$store.commit('SET_PRESETS', {rhyMin: rhy[0], rhyMax:rhy[1], spdMin:spd[0], spdMax:spd[1], expMin:exp[0], expMax:exp[1], modMin:mod[0], modMax:mod[1], orgMin:org[0], orgMax:org[1]})

            // this.$store.dispatch('setPresets', {rhy: {min: rhy[0], max:rhy[1]}, spd: {min:spd[0], max:spd[1]}, exp: {min:exp[0], max:exp[1]}, mod: {min:mod[0], max:mod[1]}, org: {min:org[0], max:org[1]}})

            // const rhyOGVal = { min: Number(this.rhythm.min), max: Number(this.rhythm.max) }
            // const spdOGVal = { min: Number(this.speed.min), max: Number(this.speed.max) }
            // const expOGVal = { min: Number(this.experimental.min), max: Number(this.experimental.max) }
            // const modOGVal = { min: Number(this.mood.min), max: Number(this.mood.max) }
            // const orgOGVal = { min: Number(this.organic.min), max: Number(this.organic.max) }

            // const rhyDif = { min: Number(rhy[0] - rhyOGVal.min), max: Number(rhy[1] - rhyOGVal.max) }
            // const spdDif = { min: Number(spd[0] - spdOGVal.min), max: Number(spd[1] - spdOGVal.max) }
            // const expDif = { min: Number(exp[0] - expOGVal.min), max: Number(exp[1] - expOGVal.max) }
            // const modDif = { min: Number(mod[0] - modOGVal.min), max: Number(mod[1] - modOGVal.max) }
            // const orgDif = { min: Number(org[0] - orgOGVal.min), max: Number(org[1] - orgOGVal.max) }
            
            // this.$store.dispatch('setPresets', {rhy: rhyDif, spd: spdDif, exp: expDif, mod: modDif, org: orgDif})



            // this.$store.commit('SET_PRESET_RHY', rhyDif)
            // this.$store.commit('SET_PRESET_SPD', spdDif)
            // this.$store.commit('SET_PRESET_EXP', expDif)
            // this.$store.commit('SET_PRESET_MOD', modDif)
            // this.$store.commit('SET_PRESET_ORG', orgDif)

            // this.$store.dispatch('setPresets', {rhy: {rhyDif}, spd: spdDif, exp: expDif, mod: modDif, org: orgDif})

            // const rhyStep = { 
            //     min: rhyDif.min >= 0 ? rhyDif.min / 0.25 : rhyDif.min / -0.25,
            //     max: rhyDif.max >= 0 ? rhyDif.max / 0.25 : rhyDif.max / -0.25 }
            // const spdStep = { 
            //     min: spdDif.min >= 0 ? spdDif.min / 0.25 : spdDif.min / -0.25,
            //     max: spdDif.max >= 0 ? spdDif.max / 0.25 : spdDif.max / -0.25 }
            // const expStep = { 
            //     min: expDif.min >= 0 ? expDif.min / 0.25 : expDif.min / -0.25,
            //     max: expDif.max >= 0 ? expDif.max / 0.25 : expDif.max / -0.25 }
            // const modStep = { 
            //     min: modDif.min >= 0 ? modDif.min / 0.25 : modDif.min / -0.25,
            //     max: modDif.max >= 0 ? modDif.max / 0.25 : modDif.max / -0.25 }
            // const orgStep = { 
            //     min: orgDif.min >= 0 ? orgDif.min / 0.25 : orgDif.min / -0.25,
            //     max: orgDif.max >= 0 ? orgDif.max / 0.25 : orgDif.max / -0.25 }

            // for(let rs = 0; rs < rhyStep.min; rs++) {
            //     setTimeout(()=> {
            //         if(rhyDif.min >= 0) {
            //             this.$store.commit('SET_RHY_MIN', Number(rhyOGVal.min + (0.25 * (rs+1))))
            //         } else {
            //             this.$store.commit('SET_RHY_MIN', Number(rhyOGVal.min - (0.25 * (rs+1))))
            //         }
            //     }, Number((100/rhyStep.min) * rs))
            // }
            // for(let rs = 0; rs < rhyStep.max; rs++) {
            //     setTimeout(()=> {
            //         if(rhyDif.max >= 0) {
            //             this.$store.commit('SET_RHY_MAX', Number(rhyOGVal.max + (0.25 * (rs+1))))
            //         } else {
            //             this.$store.commit('SET_RHY_MAX', Number(rhyOGVal.max - (0.25 * (rs+1))))
            //         }
            //     }, Number((100/rhyStep.max) * rs))
            // }

            // for(let rs = 0; rs < spdStep.min; rs++) {
            //     setTimeout(()=> {
            //         if(spdDif.min >= 0) {
            //             this.$store.commit('SET_SPD_MIN', Number(spdOGVal.min + (0.25 * (rs+1))))
            //         } else {
            //             this.$store.commit('SET_SPD_MIN', Number(spdOGVal.min - (0.25 * (rs+1))))
            //         }
            //     }, Number((100/spdStep.min) * rs))
            // }
            // for(let rs = 0; rs < spdStep.max; rs++) {
            //     setTimeout(()=> {
            //         if(spdDif.max >= 0) {
            //             this.$store.commit('SET_SPD_MAX', Number(spdOGVal.max + (0.25 * (rs+1))))
            //         } else {
            //             this.$store.commit('SET_SPD_MAX', Number(spdOGVal.max - (0.25 * (rs+1))))
            //         }
            //     }, Number((100/spdStep.max) * rs))
            // }

            // for(let rs = 0; rs < expStep.min; rs++) {
            //     setTimeout(()=> {
            //         if(expDif.min >= 0) {
            //             this.$store.commit('SET_EXP_MIN', Number(expOGVal.min + (0.25 * (rs+1))))
            //         } else {
            //             this.$store.commit('SET_EXP_MIN', Number(expOGVal.min - (0.25 * (rs+1))))
            //         }
            //     }, Number((100/expStep.min) * rs))
            // }
            // for(let rs = 0; rs < expStep.max; rs++) {
            //     setTimeout(()=> {
            //         if(expDif.max >= 0) {
            //             this.$store.commit('SET_EXP_MAX', Number(expOGVal.max + (0.25 * (rs+1))))
            //         } else {
            //             this.$store.commit('SET_EXP_MAX', Number(expOGVal.max - (0.25 * (rs+1))))
            //         }
            //     }, Number((100/expStep.max) * rs))
            // }

            // for(let rs = 0; rs < modStep.min; rs++) {
            //     setTimeout(()=> {
            //         if(modDif.min >= 0) {
            //             this.$store.commit('SET_MOD_MIN', Number(modOGVal.min + (0.25 * (rs+1))))
            //         } else {
            //             this.$store.commit('SET_MOD_MIN', Number(modOGVal.min - (0.25 * (rs+1))))
            //         }
            //     }, Number((100/modStep.min) * rs))
            // }
            // for(let rs = 0; rs < modStep.max; rs++) {
            //     setTimeout(()=> {
            //         if(modDif.max >= 0) {
            //             this.$store.commit('SET_MOD_MAX', Number(modOGVal.max + (0.25 * (rs+1))))
            //         } else {
            //             this.$store.commit('SET_MOD_MAX', Number(modOGVal.max - (0.25 * (rs+1))))
            //         }
            //     }, Number((100/modStep.max) * rs))
            // }

            // for(let rs = 0; rs < orgStep.min; rs++) {
            //     setTimeout(()=> {
            //         if(orgDif.min >= 0) {
            //             this.$store.commit('SET_ORG_MIN', Number(orgOGVal.min + (0.25 * (rs+1))))
            //         } else {
            //             this.$store.commit('SET_ORG_MIN', Number(orgOGVal.min - (0.25 * (rs+1))))
            //         }
            //     }, Number((100/orgStep.min) * rs))
            // }
            // for(let rs = 0; rs < orgStep.max; rs++) {
            //     setTimeout(()=> {
            //         if(orgDif.max >= 0) {
            //             this.$store.commit('SET_ORG_MAX', Number(orgOGVal.max + (0.25 * (rs+1))))
            //         } else {
            //             this.$store.commit('SET_ORG_MAX', Number(orgOGVal.max - (0.25 * (rs+1))))
            //         }
            //     }, Number((100/orgStep.max) * rs))
            // }            
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