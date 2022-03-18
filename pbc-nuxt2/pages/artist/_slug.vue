<template>
<div>
  <div class="pagewrapper" @scroll="onScroll">
    <div v-if="singartist">
        <SingleArtist :artist="singartist" :ids="songIDs" />
    </div>

        <h2 class="sectTitle">// FEATURED TRACKS //</h2>
        <div v-if="dataLoad">
            <TableSongList v-if="customFeatSongs" :fltdsongs="customFSList" :dist="'project'" />
            <TableSongList v-else :fltdsongs="SearchedSongs.slice(0, 5)" :dist="'project'" />
        </div>
        <div v-else><TableLoading /></div>

    <div v-if="singartist">
        <div class="bggray">
            <h2 class="short">// RELATED ARTISTS //</h2>
            <SingleRelatedArtists v-if="singartist" :artist="singartist" />
        </div>

        <div v-if="dataLoad && SearchedSongs.length > 5">
            <TableSongList v-if="customFeatSongs" :fltdsongs="restOfSongs" :dist="'project'" />
            <TableSongList v-else :fltdsongs="SearchedSongs.slice(5, loadNum.loadTo)" :dist="'project'" />
        </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import baseURL from '~/assets/api-url.js'
import storageURL from '~/assets/storage-url.js'

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
            content: 'https://catalog.patternbased.com/artist/' + this.singartist.ArtistSlug
        },
        {
            hid: 'og:image',
            name: 'og:image',
            content: storageURL + 'artists/' + this.singartist.Img
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
        return { theSlug, singartist }
    },
    data() {
        return {
            dataLoad: false,
            loadNum: {
                offset: 0,
                loadTo: 20
            }
        }
    },
    computed: {
        ...mapGetters({
            SearchedSongs: 'SONGS_SEARCH'
        }),

        songIDs() {
            let songIDs = []
            let leng = this.SearchedSongs.length
            for (let t = 0; t < leng; t++) {
                let id = this.SearchedSongs[t].ID
                songIDs.push(id)
            }
            return songIDs
        },
        customFeatSongs() {
            if(this.singartist.FeaturedSongs) { return true }
            else { return false }
        },
        customFSList() {
            let featSongsIDs = this.singartist.FeaturedSongs.split(',')
            let featSongsData = []
            for (let i = 0; i < featSongsIDs.length; i++) {
                this.SearchedSongs.forEach(a => {
                    if ((featSongsIDs[i].match(a.ID))) {
                        featSongsData.push(a)
                    }
                })}
            return featSongsData 
        },
        restOfSongs() {
            let featSongsIDs = this.singartist.FeaturedSongs.split(',')
            let restSongsData = this.SearchedSongs
            for (let i = 0; i < featSongsIDs.length; i++) {
                restSongsData.forEach(a => {
                    if ((featSongsIDs[i].match(a.ID))) {
                        let index = restSongsData.indexOf(a)
                        restSongsData.splice(index, 1);
                    }
                })}
            return restSongsData 
        }
    },
    mounted() {
        this.$store.commit('clearFilter')
        this.$store.commit('setFilterArtist', {id: this.theSlug})
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
            let leng = this.SearchedSongs.length
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