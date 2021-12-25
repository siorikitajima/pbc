<template>
  <div class='range-slider'>
    <div class="sliderTitle">
        <div><b>{{ this.type.toUpperCase() }}</b></div>
        <div>{{minV}} - {{maxV}}</div>
    </div>
    <div class="sliderBG" :class="this.type">
      <input type="range" :min="minNum" :max="maxNum" step="0.25" v-model="minV" >
      <input type="range" :min="minNum" :max="maxNum" step="0.25" v-model="maxV" >
      <div class="fading min" :style="minSpace"></div>
      <div class="fading max" :style="maxSpace"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'AFilter',
    props: ['type'],
    data() {
    return {
      minNum: 0,
      maxNum: 10
  }},
  methods: {
      setLocalStorage() {
        const query = {
            rhythm: this.rhythm,
            speed: this.speed,
            experimental: this.experimental,
            mood: this.mood,
            organic: this.organic
        }
        localStorage.setItem("filterValues", JSON.stringify(query))
      }
  },
  computed: {
    ...mapState(['rhythm', 'speed', 'experimental', 'mood', 'organic']),
    minV: {
        get () { 
          if(this.type == 'rhythm') return this.rhythm.min
          else if(this.type == 'speed') return this.speed.min
          else if(this.type == 'experimental') return this.experimental.min
          else if(this.type == 'mood') return this.mood.min
          else if(this.type == 'organic') return this.organic.min
         },
        set (value) { 
        //   let tmp = Number(value) + 0.25
        //     if(value < 9.75) {
        //       if (value >= this.maxV) {
        //         this.maxV = tmp
        //       }
        //     } else if(value >= 9.75) {
        //       this.maxV = 0
        //     }
        // }
          let tmp = Number(value) + 0.25
            if(this.type == 'rhythm') { 
              if(value < 9.75) {
                if (value >= this.rhythm.max) {
                  this.$store.commit('SET_RHY_MAX', tmp)
                }
                this.$store.commit('SET_RHY_MIN', value) 
              } else if(value >= 9.75) {
                this.$store.commit('SET_RHY_MAX', 10)
                this.$store.commit('SET_RHY_MIN', 9.75)
              }
              }
            else if(this.type == 'speed') { 
              if(value < 9.75) {
                if (value >= this.speed.max) {
                  this.$store.commit('SET_SPD_MAX', tmp)
                }
                this.$store.commit('SET_SPD_MIN', value) 
              } else if(value >= 9.75) {
                this.$store.commit('SET_SPD_MAX', 10)
                this.$store.commit('SET_SPD_MIN', 9.75) 
              }
              }
            else if(this.type == 'experimental') { 
              if(value < 9.75) {
                if (value >= this.experimental.max) {
                  this.$store.commit('SET_EXP_MAX', tmp)
                }
                this.$store.commit('SET_EXP_MIN', value) 
              }
               else if(value >= 9.75) {
                this.$store.commit('SET_EXP_MAX', 10)
                this.$store.commit('SET_EXP_MIN', 9.75)
              }
              }
            else if(this.type == 'mood') { 
              if(value < 9.75) {
                if (value >= this.mood.max) {
                  this.$store.commit('SET_MOD_MAX', tmp)
                }
                this.$store.commit('SET_MOD_MIN', value) 
              } else if(value >= 9.75) {
                this.$store.commit('SET_MOD_MAX', 10)
                this.$store.commit('SET_MOD_MIN', 9.75)
              }
              }
            else if(this.type == 'organic') { 
              if(value < 9.75) {
                if (value >= this.organic.max) {
                  this.$store.commit('SET_ORG_MAX', tmp)
                }
                this.$store.commit('SET_ORG_MIN', value) 
              } else if(value >= 9.75) {
                this.$store.commit('SET_ORG_MAX', 10)
                this.$store.commit('SET_ORG_MIN', 9.75)
              }
            }
            // this.$store.commit('PBfilterSongs')
            this.setLocalStorage()
        }
    },
    maxV: {
        get () { 
          if(this.type == 'rhythm') return this.rhythm.max
          else if(this.type == 'speed') return this.speed.max
          else if(this.type == 'experimental') return this.experimental.max
          else if(this.type == 'mood') return this.mood.max
          else if(this.type == 'organic') return this.organic.max
         },
        set (value) { 
          let tmp = Number(value) - 0.25
            // if(value > 0.25) {
            //   if (this.minV >= value && value > 0) {
            //     this.minV = tmp
            //   }
            // } else if(value <= 0.25) {
            //   this.minV = 0
            // }
          if(this.type == 'rhythm') { 
            if(value > 0.25) {
              if (this.rhythm.min >= value) {
                this.$store.commit('SET_RHY_MIN', tmp)
              }
              this.$store.commit('SET_RHY_MAX', value) 
            } else if(value <= 0.25) {
              this.$store.commit('SET_RHY_MIN', 0)
            }
          } else if(this.type == 'speed') { 
            if(value > 0.25) {
              if (this.speed.min >= value) {
                  this.$store.commit('SET_SPD_MIN', tmp)
                }
                this.$store.commit('SET_SPD_MAX', value) 
            } else if(value <= 0.25) {
              this.$store.commit('SET_SPD_MIN', 0)
            }
          } else if(this.type == 'experimental') { 
            if(value > 0.25) {
              if (this.experimental.min >= value) {
                this.$store.commit('SET_EXP_MIN', tmp)
              }
              this.$store.commit('SET_EXP_MAX', value) 
            } else if(value <= 0.25) {
              this.$store.commit('SET_EXP_MIN', 0)
            }
          } else if(this.type == 'mood') { 
            if(value > 0.25) {
              if (this.mood.min >= value) {
                this.$store.commit('SET_MOD_MIN', tmp)
              }
              this.$store.commit('SET_MOD_MAX', value) 
            } else if(value <= 0.25) {
              this.$store.commit('SET_MOD_MIN', 0)
            }
          } else if(this.type == 'organic') { 
            if(value > 0.25) {
              if (this.organic.min >= value) {
                this.$store.commit('SET_ORG_MIN', tmp)
              }
              this.$store.commit('SET_ORG_MAX', value) 
            } else if(value <= 0.25) {
              this.$store.commit('SET_ORG_MIN', 0)
            }
          }
          this.setLocalStorage()
          // this.$store.commit('PBfilterSongs')
        }
      },
      // minPreset: {
      //   get () { 
      //     if(this.type == 'rhythm') return this.presetRhy.min
      //     else if(this.type == 'speed') return this.presetSpd.min
      //     else if(this.type == 'experimental') return this.presetExp.min
      //     else if(this.type == 'mood') return this.presetMod.min
      //     else if(this.type == 'organic') return this.presetOrg.min
      //    }
      // },
      // maxPreset: {
      //   get () { 
      //     if(this.type == 'rhythm') return this.presetRhy.max
      //     else if(this.type == 'speed') return this.presetSpd.max
      //     else if(this.type == 'experimental') return this.presetExp.max
      //     else if(this.type == 'mood') return this.presetMod.max
      //     else if(this.type == 'organic') return this.presetOrg.max
      //    }
      // },

    minSpace() {
      if(this.minV == 0) {
        return { "width": 0 } 
      } else {
        let leftSpace = ((24 * this.minV) - 3) + 'px'
        return { "width": leftSpace }
      }
      },
    maxSpace() {
      if(this.maxV == 0) {
        return { "width": 0 } 
      } else {
          let leftSpace = (240 - (24 * this.maxV) - (6 - (6 * this.maxV / 10))) + 'px'
          return { "width": leftSpace }
      }
      },
    // filterName() {
    //     if (this.type == 'speed') { return 'Speed'}
    //     else if (this.type == 'rhythm') { return 'Rhythm'}
    //     else if (this.type == 'experimental') { return 'Experimental'}
    //     else if (this.type == 'mood') { return 'Mood'}
    //     else if (this.type == 'organic') { return 'Organic'}
    // },
    // backgroundimg() {
    //     if (this.type == 'speed') { return 'speed'}
    //     else if (this.type == 'rhythm') { return 'rhythm'}
    //     else if (this.type == 'experimental') { return 'experimental'}
    //     else if (this.type == 'mood') { return 'mood'}
    //     else if (this.type == 'organic') { return 'organic'}
    // }
  // },
  // methods: {
  //   setMinValu(val) {
  //     if(this.type == 'rhythm') { 
  //       this.$store.commit('SET_RHY_MIN', val)
  //     } else if(this.type == 'speed') { 
  //       this.$store.commit('SET_SPD_MIN', val)
  //     } else if(this.type == 'experimental') { 
  //       this.$store.commit('SET_EXP_MIN', val)
  //     } else if(this.type == 'mood') { 
  //       this.$store.commit('SET_MOD_MIN', val)
  //     } else if(this.type == 'organic') { 
  //       this.$store.commit('SET_ORG_MIN', val)
  //     }
  //   },
  //   setMaxValu(val) {
  //     if(this.type == 'rhythm') { 
  //       this.$store.commit('SET_RHY_MAX', val)
  //     } else if(this.type == 'speed') { 
  //       this.$store.commit('SET_SPD_MAX', val)
  //     } else if(this.type == 'experimental') { 
  //       this.$store.commit('SET_EXP_MAX', val)
  //     } else if(this.type == 'mood') { 
  //       this.$store.commit('SET_MOD_MAX', val)
  //     } else if(this.type == 'organic') { 
  //       this.$store.commit('SET_ORG_MAX', val)
  //     }
  //   }
  }
  
  // watch: {
  //   minPreset: {
  //     handler: function(newV, oldV) {
  //       if (this.type == 'speed') { 
  //         this.$store.commit('SET_SPD_MIN', newV) 
  //       } else if (this.type == 'rhythm') { 
  //         this.$store.commit('SET_RHY_MIN', newV) 
  //       } else if (this.type == 'experimental') { 
  //         this.$store.commit('SET_EXP_MIN', newV) 
  //       } else if (this.type == 'mood') { 
  //         this.$store.commit('SET_MOD_MIN', newV) 
  //       } else if (this.type == 'organic') { 
  //         this.$store.commit('SET_ORG_MIN', newV) 
  //       }
  //     }
  //   },
  //   maxPreset: {
  //     handler: function(newV, oldV) {
  //       if (this.type == 'speed') { 
  //         this.$store.commit('SET_SPD_MAX', newV) 
  //       } else if (this.type == 'rhythm') { 
  //         this.$store.commit('SET_RHY_MAX', newV) 
  //       } else if (this.type == 'experimental') { 
  //         this.$store.commit('SET_EXP_MAX', newV) 
  //       } else if (this.type == 'mood') { 
  //         this.$store.commit('SET_MOD_MAX', newV) 
  //       } else if (this.type == 'organic') { 
  //         this.$store.commit('SET_ORG_MAX', newV) 
  //       }
  //     }
  //   }
  
  // }
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
    bottom: 0;
    height: 38px;
    background: #e7eceeaa;
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
  -moz-appearance: none;
  appearance: none;
  padding: 0;
  margin: 0;
  width: 240px;
  height: 38px;
  border: none;
  pointer-events: none;
  background: none;
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
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  pointer-events: none;
}

input[type=range]::-moz-range-track {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: none;
  width: 100%;
  height: 38px;
  /* border-radius: 1px; */
  box-shadow: none;
  border: 0;
  pointer-events: none;
}

.sliderBG {
  position: absolute;
  bottom: -5px;
  height: 38px;
  width: 100%;
  left: 0;
  background-repeat: no-repeat;
  pointer-events: none;
  /* background-position-y: 5px; */
  /* border: orange 1px solid; */
}

.sliderBG.speed {
  background-image: url('~/assets/images/filter/speed.png');
  background-size: cover;
}
.sliderBG.rhythm {
  background-image: url('~/assets/images/filter/rhythm.png');
  background-size: cover;
}
.sliderBG.experimental {
  background-image: url('~/assets/images/filter/experimental.png');
  background-size: cover;
  /* mix-blend-mode: multiply; */
}
.sliderBG.mood {
  background-image: url('~/assets/images/filter/mood.png');
  background-size: cover;
  /* mix-blend-mode: multiply; */
}
.sliderBG.organic {
  background-image: url('~/assets/images/filter/organic.png');
  background-size: cover;
  /* mix-blend-mode: multiply;*/
} 

/* input[type=range].speed::-webkit-slider-runnable-track {
  background-image: url('~/assets/images/filter/speed.png');
  background-size: cover;
}
input[type=range].speed::-moz-range-track {
  background-image: url('~/assets/images/filter/speed.png');
  background-size: cover;
}

input[type=range].rhythm::-webkit-slider-runnable-track {
  background-image: url('~/assets/images/filter/rhythm.png');
  background-size: cover;
}
input[type=range].rhythm::-moz-range-track {
  background-image: url('~/assets/images/filter/rhythm.png');
  background-size: cover;
}

input[type=range].experimental::-webkit-slider-runnable-track {
  background-image: url('~/assets/images/filter/experimental.png');
  background-size: cover;
  mix-blend-mode: multiply;
}
input[type=range].experimental::-moz-range-track {
  background-image: url('~/assets/images/filter/experimental.png');
  background-size: cover;
  mix-blend-mode: multiply;
}

input[type=range].mood::-webkit-slider-runnable-track {
  background-image: url('~/assets/images/filter/mood.png');
  background-size: cover;
  mix-blend-mode: multiply;
}
input[type=range].mood::-moz-range-track {
  background-image: url('~/assets/images/filter/mood.png');
  background-size: cover;
  mix-blend-mode: multiply;
}

input[type=range].organic::-webkit-slider-runnable-track {
  background-image: url('~/assets/images/filter/organic.png');
  background-size: cover;
  mix-blend-mode: multiply;
}
input[type=range].organic::-moz-range-track {
  background-image: url('~/assets/images/filter/organic.png');
  background-size: cover;
  mix-blend-mode: multiply;
} */

input[type=range]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  height: 46px;
  width: 6px;
  top: -8px;
  background: #0092c5;
  border-radius: 3px;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  pointer-events: auto;
}
input[type=range]::-moz-range-thumb{/*Firefox*/
  z-index: 2;
  position: relative;
  height: 46px;
  width: 6px;
  top: -4px;
  background: #0092c5;
  border-radius: 3px;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  pointer-events: auto;
  
}
input[type=range]::-ms-thumb{
  z-index: 2;
  position: relative;
  height: 46px;
  width: 6px;
  top: -4px;
  background: #0092c5;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  pointer-events: auto;
}
@media (max-width: 600px) {
    .range-slider {
    margin: 0 auto 30px auto; 
    }
}
</style>