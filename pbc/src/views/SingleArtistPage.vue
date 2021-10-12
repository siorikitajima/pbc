<template>
  <div class="pagewrapper">
    <div v-if="artist">
        <SingleArtist :artist="artist" />
    </div>
        <h2>// FEATURED TRACKS //</h2>
        <div v-if="featuredTracks.length">
            <SongList :fltdsongs="featuredTracks.slice(0,5)" :dist="'artist'" @passThis="passSingle($event)" @openPanel="passPanel($event)" @queueAction="updateQueue($event)" />
        </div>
        <div v-else><Loading /></div>

    <h2>// RELATED ARTISTS //</h2>
    <RelatedArtists v-if="artist" :artist="artist" />

    <div v-if="featuredTracks.length > 5">
        <SongList :fltdsongs="featuredTracks.slice(5,featuredTracks.length-1)" :dist="'artist'" @passThis="passSingle($event)" @openPanel="passPanel($event)" @queueAction="updateQueue($event)" />
    </div>
    <!-- <div v-else><Loading /></div> -->
  </div>
</template>

<script>
import SingleArtist from '../components/singles/SingleArtist.vue'
import getArtist from '../composables/getArtist'
// import getSongs from '../composables/getSongs'
import SongList from '../components/songtable/SongList.vue'
import Loading from '../components/songtable/Loading.vue'
import RelatedArtists from '../components/singles/RelatedArtists.vue'

import { ref } from '@vue/reactivity'

export default {
    name: 'SingleArtistPage',
    components: { SingleArtist, SongList, RelatedArtists, Loading },
    emits: ['panelReq', 'singlePanel', 'queueAction'],
    props: { name: String, songs: Array },
    setup(props) {
        const theName = ref(props.name)
        
        const { artist, artisterror, loadArtist } = getArtist(theName.value)
        loadArtist()

        // const { songs, error, load } = getSongs()
        // load()

        return { artist, artisterror, theName }
    },
    methods: {
        passPanel(data) {
            this.$emit('panelReq', data)
        },
        passSingle(data) {
            this.$emit('singlePanel', data)
        },
        updateQueue(data) {
            this.$emit('queueAction', data)
        }
    },
    computed: {
        featuredTracks: function() {
            return this.songs.filter((song) => {
                if ( song.Writers.includes(this.artist.ArtistName) ) { return true }
                else { return false }
            })
        }
    }
}
</script>

<style scoped>
.pagewrapper {
    padding: 80px 0 50px 0;
}

h2 {
    width: fit-content;
    font-size: 1.2em;
    margin: 40px auto 20px auto;
}
</style>