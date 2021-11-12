<template>
  <div class="pagewrapper">
    <div v-if="singalbum">
        <SingleAlbum :album="singalbum" />
        <SingleAlbumInfo :album="singalbum" />
    </div>

        <div v-if="albumSongList.length">
            <TableSongList :fltdsongs="albumSongList" :dist="'song'" />
        </div>
        <div v-else><TableLoading /></div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import axios from 'axios';
import baseURL from '~/assets/api-url.js'

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
            content: 'https://dev-catalog.patternbased.com/album/' + this.singalbum.AlbumID
        },
        {
            hid: 'og:image',
            name: 'og:image',
            content: 'https://pblibrary.s3.us-east-2.amazonaws.com/' + this.singalbum.AlbumID + '/cover.jpg'
        }
        ]
        }
    },
    params: [ 'id' ],
    async asyncData({ params }) {
        let theId = params.id.split("-");
        let albumUrl = baseURL + '/albums/' + theId[0]
        let albumdata = await axios.get(albumUrl)
        let singalbum = await albumdata.data
        return { singalbum, theId }
    },
    computed: {
        ...mapState( ['songs'] ),
        ...mapGetters({
            slug: 'SLUG'
        }),
        albumSongList: function() {
            return this.$store.state.songs.filter((song) => {
                return song.CatNum == this.theId[0]
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
}
.bggray {
    width: 100%;
    height: fit-content;
    padding: 10px 0;
    background: #ddd;
    margin-bottom: 50px;
}
</style>