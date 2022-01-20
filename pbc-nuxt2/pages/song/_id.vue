<template>
<div>
  <div class="pagewrapper" @scroll="onScroll">
        <SingleSong v-if="singlesong" :song="singlesong" :panel="false" />
        <SingleSongInfoPage v-if="singlesong" :song="singlesong" />

        <h2 class="sectTitle">// SIMILAR SONGS //</h2>
        <div v-if="simSongData">
            <TableSongList :fltdsongs="simSongData.slice(0, loadNum.loadTo)" :dist="'song'" />
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
    name: 'SingleSongPage',
    head() {
        return {
        title: this.singlesong.Title + ' by ' + this.singlesong.ArtistName + ' || PBC',
        meta: [
        {
            hid: 'description',
            name: 'description',
            content: this.singlesong.Title + ' by ' + this.singlesong.ArtistName + '. ' + this.singlesong.Description
        },
        {
            hid: 'og:description',
            name: 'og:description',
            content: this.singlesong.Title + ' by ' + this.singlesong.ArtistName + '. ' + this.singlesong.Description
        },
        {
            hid: 'og:title',
            name: 'og:title',
            content: this.singlesong.Title + ' by ' + this.singlesong.ArtistName + ' || PBC'
        },
        {
            hid: 'og:url',
            name: 'og:url',
            content: 'https://dev-catalog.patternbased.com/song/' + this.singlesong.ID
        },
        {
            hid: 'og:image',
            name: 'og:image',
            content: 'https://pblibrary.s3.us-east-2.amazonaws.com/' + this.singlesong.CatNum +'/cover.jpg'
        }
        ]
        }
    },
    emits: ['panelReq', 'singlePanel', 'closeSingle', 'queueAction'],
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
        let theID = params.id.split("-");
        store.commit('SET_SIMOG', theID)
        let songUrl = baseURL + '/singlesong/' + theID[0]
        let songdata = await axios.get(songUrl)
        let singlesong = await songdata.data
        return { singlesong }
    },
    computed: {
        ...mapGetters({ simSongData: 'SIM_SONG_DATA' })
    },
    methods: {
        onScroll ({ target: { scrollTop, clientHeight, scrollHeight }}) {
            if (scrollTop + clientHeight >= scrollHeight) {
                this.loadMorePosts(scrollTop, clientHeight, scrollHeight)
            }
        },
        loadMorePosts(){
            let offset = this.loadNum.loadTo
            let leng = this.simSongData.length
            let leftOvers = leng - offset
            this.loadNum.offset = offset
            this.loadNum.loadTo = (leftOvers < (offset + 20)) ? leng : offset + 20
        }
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

</style>