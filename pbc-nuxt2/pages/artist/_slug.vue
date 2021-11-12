<template>
  <div class="pagewrapper">
    <div v-if="singartist">
        <SingleArtist :artist="singartist" />
    </div>

        <h2 class="sectTitle">// FEATURED TRACKS //</h2>
        <div v-if="featuredTracks.length">
            <TableSongList :fltdsongs="featuredTracks.slice(0, 5)" :dist="'project'" />
        </div>
        <div v-else><TableLoading /></div>

    <div v-if="singartist">
        <div class="bggray">
            <h2 class="short">// RELATED ARTISTS //</h2>
            <SingleRelatedArtists v-if="singartist" :artist="singartist" />
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
    name: 'SingleArtistPage',
    head() {
        return {
        title: this.singartist.ArtistName + ' || PatternBased Artist',
        meta: [
        {
            hid: 'description',
            name: 'description',
            content: this.singartist.ArtistName + '. ' + this.singartist.Bio
        },
        {
            hid: 'og:description',
            name: 'og:description',
            content: this.singartist.ArtistName + '. ' + this.singartist.Bio
        },
        {
            hid: 'og:title',
            name: 'og:title',
            content: this.singartist.ArtistName + ' || PatternBased Artist'
        },
        {
            hid: 'og:url',
            name: 'og:url',
            content: 'https://dev-catalog.patternbased.com/artist/' + this.singartist.ArtistSlug
        },
        {
            hid: 'og:image',
            name: 'og:image',
            content: 'https://pblibrary.s3.us-east-2.amazonaws.com/artists/' + this.singartist.Img
        }
        ]
        }
    },
    params: [ 'slug' ],
    async asyncData({ params }) {
        let theSlug = params.slug;
        let artistUrl = baseURL + '/artist/' + theSlug
        let artistdata = await axios.get(artistUrl)
        let singartist = await artistdata.data
        return { singartist }
    },
    computed: {
        ...mapState( ['songs'] ),

        featuredTracks: function() {
            return this.$store.state.songs.filter((song) => {
                return song.Writers.includes(this.singartist.ArtistName)
            })
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