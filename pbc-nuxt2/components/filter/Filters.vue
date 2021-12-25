<template>
<div class="filterBar">
  <div class="count">
    <p>{{ songCount }} <span>Tracks</span></p>
    <button class="large"
    @click="seeResult">See Result</button>
  </div>

  <FilterAFilter type="rhythm" />
   <!-- @sendSlider="passValue($event)" :minValue.sync="rhythm.min" :maxValue.sync="rhythm.max" /> -->
  <FilterAFilter type="speed" />
   <!-- @sendSlider="passValue($event)" :minValue.sync="speed.min" :maxValue.sync="speed.max" /> -->
  <FilterAFilter type="experimental" />
   <!-- @sendSlider="passValue($event)" :minValue.sync="experimental.min" :maxValue.sync="experimental.max" /> -->
  <FilterAFilter type="mood" />
   <!-- @sendSlider="passValue($event)" :minValue.sync="mood.min" :maxValue.sync="mood.max" /> -->
  <FilterAFilter type="organic" />
   <!-- @sendSlider="passValue($event)" :minValue.sync="organic.min" :maxValue.sync="organic.max" /> -->
</div>

</template>

<script>
// import { mapState } from 'vuex';
export default {
    name: 'Filters',
    emits: ['leftPanel'],
    props: [ 'songCount' ],
    data() {
        return {
        filterItems: [],
        filterPanel: false
        }
    },
    // computed: {
    //     ...mapState(['rhythm', 'speed', 'experimental', 'mood', 'organic']),
    // },
    methods: {
      // setLocalStorage() {
      //   const query = {
      //       rhythm: this.rhythm,
      //       speed: this.speed,
      //       experimental: this.experimental,
      //       mood: this.mood,
      //       organic: this.organic
      //   }
      //   localStorage.setItem("filterValues", JSON.stringify(query))
      // },
      seeResult() {
        if(window.innerWidth <= 600) {
              this.$store.commit('SHOW_PLAYER')
          }
          this.$emit('leftPanel', { type: 'filter'})
      }
    },
    // watch: {
    //   rhythm(newV, oolV) {
    //     this.setLocalStorage()
    //   },
    //   speed(newV, oolV) {
    //     this.setLocalStorage()
    //   },
    //   experimental(newV, oolV) {
    //     this.setLocalStorage()
    //   },
    //   mood(newV, oolV) {
    //     this.setLocalStorage()
    //   },
    //   organic(newV, oolV) {
    //     this.setLocalStorage()
    //   }
    // }
    // methods: {
    //   passValue(val) {
    //         if (val.type == 'rhythm') {
    //             this.$store.commit('SET_RHY', { min: val.min, max: val.max })
    //         }
    //         if (val.type == 'speed') {
    //             this.$store.commit('SET_SPD', { min: val.min, max: val.max })
    //         }
    //         if (val.type == 'experimental') {
    //             this.$store.commit('SET_EXP', { min: val.min, max: val.max })
    //         }
    //         if (val.type == 'mood') {
    //             this.$store.commit('SET_MOD', { min: val.min, max: val.max })
    //         }
    //         if (val.type == 'organic') {
    //             this.$store.commit('SET_ORG', { min: val.min, max: val.max })
    //         }
    //         const query = {
    //             rhythm: this.rhythm,
    //             speed: this.speed,
    //             experimental: this.experimental,
    //             mood: this.mood,
    //             organic: this.organic,
    //             search: this.allSearch 
    //         }
    //         localStorage.setItem("filterValues", JSON.stringify(query))
    //     // this.$emit('loadSlider', val)
    //   }
    // }
}
</script>

<style>
.filterBar {
  width: 240px;
  height: calc(100% - 130px);
  position: absolute;
  padding: 80px 20px 50px 20px;
  top: 0;
  left: 0;
  background: #e7ecee;
  border-right: #44444444 1px solid;
  /* z-index: -1; */
}
.filterBar .count {
  margin: 0 0 20px 0;
  color: #666;
  text-align: center;
  padding: 0 ;
  font-weight: bold;
  visibility: hidden;
  display: flex;
  justify-content: space-between;
}
.filterBar .count p {
  display: block;
  padding: 7px 10px;
  border-bottom: #666;
  border-style: none none double none;
}
.filterBar .count span {
  font-weight: normal;
  font-size: 0.9em;
}
@media (max-width: 600px) {
    .filterBar {
    width: calc(100% - 40px);
    max-width: none;
    padding: 80px 20px 20px 20px;
    height: calc(100% - 100px);
    overflow-y: auto;
    }
    .filterBar .count {
      visibility: visible;
    }
}
</style>