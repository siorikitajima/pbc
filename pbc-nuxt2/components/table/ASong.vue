<template>
<div>
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
        <p><b>{{ song.Title }} </b> // <i>{{ length }}</i>
        <!-- <img src="~/assets/images/table/eye.svg" alt="See More"> -->
        </p>
        <p>by {{ song.ArtistName }}</p>
    </div>
    <div class="asflow">
        <img :src="require('~/assets/images/table/' + song.ShapeArc + '.png')" :alt="song.ShapeArc">
    </div>
    <div class="askey">
        <b>Key </b>{{ song.MusicKey }}<br/>
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
        <NuxtLink :to="'/song/' + song.ID + '-' + slug(song.Title)">
        <img :src="require('~/assets/images/actions/seeSong_Icon_dark.svg')" alt="Track Page" >
        </NuxtLink>
        <NuxtLink :to="'/project/' + slug(song.ArtistName)" v-if="showProjectLink">
        <img :src="require('~/assets/images/actions/seeArtist_Icon_dark.svg')" alt="Artist Page">  
        </NuxtLink>
        <img :src="require('~/assets/images/actions/Share_Icon_dark.svg')" alt="Share" @click="shareURL()">
        <img :src="require('~/assets/images/actions/CustomWork_dark.svg')" alt="Custom Work">
        <button class="small">LICENSE</button> 
    </div>
    <div class="actions mobile">
        <img class="actionBtn" :src="require('~/assets/images/actions/Actions_Icon.svg')" alt="Actions" @click="openAction()">
    </div>
  </div>
    <div class="panelScreen" v-show="mobileAction" @click="closeAction()"></div>
        <ul class="mobileActions" v-show="mobileAction" @click="closeAction()">
            <li class="actionHead">
                <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/' + song.CatNum +'/cover-thumb.jpg'" :alt="song.AlbumTitle">
                <p>{{song.Title}}</p>
            </li>
            <li @click="$store.commit('PLAY_THIS', song.ID)">
                <img :src="require('~/assets/images/actions/playSong_dark.svg')" alt="Play Track">
                <p>Play</p>
            </li>
            <li @click="$store.commit('ADD_QUEUE', song.ID)">
                <img :src="require('~/assets/images/actions/addToQueue_dark.svg')" alt="Add to Queue">
                <p>Add to Queue</p>
            </li>
            <li @click="$store.dispatch('OpenSimSong', song.ID)">
                <img :src="require('~/assets/images/actions/SimilarSong_Icon_dark.svg')" alt="Similar Songs">
                <p>Similar Songs</p>
            </li>
            <NuxtLink :to="'/song/' + song.ID + '-' + slug(song.Title)">
            <li>
                <img :src="require('~/assets/images/actions/seeSong_Icon_dark.svg')" alt="Track Page">
                <p>See Song Page</p>
            </li>
            </NuxtLink>
            <NuxtLink :to="'/project/' + slug(song.ArtistName)" v-if="showProjectLink">
            <li @click="$store.commit('PLAY_THIS', song.ID)">
                <img :src="require('~/assets/images/actions/seeArtist_Icon_dark.svg')" alt="Artist Page">
                <p>See Artist Page</p>
            </li>
            </NuxtLink>
            <li  @click="shareURL()">
                <img :src="require('~/assets/images/actions/Share_Icon_dark.svg')" alt="Share">
                <p>Share</p>
            </li>
            <li>
                <img :src="require('~/assets/images/actions/CustomWork_dark.svg')" alt="Custom Work">
                <p>Custom Work</p>
            </li>
            <li>
                <img :src="require('~/assets/images/actions/CustomWork_dark.svg')" alt="License">
                <p>License</p>
            </li>
        </ul>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'ASong',
    props: [ 'song', 'dist' ],
    data() {
        return {
            mobileAction: false
        }
    },
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
        },
    openAction() {
        this.mobileAction = true
        },
    closeAction() {
        this.mobileAction = false
        }
    }
}
</script>

<style scoped>
.asong {
    width: 800px;
    /* min-height: 60px; */
    height: fit-content;
    max-width: 90%;
    margin: 5px auto;
    background: #f2f2f2;
    padding: 5px;
    display: flex;
    justify-content: flex-end;
    text-align: left;
    font-size: 0.9em;
    line-height: 1.4em;
    overflow: hidden;
}
@media (hover: hover) {
.asong:hover {
    background: #ddd;
    transition-duration: 200ms;
}
}
.ascover {
    width: 60px;
    height: 60px;
    position: relative;
    flex-shrink: 0;
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
@media (hover: hover) {
    .ascover .screen:hover {
        opacity: 1;
        transition-duration: 200ms;
    }
}
.asname {
    padding-left: 10px;
    /* margin-top: -10px; */
    width: 200px;
    height: fit-content;
    flex-shrink: 0;
    margin-right: 10px;
}

.asflow {
    width: 100px;
    height: fit-content;
    margin: 18px 20px 0 10px;
    flex-shrink: 0;
}
.askey {
    width: inherit;
    height: fit-content;
    flex-shrink: 2;
    margin-top: 10px;
}
.asvalues {
    /* display: block; */
    height: fit-content;
    margin: 10px 0;
    flex-shrink: 0;
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
.actions {
    margin: 0;
    height: fit-content;
    width: fit-content;
    padding: 10px;
    display: none;
    margin: auto 10px;
}
.actions button {
    display: inline;
    margin-left: 5px;
}
.actions.mobile {
        display: none;
        height: fit-content;
        margin: 12px 20px 0 20px;
        position: relative;
        /* flex-shrink: 0; */
    }
.actions.mobile .actionBtn {
    position: absolute;
    left: 0;
    top: 0;
}


@media (hover: hover) and (min-width: 900px) {
    .asname:hover {
        color: #222;
        transition-duration: 200ms;
    }
    .asong:hover {
        justify-content: left;
    }
    .asong:hover .asflow, .asong:hover .askey, .asong:hover .asvalues {
        display: none;
    }
    .asong:hover .actions{
        display: block;
    }
    .asong:hover .actions.mobile{
        display: none;
    }
}
@media (hover: none) {
    .actions.mobile {
        display: block;
    }
    /* .asflow, .askey, .asvalues {
        display: none;
    } */
}
@media (max-width: 900px) {
    .askey {
        display: none;
    }
    .asong {
        justify-content:left;
        position: relative;
    }
    .actions.mobile {
        position: absolute;
        right: 20px;
        flex-shrink: 0;
    }
    .asvalues {
        position: absolute;
        right: 80px;
    }
    .asong:hover .actions.mobile{
        display: block;
    }
}
@media (max-width: 820px) {
    .asong:hover .actions{
        display: none;
    }
    .actions.mobile {
        display: block;
    }
}
@media (max-width: 800px) {
    .asflow {
        display: none;
    }
    .asname {
        flex-shrink: 0;
        /* width: fit-content; */
    }
}
@media (max-width: 650px) {
    .asvalues {
        display: none;
    }
    .asname {
        width: calc(100% - 140px);
        flex-shrink: 1;
    }
}
@media (max-width: 600px) {
    ul.mobileActions {
        bottom: 83px;
    }
}
@media (max-width: 400px) {
    .actions.mobile {
        right: 0;
    }
    .asname {
        width: calc(100% - 160px);
    }
    .asong {
        margin: 10px auto;
    }
}
</style>