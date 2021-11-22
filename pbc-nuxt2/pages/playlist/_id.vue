<template>
  <div class="pagewrapper">
    <div v-if="playlistInfo">
        <SinglePlaylist :playlist="playlistInfo" />
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
        title: 'Playlist #' + this.theId[0] + ' ' + this.playlistInfo.PlaylistName + ' || PatternBased Catalog',
        meta: [
        {
            hid: 'og:title',
            name: 'og:title',
            content: 'Playlist #' + this.theId[0] + ' ' + this.playlistInfo.PlaylistName + ' || PatternBased Catalog'
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
        let theId = params.id
        let parts, theNum
        if(theId.includes('-')) {
            parts = params.id.split('-');
            theNum = parts[0]
        } else {
            theNum = theId
        }
        let playlistUrl = baseURL + '/playlist/' + theNum
        let pLdata = await axios.get(playlistUrl)
        let singplaylist = await pLdata.data.Songs
        let playlistInfo = await pLdata.data
        store.commit('SET_PLAYLIST', singplaylist)
        return { singplaylist, theId, playlistInfo }
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