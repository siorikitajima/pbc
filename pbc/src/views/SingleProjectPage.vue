<template>
  <div class="pagewrapper">
    <div v-if="project">
        <SingleArtist :artist="project" />
    </div>
        <h2>// FEATURED TRACKS //</h2>
        <div v-if="featuredTracks.length">
            <SongList :fltdsongs="featuredTracks.slice(0,5)" :dist="'project'" @passThis="passSingle($event)" @openPanel="passPanel($event)" />
        </div>
        <div v-else><Loading /></div>

    <h2>// RELATED ARTISTS //</h2>
    <RelatedArtists :artist="project" />

    <div v-if="featuredTracks.length">
        <SongList :fltdsongs="featuredTracks.slice(6,featuredTracks.length-1)" :dist="'project'" @passThis="passSingle($event)" @openPanel="passPanel($event)" />
    </div>
    <!-- <div v-else><Loading /></div> -->
  </div>
</template>

<script>
import SingleArtist from '../components/singles/SingleArtist.vue'
import getProject from '../composables/getProject'
// import getSongs from '../composables/getSongs'
import SongList from '../components/songtable/SongList.vue'
import Loading from '../components/songtable/Loading.vue'
import RelatedArtists from '../components/singles/RelatedArtists.vue'

import { ref } from '@vue/reactivity'

export default {
    name: 'SingleProjectPage',
    components: { SingleArtist, 
    SongList, RelatedArtists, Loading },
    emits: ['panelReq', 'singlePanel'],
    props: [ 'name', 'songs' ],
    setup(props) {
        const theName = ref(props.name)
        // const songs = ref(props.songs)
        const { project, projecterror, loadProject } = getProject(theName.value)
        loadProject()

        // const { songs, error, load } = getSongs()
        // load()

        return { project, projecterror, theName }
    },
    methods: {
        passPanel(data) {
            this.$emit('panelReq', data)
        },
        passSingle(data) {
            this.$emit('singlePanel', data)
        }
    },
    computed: {
        featuredTracks: function() {
            return this.songs.filter((song) => {
                return song.ArtistName.toLowerCase().match(this.project.ArtistName.toLowerCase())
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