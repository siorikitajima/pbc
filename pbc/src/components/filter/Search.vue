<template>
<div>
<div v-if="filteredKeys.length && searchPanel" class="fullScreen" @click="searchPanel = false">
</div>

  <div class="searchBar">
  </div>

    <input 
    class="searchBox"
    type="text" 
    v-model="tempSearch" 
    placeholder="Artist, Instrument, Keyword, etc."
    autocomplete="off" 
    @focus="searchPanel = true"
    @keyup.enter="setKey(tempSearch)"
    >

    <div v-if="filteredKeys.length && searchPanel">
      <ul class="searchKeys">
        <li class="searchKey" 
        v-for="filteredKey in filteredKeys" 
        @click="setKey(filteredKey.key)" :key="filteredKey.key">
          <span class="pill">{{filteredKey.type}}</span>
          {{filteredKey.key}}
        </li>
      </ul>
    </div>
</div>

</template>

<script>
import { ref } from '@vue/reactivity'
import getSearchKeys from '../../composables/getSearchKeys'

export default {
    name: 'Search',
    emits: ['loadSearch'],
    props: ['search', 'allSearch'],
    setup(props) {
      const { searchKeys, error, loadSearchKeys } = getSearchKeys()
      loadSearchKeys()
      const searchKey = ref(props.allSearch)
      const tempSearch = ref( props.search )
      const filteredKeys = ref([])
      const searchPanel = ref(false)
      return { searchKey, searchKeys, error, filteredKeys, searchPanel, tempSearch }
    },
    // computed: {
    //   clearingField: function() {
    //     if(this.clearField == true) {
    //       this.searchKey = ''
    //     }
    //   }
    // },
    methods: {
      filterKeys() {
        if (this.tempSearch.length == 0) {
          this.filteredKeys = this.searchKeys
        }
        this.filteredKeys = this.searchKeys.filter(key => {
          return key.key.toLowerCase().match(this.tempSearch.toLowerCase())
        })
      },
      setKey(key) {
        if (!this.searchKey.includes(key)) {
          this.searchKey.push(key)
        }
        this.tempSearch = ''
        // this.searchKey = key        
        this.searchPanel = false
        this.$emit('loadSearch', this.searchKey)
      }
    },
    watch: {
      tempSearch() {
        this.filterKeys()
      }
    }
}
</script>

<style scoped>
.searchBar {
  width: 100%;
  height: 80px;
  position: absolute;
  top: 0;
  left: 0;
  background: #f2f2f2aa;
  border-bottom: #44444444 1px solid;
  z-index: -1;
}

input.searchBox {
  position: absolute;
  width: fit-content;
  min-width: 240px;
  height: 30px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  /* background: #eee; */
  /* padding: 20px 0; */
  margin: 20px auto 0 auto;
  z-index: 10;
}

.searchKeys {
  width: 100vw;
  height: fit-content;
  padding: 0;
  position: fixed;
  top: 40px;
  left: 0;
  z-index: 2000;
  text-align: center;
}
.searchKey {
  color: #fff;
  width: 100%;
  display: block;
  background: #444;
  border: none;
  margin: 0 auto;
  padding: 10px 0;
  border-bottom: #666 1px solid;
  cursor: pointer;
  z-index: 300;
}
.searchKey:hover {
  background: #333;
  transition-duration: 200ms;
}
.searchKey span.pill {
  background: #0092c5;
  padding: 0 5px;
  border-radius: 5px;
  margin-right: 5px;
}
.fullScreen {
  background: #00000000;
  position: absolute;
  top: 0; bottom: 0; left: 0; right: 0;
  z-index: 0;
}
</style>