<template>
  <div class="pagewrapper">
    <div v-if="singproj">
        <SingleArtist :artist="singproj" :ids="songIDs" />
    </div>

        <h2 class="sectTitle">// FEATURED TRACKS //</h2>
        <div v-if="featuredTracks.length">
            <TableSongList :fltdsongs="featuredTracks.slice(0, 5)" :dist="'project'" />
        </div>
        <div v-else><TableLoading /></div>

    <div v-if="projectsAlbums.length > 1">
        <div class="bggray">
            <h2 class="short">// ALBUMS //</h2>
            <SingleProjectAlbums v-if="projectsAlbums" :projectsAlbums="projectsAlbums" />
        </div>

        <div v-if="featuredTracks.length > 5">
            <TableSongList :fltdsongs="featuredTracks.slice(5, 10)" :dist="'project'" />
        </div>

        <div class="bggray">
            <h2 class="short">// RELATED ARTISTS //</h2>
            <SingleRelatedArtists v-if="singproj" :artist="singproj" />
        </div>

        <div v-if="featuredTracks.length > 10">
            <TableSongList :fltdsongs="featuredTracks.slice(10, featuredTracks.length-1)" :dist="'project'" />
        </div>
    </div>    

    <div v-else>
        <div class="bggray">
            <h2 class="short">// RELATED ARTISTS //</h2>
            <SingleRelatedArtists v-if="singproj" :artist="singproj" />
        </div>

        <div v-if="featuredTracks.length > 5">
            <TableSongList :fltdsongs="featuredTracks.slice(5, featuredTracks.length-1)" :dist="'project'" />
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import baseURL from '~/assets/api-url.js'

export default {
    name: 'SingleProjectPage',
    head() {
        return {
        title: this.singproj.ArtistName + ' || PatternBased Project',
        meta: [
        {
            hid: 'description',
            name: 'description',
            content: this.singproj.ArtistName + '. ' + this.singproj.Bio
        },
        {
            hid: 'og:description',
            name: 'og:description',
            content: this.singproj.ArtistName + '. ' + this.singproj.Bio
        },
        {
            hid: 'og:title',
            name: 'og:title',
            content: this.singproj.ArtistName + ' || PatternBased Project'
        },
        {
            hid: 'og:url',
            name: 'og:url',
            content: 'https://dev-catalog.patternbased.com/project/' + this.singproj.ArtistSlug
        },
        {
            hid: 'og:image',
            name: 'og:image',
            content: 'https://pblibrary.s3.us-east-2.amazonaws.com/artists/' + this.singproj.Img
        }
        ]
        }
    },
    params: [ 'slug' ],
    async asyncData({ params }) {
        let theSlug = params.slug;
        let projectUrl = baseURL + '/project/' + theSlug
        let projectdata = await axios.get(projectUrl)
        let singproj = await projectdata.data
        return { singproj }
    },
    computed: {
        ...mapState( ['songs', 'albums'] ),

        featuredTracks: function() {
            return this.$store.state.songs.filter((song) => {
                return song.ArtistName.match(this.singproj.ArtistName)
            })
        },
        projectsAlbums: function() {
        return this.$store.state.albums.filter((album) => {
            return album.Project === this.singproj.ArtistName 
        })
        },
        songIDs() {
            let songIDs = []
            let leng = this.featuredTracks.length
            for (let t = 0; t < leng; t++) {
                let id = this.featuredTracks[t].ID
                songIDs.push(id)
            }
            return songIDs
        }
    }
}
</script>

<style scoped>
.pagewrapper {
    padding: 50px 0;
}
h2 {
    width: fit-content;
    font-size: 1.2em;
    margin: 40px auto 20px auto;
}
h2.short {
    margin: 20px auto 10px auto;
    color: #aaa;
}
.bggray {
    width: 100%;
    height: fit-content;
    padding: 10px 0;
    background: #ddd;
    margin-bottom: 50px;
}
</style>