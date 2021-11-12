<template>
  <div class="asong">
    <div class="ascover" v-if="song" @click="$store.commit('PLAY_THIS', song.ID)">
        <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/' + song.CatNum +'/cover-thumb.jpg'" :alt="song.AlbumTitle">
        <div class="playing" v-if="sqPlaying[0] === song.ID">
            <img :src="require('~/assets/images/global/play-active.svg')" alt="Playing">
        </div>
        <div class="screen" v-else>
            <img :src="require('~/assets/images/actions/playSong_light.svg')" alt="Play">
        </div>
    </div>
    <div class="asname" @click="$store.dispatch('OpenSingSonP', song.ID)">
        <p><b>{{ song.Title }} </b><img src="~/assets/images/table/eye.svg" alt="See More"></p>
        <p>by {{ song.ArtistName }}</p>
        <p><i>{{ length }}</i></p>
    </div>
    <div class="asflow">
        <img :src="require('~/assets/images/table/' + song.ShapeArc + '.png')" :alt="song.ShapeArc">
    </div>
    <div class="askey">
        <b>Key </b>{{ song.MusicKey }}
        <b>BPM </b>{{ song.BPM }}
    </div>
    <ul class="asvalues">
        <li class="rtm">{{ song.PBRhythm }}</li>
        <li class="spd">{{ song.PBSpeed }}</li>
        <li class="exp">{{ song.PBExperimental }}</li>
        <li class="mod">{{ song.PBMood }}</li>
        <li class="grd">{{ song.PBOrganic }}</li>
    </ul>
    <div class="actions">
        <img :src="require('~/assets/images/actions/playSong_dark.svg')" alt="Play Track" @click="$store.commit('PLAY_THIS', song.ID)">
        <img :src="require('~/assets/images/actions/addToQueue_dark.svg')" alt="Add to Queue" @click="$store.commit('ADD_QUEUE', song.ID)">
        <img :src="require('~/assets/images/actions/SimilarSong_Icon_dark.svg')" alt="Similar Songs" @click="$store.dispatch('OpenSimSong', song.ID)">
        <img :src="require('~/assets/images/actions/CustomWork_dark.svg')" alt="Custom Work">
        <img :src="require('~/assets/images/actions/Share_Icon_dark.svg')" alt="Share" @click="shareURL()">
        <NuxtLink :to="'/song/' + song.ID + '-' + slug(song.Title)">
        <img :src="require('~/assets/images/actions/seeSong_Icon_dark.svg')" alt="Track Page" >
        </NuxtLink>
        <NuxtLink :to="'/project/' + slug(song.ArtistName)" v-if="showProjectLink">
        <img :src="require('~/assets/images/actions/seeArtist_Icon_dark.svg')" alt="Artist Page">  
        </NuxtLink>
        <button class="small">LICENSE</button> 
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'ASong',
    props: [ 'song', 'dist' ],
    computed: {
        ...mapState(['sqPlaying']),
        ...mapGetters({
            slug: 'SLUG'
        }),
        length() {
            return this.song ? this.song.Length.slice(2) : ''
        },
        showProjectLink() {
            if(this.dist == 'project') { return false }
            else { return true }
        }
    },
    methods: {
    shareURL() {
        let url = 'https://' + window.location.hostname + '/song/' + this.song.ID + '-' + this.slug(this.song.Title)
            this.$store.dispatch('CopyURL', url)
        }
    }
}
</script>

<style scoped>
.asong {
    width: 800px;
    min-height: 60px;
    height: fit-content;
    max-width: 90%;
    margin: 5px auto;
    background: #f2f2f2;
    padding: 5px;
    display: flex;
    text-align: left;
    font-size: 0.9em;
    line-height: 1.4em;
}
.asong:hover {
    background: #ddd;
    transition-duration: 200ms;
}
.ascover {
    width: 60px;
    height: 60px;
    position: relative;
}
.ascover img, .asflow img {
    width: 100%;
}
.ascover .screen {
    width: 60px;
    height: 60px;
    background: #00000088;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
}
.ascover .playing {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 0;
    left: 0;
    background: #00000066;
}
.ascover .screen img, .ascover .playing img {
    width: 40px;
    height: 40px;
    padding: 10px;
}
.ascover .screen:hover {
    opacity: 1;
    transition-duration: 200ms;
}
.asname {
    padding-left: 10px;
    /* margin-top: -10px; */
    width: 250px;
}
.asname img {
    width: 20px;
}

.asflow {
    width: 120px;
    margin: auto 20px auto 0;
}
.askey {
    margin-top: 10px;
    width: 70px;
}
.asvalues {
    /* display: block; */
    margin: 10px 0;
}
.asvalues li {
    list-style: none;
    display: inline-block;
    width: 35px;
    height: 20px;
    margin: auto 3px auto 0;
    text-align: center;
    padding: 10px 0;
    color: #FFF;
}
.asvalues li.rtm {
    background: url('../../assets/images/table/rtm.png');
    background-size: cover;
}
.asvalues li.spd {
    background: url('../../assets/images/table/spd.png');
    background-size: cover;
}
.asvalues li.exp {
    background: url('../../assets/images/table/exp.png');
    background-size: cover;
}
.asvalues li.mod {
    background: url('../../assets/images/table/mod.png');
    background-size: cover;
}
.asvalues li.grd {
    background: url('../../assets/images/table/grd.png');
    background-size: cover;
}
.asname:hover {
    color: #222;
    transition-duration: 200ms;
}
.actions {
    display: none;
    margin: auto 10px;
}
.asong:hover .asflow, .asong:hover .askey, .asong:hover .asvalues {
    display: none;
}
.asong:hover .actions{
    display: block;
}
</style>