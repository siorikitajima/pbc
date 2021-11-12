<template>
  <div class="pagewrapper">
    <div v-if="playlist">
        <SinglePlaylist :playlist="playlist" />
    </div>

        <div v-if="playlistData.length">
            <TableSongList :fltdsongs="playlistData" :dist="'song'" />
        </div>
        <div v-else><TableLoading /></div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import axios from 'axios';
import baseURL from '~/assets/api-url.js'

export default {
    name: 'Playlist',
    head() {
        return {
        title: 'Playlist #' + this.theId[0] + ' ' + this.playlist.PlaylistName + ' || PatternBased Catalog',
        meta: [
        {
            hid: 'og:title',
            name: 'og:title',
            content: 'Playlist #' + this.theId[0] + ' ' + this.playlist.PlaylistName + ' || PatternBased Catalog'
        },
        {
            hid: 'og:url',
            name: 'og:url',
            content: 'https://dev-catalog.patternbased.com/playlist/' + this.theId[0]
        }
        ]
        }
    },
    params: [ 'id' ],
    async asyncData({ params, store }) {
        let theId = params.id.split('-');
        let playlistUrl = baseURL + '/playlist/' + theId[0]
        let pLdata = await axios.get(playlistUrl)
        let singplaylist = await pLdata.data.Songs
        let playlist = await pLdata.data
        store.commit('SET_PLAYLIST', singplaylist)
        return { singplaylist, theId, playlist }
    },
    computed: {
        ...mapState( ['songs'] ),
        ...mapGetters({
            slug: 'SLUG',
            playlistData: 'PLAYLIST_DATA'
        })
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
}
.bggray {
    width: 100%;
    height: fit-content;
    padding: 10px 0;
    background: #ddd;
    margin-bottom: 50px;
}
</style>