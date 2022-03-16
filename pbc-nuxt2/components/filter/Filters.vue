<template>
<div class="filterBar">
  <div class="count">
    <p>{{ songCount }} <span>Tracks</span></p>
    <button class="large"
    @click="seeResult">See Result</button>
  </div>

  <FilterAFilter type="rhythm" />
  <FilterAFilter type="speed" />
  <FilterAFilter type="experimental" />
  <FilterAFilter type="mood" />
  <FilterAFilter type="organic" />
  <FilterAFilter type="density" />
</div>

</template>

<script>
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
    methods: {
      seeResult() {
        if(window.innerWidth <= 600) {
              this.$store.commit('SHOW_PLAYER')
          }
          this.$emit('leftPanel', { type: 'filter'})
      }
    },
}
</script>

<style>
.filterBar {
  width: 240px;
  height: calc(100% - 160px);
  position: absolute;
  padding: 80px 20px;
  top: 0;
  left: 0;
  background: #e7ecee;
  border-right: #44444444 1px solid;
  overflow: auto;
}
.filterBar .count {
  margin: 0 0 20px 0;
  color: #666;
  text-align: center;
  padding: 0 ;
  font-weight: bold;
  /* visibility: hidden; */
  display: none;
  /* display: flex; */
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
      /* visibility: visible; */
    display: flex;
    }
}
</style>