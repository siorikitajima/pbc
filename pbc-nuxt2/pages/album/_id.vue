<template>
<div>
  <div class="pagewrapper" @scroll="onScroll">
    <div v-if="singalbum">
        <SingleAlbum :album="singalbum" :albumSongs="SearchedSongs" />
        <SingleAlbumInfo :album="singalbum" />
    </div>
    <div v-if="dataLoad">
        <TableSongList :fltdsongs="SearchedSongs.slice(0, loadNum.loadTo)" :dist="'song'" />
    </div>
    <div v-else><TableLoading /></div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import baseURL from '~/assets/api-url.js'
import storageURL from '~/assets/storage-url.js'

export default {
    name: 'SingleAlbumPage',
    head() {
        return {
        title: this.singalbum.Title + ' || PatternBased Album',
        meta: [
        {
            hid: 'description',
            name: 'description',
            content: this.singalbum.Title + '. ' + this.singalbum.Description
        },
        {
            hid: 'og:description',
            name: 'og:description',
            content: this.singalbum.Title + '. ' + this.singalbum.Description
        },
        {
            hid: 'og:title',
            name: 'og:title',
            content: this.singalbum.Title + ' || PatternBased Album'
        },
        {
            hid: 'og:url',
            name: 'og:url',
            content: 'https://catalog.patternbased.com/album/' + this.singalbum.AlbumID
        },
        {
            hid: 'og:image',
            name: 'og:image',
            content: storageURL + this.singalbum.AlbumID + '/asset/cover.jpg'
        }
        ]
        }
    },
    params: [ 'id' ],
    data() {
        return {
            dataLoad: false,
            loadNum: {
                offset: 0,
                loadTo: 20
            }
        }
    },
    async asyncData({ params }) {
        let theId = params.id.split("-");
        let albumUrl = baseURL + '/albums/' + theId[0]
        let albumdata = await axios.get(albumUrl)
        let singalbum = await albumdata.data

        return { singalbum, theId }
    },
    computed: {
        ...mapGetters({
            slug: 'SLUG',
            SearchedSongs: 'SONGS_SEARCH'
        }),
    },
    mounted() {
        this.$store.commit('clearFilter')
        this.$store.commit('setFilterAlbum', {id: this.theId[0]})
        this.$store.commit('setOrder', 'Seq')
        this.dataLoad = true
    },
    methods: {
        onScroll ({ target: { scrollTop, clientHeight, scrollHeight }}) {
            if (scrollTop + clientHeight >= scrollHeight) {
                this.loadMorePosts(scrollTop, clientHeight, scrollHeight)
            }
        },
        loadMorePosts(){
            let offset = this.loadNum.loadTo
            let leftOvers = this.singalbum.Tracks - offset
            this.loadNum.offset = offset
            this.loadNum.loadTo = (leftOvers < (offset + 20)) ? this.singalbum.Tracks : offset + 20
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