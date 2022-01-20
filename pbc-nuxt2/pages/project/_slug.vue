<template>
<div>
  <div class="pagewrapper" @scroll="onScroll">
    <div v-if="singproj">
        <SingleArtist :artist="singproj" :ids="songIDs" />
    </div>

        <h2 class="sectTitle">// FEATURED TRACKS //</h2>
        <div v-if="dataLoad">
            <TableSongList :fltdsongs="SearchedSongs.slice(0, 5)" :dist="'project'" />
        </div>
        <div v-else><TableLoading /></div>

    <div v-if="projectsAlbums.length > 1">
        <div class="bggray">
            <h2 class="short">// ALBUMS //</h2>
            <SingleProjectAlbums v-if="projectsAlbums" :projectsAlbums="projectsAlbums" />
        </div>

        <div v-if="dataLoad && SearchedSongs.length > 5">
            <TableSongList :fltdsongs="SearchedSongs.slice(5, 10)" :dist="'project'" />
        </div>

        <div class="bggray">
            <h2 class="short">// RELATED ARTISTS //</h2>
            <SingleRelatedArtists v-if="singproj" :artist="singproj" />
        </div>

        <div v-if="dataLoad && SearchedSongs.length > 10">
            <TableSongList :fltdsongs="SearchedSongs.slice(10, SearchedSongs.length-1)" :dist="'project'" />
        </div>
    </div>    

    <div v-else>
        <div class="bggray">
            <h2 class="short">// RELATED ARTISTS //</h2>
            <SingleRelatedArtists v-if="singproj" :artist="singproj" />
        </div>

        <div v-if="SearchedSongs.length > 5">
            <TableSongList :fltdsongs="SearchedSongs.slice(5, loadNum.loadTo)" :dist="'project'" />
        </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
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
        let theSlug = params.slug;
        let projectUrl = baseURL + '/project/' + theSlug
        let projectdata = await axios.get(projectUrl)
        let singproj = await projectdata.data
        return { theSlug, singproj }
    },
    computed: {
        ...mapState( ['albums'] ),
        ...mapGetters({
            SearchedSongs: 'SONGS_SEARCH'
        }),
        // featuredTracks: function() {
        //     return this.$store.state.songs.filter((song) => {
        //         return song.ArtistName.match(this.singproj.ArtistName)
        //     })
        // },
        projectsAlbums: function() {
        return this.$store.state.albums.filter((album) => {
            return album.Project === this.singproj.ArtistName 
        })
        },
        songIDs() {
            let songIDs = []
            let leng = this.SearchedSongs.length
            for (let t = 0; t < leng; t++) {
                let id = this.SearchedSongs[t].ID
                songIDs.push(id)
            }
            return songIDs
        }
    },
    mounted() {
        this.$store.commit('clearFilter')
        let theName = this.singproj.ArtistName
        this.$store.commit('setFilterProject', {key: theName})
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