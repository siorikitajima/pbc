<template>
<div class="searchBar">
  <input 
  type="text" 
  v-model="searchKey" 
  autocomplete="off" 
  @input="filterKeys" 
  @change="$emit('loadSearch', searchKey)"
  >

  <div v-if="filteredKeys.length">
    <ul class="searchKeys">
      <li 
      v-for="filteredKey in filteredKeys" 
      class="searchKey"
      @click="setKey(filteredKey.key)"
      >
      {{filteredKey.key}}</li>
    </ul>
  </div>
</div>

</template>

<script>
import { ref } from 'vue'
import getSearchKeys from '../../composables/getSearchKeys'

export default {
    name: 'Search',
    emits: ['loadSearch'],
    setup() {
      const { searchKeys, error, loadSearchKeys } = getSearchKeys()
      loadSearchKeys();
      const searchKey = ref('')
      const filteredKeys = ref([])
      return { searchKey, searchKeys, error, filteredKeys }
    },

    methods: {
      filterKeys() {
        this.filteredKeys = this.searchKeys.filter(key => {
          return key.key.toLowerCase().match(this.searchKey.toLowerCase())
        })
      },
      setKey(key) {
        this.searchKey = key
        this.filteredKeys = []
      }
    }
}
</script>

<style>
.searchBar {
  position: relative;
  width: 100%;
  height: 30px;
  background: #eee;
  padding: 20px 0;
  margin-bottom: 20px;
}
.searchKeys {
    width: 100%;
    height: fit-content;
    padding: 20px 0;
    position: absolute;
    top: 40px;
    left: 0;
    background: #444;
}
.searchKey {
    color: #fff;
    display: block;
    background: none;
    border: none;
    margin: 10px auto;
}
</style>