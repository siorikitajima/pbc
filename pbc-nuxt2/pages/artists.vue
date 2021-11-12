<template>
<div>
<h2 class="first sectTitle">// PatternBased Projects //</h2>
  <div class="artistList" v-if="allProjects">
    <SingleAArtist v-for="artist in allProjects || []" :key="artist.ID" :artist="artist" :location="'aList'" />
  </div>

<h2 class="sectTitle">// PatternBased Artists //</h2>
  <div class="artistList last" v-if="allArtists">
    <SingleAArtist v-for="artist in allArtists || []" :key="artist.ID" :artist="artist" :location="'aList'" />
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ArtistList',
    head() {
        return {
        title: 'Projects and Artists || PatternBased',
        meta: [
        {
            hid: 'og:title',
            name: 'og:title',
            content: 'Projects and Artists || PatternBased'
        },
        {
            hid: 'og:url',
            name: 'og:url',
            content: 'https://dev-catalog.patternbased.com/artists'
        }
        ]
        }
    },
    computed: {
        ...mapState( ['artists'] )
    },
    computed: {
        allProjects: function() {
            return this.$store.state.artists.filter((artist) => { return artist.Type == 'P' && artist.Show == 'Y'} )
        },
        allArtists: function() {
            return this.$store.state.artists.filter((artist) => { return artist.Type == 'A' && artist.Show == 'Y'} )
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