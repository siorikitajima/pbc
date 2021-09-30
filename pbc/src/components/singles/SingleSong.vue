<template>
  <div class="wrapper">
    <div class="flex">
        <div class="div260">
        <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/' + song.CatNum +'/cover.jpg'" :alt="song.AlbumTitle">
        </div>
        <div class="div520">
          <p>// PB Track //</p>
          <h2>{{ song.Title }}</h2>
          <p>by {{ song.ArtistName }}</p>
          <div class="actions">
            <img :src="require('../../assets/images/actions/playSong_dark.svg')" alt="Play Track">
            <img :src="require('../../assets/images/actions/addToQueue_dark.svg')" alt="Add to Queue">
            <img :src="require('../../assets/images/actions/SimilarSong_Icon_dark.svg')" alt="Similar Songs" @click="openPanel(song)">
            <img :src="require('../../assets/images/actions/CustomWork_dark.svg')" alt="Custom Work">
            <img :src="require('../../assets/images/actions/Share_Icon_dark.svg')" alt="Share">
            <img :src="require('../../assets/images/actions/seeSong_Icon_dark.svg')" alt="Track Page">
            <img :src="require('../../assets/images/actions/seeArtist_Icon_dark.svg')" alt="Artist Page">  
            <button class="small">LICENSE</button> 
          </div>
          <p>{{ song.Description }}</p>

        </div>
    </div>
    <div class="flex">
        <ul class="div260">
            <li><b>Rhythm</b><span>{{ song.PBRhythm }}</span>/10</li>
            <li><b>Speed</b><span>{{ song.PBSpeed }}</span>/10</li>
            <li><b>Flow</b><span>{{ song.ShapeArc }}</span></li>
            <li><b>Duration</b><span>{{ length }}</span></li>
        </ul>
        <ul class="div260">
            <li><b>Experimental</b><span>{{ song.PBExperimental }}</span>/10</li>
            <li><b>Mood</b><span>{{ song.PBMood }}</span>/10</li>
            <li><b>Key</b><span>{{ song.MusicKey }}</span></li>
            <li><b>BPM</b><span>{{ song.BPM }}</span></li>
        </ul>
        <ul class="div260">
            <li><b>Organic</b><span>{{ song.PBOrganic }}</span>/10</li>
            <li><b>Density</b><span>5</span>/10</li>
            <li><b>Stems</b><span>{{ song.Stems }}</span></li>
            <li><b>ISRC</b><span>QM-HRH-13-00026(t)</span></li>
        </ul>
    </div>
    <div class="flex">
        <div class="div400 group">
            <p><b>Artists</b></p>
            <p>{{ song.Writers }}</p>
        </div>
        <div class="div400 group">
            <p><b>Album</b></p>
            <p>{{ song.AlbumTitle }} ({{ album }})</p>
        </div>
    </div>
    <div class="flex">
        <div class="div400 group">
            <p><b>Instruments</b></p>
            <p>{{ song.Instruments }}</p>
        </div>
        <div class="div400 group">
            <p><b>Genres/Mood</b></p>
            <p>{{ song.Genre }}, {{ song.SubGenreA }}</p>
        </div>
    </div>
    <!-- <div class="channels">
        <img :src="require('../../assets/images/singles/Single-Song_Apple.svg')" alt="Apple Music">
        <img :src="require('../../assets/images/singles/Single-Song_Bandcamp.svg')" alt="Bandcamp">
        <img :src="require('../../assets/images/singles/Single-Song_GooglePlay.svg')" alt="Google Play">
        <img :src="require('../../assets/images/singles/Single-Song_SoundCloud.svg')" alt="SoundCloud">
        <img :src="require('../../assets/images/singles/Single-Song_Spotify.svg')" alt="Spotify">   
        <img :src="require('../../assets/images/singles/Single-Song_Vimeo.svg')" alt="Vimeo">   
        <img :src="require('../../assets/images/singles/Single-Song_Youtube.svg')" alt="Youtube">   
        <img :src="require('../../assets/images/singles/Single-Song_Tidal.svg')" alt="Tidal">   
        <img :src="require('../../assets/images/singles/Single-Song_Deezer.svg')" alt="Deezer">   
    </div> -->
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'

export default {
    props: ['song', 'album'],
    emits: ['passPanel'],
    setup(props) {
        const length = computed(() => {
            return props.song.Length ? props.song.Length.slice(2) : ''
        })
        return { length }
    },
    methods: {
        openPanel(song) {
            let da = { type: 'similar', data: song}
            this.$emit('passPanel', da)
        }
    }
}
</script>

<style scoped>
h2 {
    margin: 5px 0;
}
.wrapper {
    width: 800px;
    height: 100%;
    margin: 0 auto;
}
.flex {
    display: flex;
    justify-content:center
}
.div400 {
    display: block;
    width: 380px;
    margin: 0 10px 20px 10px;
}
.div260 {
    display: block;
    width: 250px;
    margin: 5px;
}
.div520 {
    display: block;
    width: 500px;
    margin: 10px 0 10px 20px;
}
.div400.group {
    width: 354px;
    padding-left: 20px;
    position: relative;
}
.div400.group::before {
    content: '';
    width: 10px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #666;
    border-radius: 5px;
}
.div260 img {
    width: 100%;
}
ul.div260 {
    list-style: none;
    padding: 10px 0;
}
ul li {
    height: 24px;
    padding: 3px;
    margin-bottom: 5px;
    background: #ddd;
}
ul li:nth-of-type(3), ul li:nth-of-type(4) {
    background: #f2f2f2;
}
ul li span, ul li b {
    padding-left: 10px;
}
.channels {
    text-align: center;
    padding: 10px 50px 0 50px;
    border-top: #ddd 1px solid;
    border-bottom: #ddd 1px solid;
    margin: 10px 0 0 0;
}
.actions {
/*     height: fit-content;
    margin: 10px 0;
    padding: 10px 0 5px 0;
    position: relative;*/
    border-top: #ddd 1px solid;
    border-bottom: #ddd 1px solid;
}
/*.actions img, .channels img {
    width: 32px;
    height: 32px;
    margin: 0 10px 0 0;
    cursor: pointer;
    display: inline-block;
}
.actions img {
    margin: 0 16px 0 0;
}
.actions button.small {
    display: inline-block;
    position: absolute;
    top: 2px;
    margin-left: 5px;
    margin: 10px 16px 0 0;
} */
.flowWrapper {
    display: flex;
    justify-content: left;
    margin-top: 20px;
    gap: 20px;
}
img.flow {
    height: 40px;
    width: 160px;
}
</style>