<template>
  <div class="pagewrapper">
    <div v-if="project">
        <SingleArtist :artist="project" />
    </div>

        <h2>// FEATURED TRACKS //</h2>
        <div v-if="featuredTracks.length">
            <SongList :fltdsongs="featuredTracks.slice(0, 5)" :dist="'project'" @passThis="passSingle($event)" @openPanel="passPanel($event)" @queueAction="updateQueue($event)" />
        </div>
        <div v-else><Loading /></div>

    <div class="bggray">
        <h2>// RELATED ARTISTS //</h2>
        <RelatedArtists v-if="project" :artist="project" />
    </div>

    <div v-if="projectsAlbums.length > 1">
            <!-- <div v-if="featuredTracks.length">
                <SongList :fltdsongs="featuredTracks.slice(5, 10)" :dist="'project'" @passThis="passSingle($event)" @openPanel="passPanel($event)" />
            </div> -->
            <div class="bggray">
                <h2>// ALBUMS //</h2>
                <ProjectsAlbums v-if="projectsAlbums" :projectsAlbums="projectsAlbums" />
            </div>
            <div v-if="featuredTracks.length">
                <SongList :fltdsongs="featuredTracks.slice(5, featuredTracks.length-1)" :dist="'project'" @passThis="passSingle($event)" @openPanel="passPanel($event)" @queueAction="updateQueue($event)" />
            </div>
    </div>    

    <div v-else>
            <div v-if="featuredTracks.length">
                <SongList :fltdsongs="featuredTracks.slice(5, featuredTracks.length-1)" :dist="'project'" @passThis="passSingle($event)" @openPanel="passPanel($event)" @queueAction="updateQueue($event)" />
            </div>
    </div>


  </div>
</template>

<script>
import SingleArtist from '../components/singles/SingleArtist.vue'
import getProject from '../composables/getProject'
import SongList from '../components/songtable/SongList.vue'
import Loading from '../components/songtable/Loading.vue'
import RelatedArtists from '../components/singles/RelatedArtists.vue'
import ProjectsAlbums from '../components/singles/ProjectsAlbums'
import getAlbums from '../composables/getAlbums'

import { ref } from '@vue/reactivity'

export default {
    name: 'SingleProjectPage',
    components: { SingleArtist, 
    SongList, RelatedArtists, Loading, ProjectsAlbums },
    emits: ['panelReq', 'singlePanel', 'queueAction'],
    props: { name: String, songs: Array },
    setup(props) {
        const theName = ref(props.name)
        // const songs = ref(props.songs)
        const { project, projecterror, loadProject } = getProject(theName.value)
        loadProject()
        const { albums, albumserror, loadAlbums } = getAlbums()
        loadAlbums()

        // const { songs, error, load } = getSongs()
        // load()

        return { project, projecterror, albums, albumserror, theName }
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
                return song.ArtistName.match(this.project.ArtistName)
            })
        },
        projectsAlbums: function() {
        return this.albums.filter((album) => {
            return album.Project === this.project.ArtistName 
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
.bggray {
    width: 100%;
    height: fit-content;
    padding: 10px 0;
    background: #ddd;
    margin-bottom: 50px;
}

</style>