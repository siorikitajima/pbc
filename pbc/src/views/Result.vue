<template>
  <div>Result</div>
  <!-- <Search :search="search" @search="updateResult" /> -->
  <input type="text" v-model="search" placeholder="Song, Artist, Instrument, etc.">
  <p>Search: {{ search }} </p>

  <div v-if="songs.length">
    <SongList :songs="fltBySearch" />
  </div>
  <div v-else> Loading... </div>
</template>

<script>
import getSongs from '../composables/getSongs'
import SongList from '../components/songtable/SongList.vue'
import { ref } from '@vue/reactivity'
// import Search from '../components/filter/Search.vue'

export default {
    name: 'Result',
    // components: { SongList, Search },
    components: { SongList },
    setup() {
        const { songs, error, load } = getSongs()
        const search = ref('')
        load()
        const updateResult = (search) => {
            console.log(search.value)
        }
        return { songs, error, search, updateResult } 
    },
    computed: {
        fltBySearch: function() {
            return this.songs.filter((song) => {
                return song.Title.match(this.search)
                // || song.ArtistName.match(this.search) || song.Description.match(this.search)
            })
        }
    }
}
</script>

<style>

</style>