<template>
<div>
  <div class="pagewrapper" @scroll="onScroll">
    <div v-if="playlistInfo">
        <SinglePlaylist :PlaylistName="playlistInfo.PlaylistName" :playlist="singplaylist" />
    </div>
    <div v-if="playlistData.length">
        <TableSongList :fltdsongs="playlistData.slice(0, loadNum.loadTo)" :dist="'song'" />
    </div>
    <div v-else><TableLoading /></div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import baseURL from '~/assets/api-url.js'

export default {
    name: 'Playlist',
    head() {
        return {
        title: 'Playlist #' + this.theNum + ' ' + this.playlistInfo.PlaylistName + ' || PatternBased Catalog',
        meta: [
            {
                hid: 'og:title',
                name: 'og:title',
                content: 'Playlist #' + this.theNum + ' ' + this.playlistInfo.PlaylistName + ' || PatternBased Catalog'
            },
            {
                hid: 'og:url',
                name: 'og:url',
                content: 'https://catalog.patternbased.com/playlist/' + this.theId
            }
        ]
        }
    },
    params: [ 'id' ],
    data() {
        return {
            loadNum: {
                offset: 0,
                loadTo: 20
            }
        }
    },
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
        let singplaylist = await JSON.parse(JSON.stringify(pLdata.data.Songs))
        let playlistInfo = await pLdata.data
        store.commit('SET_PLAYLIST', singplaylist)
        return { singplaylist, theId, theNum, playlistInfo }
    },
    computed: {
        ...mapGetters({
            slug: 'SLUG',
            playlistData: 'PLAYLIST_DATA'
        })
    },
    methods: {
        onScroll ({ target: { scrollTop, clientHeight, scrollHeight }}) {
            if (scrollTop + clientHeight >= scrollHeight) {
                this.loadMorePosts(scrollTop, clientHeight, scrollHeight)
            }
        },
        loadMorePosts(){
            let offset = this.loadNum.loadTo
            let leng = this.playlistData.length
            let leftOvers = leng - offset
            this.loadNum.offset = offset
            this.loadNum.loadTo = (leftOvers < (offset + 20)) ? leng : offset + 20
        }
    },
    mounted() {
        this.$store.commit('HIDE_LOADING')
    }
}
</script>

<style scoped>
.pagewrapper {
    padding: 50px 0;
    width: 100%;
    height: calc(100% - 100px);
    top: 0;
    left: 0;
    position: fixed;
    overflow-y: scroll;
    transition-duration: 200ms;
    z-index: 0;
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