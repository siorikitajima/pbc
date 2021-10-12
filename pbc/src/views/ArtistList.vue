<template>
<div>
<h2 class="first">// PatternBased Projects //</h2>
  <div class="artistList" v-if="allProjects">
    <AArtist v-for="artist in allProjects || []" :key="artist" :artist="artist" :location="'aList'" />
  </div>

<h2>// PatternBased Artists //</h2>
  <div class="artistList last" v-if="allArtists">
    <AArtist v-for="artist in allArtists || []" :key="artist" :artist="artist" :location="'aList'" />
  </div>
</div>
</template>

<script>
import getArtists from '../composables/getArtists'
import AArtist from '../components/singles/AArtist.vue'

export default {
    name: 'ArtistList',
    props: { songs: Array },
    components: { AArtist },
    setup() {
        const { artists, artistserror, loadartists } = getArtists()
        loadartists()

        return { artists, artistserror }
    },
    computed: {
        allProjects: function() {
            return this.artists.filter((artist) => { return artist.Type == 'P' && artist.Show == 'Y'} )
        },
        allArtists: function() {
            return this.artists.filter((artist) => { return artist.Type == 'A' && artist.Show == 'Y'} )
        }
    }
}
</script>

<style scoped>
.artistList {
    width: 800px;
    height: calc(100% - 100px);
    padding: 0;
    margin: 30px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
}
.artistList.last {
    margin: 30px auto 100px auto;
}
.relArtist {
    margin: 10px;
}
h2 {
    width: fit-content;
    font-size: 1.2em;
    margin: 40px auto 20px auto;
}
h2.first {
    margin: 80px auto 20px auto;
}
</style>