<template>
<div>
    <div v-if="searchPanel" class="fullScreen" @click="searchPanel = false">
    </div>
  <div class="searchBar">
  </div>

    <input 
    class="searchBox"
    type="text" 
    :value="tempSearch" 
    placeholder="Artist, Instrument, Keyword, etc."
    autocomplete="off" 
    @focus="searchPanel = true"
    @keyup.enter="setKey({type: 'search', key: tempSearch})"
    @input="e => tempSearch = e.target.value"
    autofocus="autofocus"
    ref="theInput"
    >

    <div v-if="(filteredKeys.length > 0 && searchPanel) || tempSearch != ''">
      <ul class="searchKeys">
        <li class="searchKey" @click="setKey({type: 'search' ,key: tempSearch})" >
          <span class="pill" :data-col="'search'">keyword</span>
          {{tempSearch}}
        </li>
        <li class="searchKey" 
        v-for="(filteredKey, index) in filteredKeys" 
        @click="setKey(filteredKey)" :key="index">
          <span class="pill" :data-col="filteredKey.type">{{filteredKey.type}}</span>
          {{filteredKey.key}}
        </li>
      </ul>
    </div>
</div>

</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
    name: 'Search',
    emits: ['loadSearch'],
    props: ['search', 'searchKeys'],
    data() {
        return {
            // searchKey: props.allSearch,
            tempSearch: '',
            filteredKeys: [],
            searchPanel: true
        }
    },
    computed: {
        ...mapState(['filter']),
        ...mapGetters({
            slug: 'SLUG'
        }),
    },
    methods: {
      filterKeys() {
        if (this.tempSearch.length == 0) {
          this.filteredKeys = this.searchKeys
        }
        this.filteredKeys = this.searchKeys.filter(key => {
          return key.key.toLowerCase().match(this.tempSearch.toLowerCase())
        })
      },
      setKey(data) {
        // let alreadyHaveIt = false
        // for(let s = 0; s < this.filter.length; s++) {
        //   if (this.filteredKeys[s].key.match(data.key)) {
        //     alreadyHaveIt = true
        //   }
        // }
        // if(!alreadyHaveIt) {
          if(window.innerWidth <= 600) {
              this.$store.commit('SHOW_PLAYER')
          }
          this.searchPanel = false
          this.$emit('loadSearch')
          if (data.type == 'album') {
            this.$store.commit('addFilterAlbum', data)
          } else if (data.type == 'artist') {
            this.$store.commit('addFilterArtist', data)
          } else if (data.type == 'project') {
            this.$store.commit('addFilterProject', data)
          } else if (data.type == 'song') {
            this.$store.commit('addFilterSong', data)
          } else if (data.type == 'instrument') {
            this.$store.commit('addFilterInstrument', data)
          } else if (data.type == 'genre') {
            this.$store.commit('addFilterGenre', data)
          } else if (data.type == 'tag') {
            this.$store.commit('addFilterTag', data)
          } else if (data.type == 'mood') {
            this.$store.commit('addFilterMood', data)
          } else if (data.type == 'search') {
            this.$store.commit('addFilterSearch', data)
          }
        // this.$store.dispatch('filterSongs')
        this.tempSearch = ''
        // } else {
        //   this.$store.dispatch('flashPanel', 'This keyword is already used')
        // }
        localStorage.setItem("searchKeys", JSON.stringify(this.filter))
      }
    },
    watch: {
      tempSearch() {
        this.filterKeys()
      }
    },
    mounted() {
      const theInput = this.$refs.theInput
      theInput.focus()
    }
}
</script>

<style scoped>
.searchBar {
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  left: 0;
  background: #f2f2f2aa;
  border-bottom: #44444444 1px solid;
  /* z-index: -1; */
}

input.searchBox {
  position: absolute;
  width: fit-content;
  min-width: 240px;
  height: 30px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: 20px auto 0 auto;
  z-index: 100;
}

.searchKeys {
  width: 100vw;
  margin: 0;
  height: calc(100% - 125px);
  padding: 0 0 70px 0;
  position: fixed;
  top: 65px;
  left: 0;
  z-index: 1000;
  text-align: center;
  overflow-y: auto;
}
.searchKey {
  color: #ddd;
  width: 100%;
  display: block;
  background: #222;
  border: none;
  margin: 0 auto;
  padding: 10px 0;
  border-bottom: #444 1px solid;
  cursor: pointer;
  z-index: 300;
}
.searchKey:hover {
  background: #111;
  transition-duration: 200ms;
}
.searchKey span.pill {
  padding: 0 5px;
  border-radius: 5px;
  margin-right: 5px;
  color: #111;
}
.pill[data-col="artist"] {  background: #F94144; }
.pill[data-col="project"] {  background: #90BE6D; }
.pill[data-col="album"] {  background: #F3722C; }
.pill[data-col="song"] {  background: #43AA8B; }
.pill[data-col="instrument"] {  background: #F8961E; }
.pill[data-col="genre"] {  background: #577590; }
.pill[data-col="tag"] {  background: #F9C74F; }
.pill[data-col="mood"] {  background: #6b5790; }
.pill[data-col="search"] {  background: #666; }

.fullScreen {
  background: #00000000;
  position: absolute;
  top: 0; bottom: 0; left: 0; right: 0;
  z-index: 1;
}
@media (max-width: 800px) {
  .searchBar {
    padding: 60px 0 0 0;
    background: #f2f2f2;
    z-index: 0;
    height: calc(100% - 60px);
    overflow-y: auto;
  }
  input.searchBox {
  top: 60px;
  }
  .searchKeys {
  width: 100%;
  height: calc(100% - 125px);
  top: 125px;
    padding: 0 0 0 0;
  }
}
</style>