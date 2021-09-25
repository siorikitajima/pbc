<template>

  <Search @loadSearch="updateResult($event)" />

  <div v-if="songs.length">
    <SongList :songs="fltBySearch" />
  </div>

  <div v-else> Loading... </div>

</template>

<script>
import getSongs from '../composables/getSongs'
import SongList from '../components/songtable/SongList.vue'
import { ref } from '@vue/reactivity'
import Search from '../components/filter/Search.vue'

export default {
    name: 'Result',
    components: { SongList, Search },
    setup() {
        const { songs, error, load } = getSongs()
        const search = ref('')
        load()

        return { songs, error, search } 
    },
    computed: {
        fltBySearch: function() {
            return this.songs.filter((song) => {
                return song.Title.match(this.search)
                // || song.ArtistName.match(this.search) || song.Description.match(this.search)
            })
        }
    },
    methods: {
        updateResult(searchkey) {
            this.search = searchkey;
            console.log(this.search)
        }
    }
}
</script>

<style>

</style>