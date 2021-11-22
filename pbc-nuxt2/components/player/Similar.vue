<template>
<div>
  <div class="similarPanel">
      <div class="actions">
           <img :src="require('~/assets/images/global/Close_Icon_dark.svg')" alt="Close" @click="closePanel">
           <p>Similar Songs</p>
           <img :src="require('~/assets/images/global/share.svg')" alt="Share" @click="openShareP()">
      </div>

      <div class="rPanelHead" v-if="simOG.length > 0">
          <div class="coverSm" >
                <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/' + simOG[0].CatNum +'/cover-thumb.jpg'" :alt="simOG[0].AlbumTitle">
          </div>
          <div class="asname" @click="$store.dispatch('OpenSingSonP', simOG[0].ID)">
            <p><b>{{ simOG[0].Title }}</b>
            <!-- <img src="~/assets/images/table/eye_white.svg" alt="See More"> -->
            </p>
            <p>by {{ simOG[0].ArtistName }}</p>
          </div>
      </div>

      <div class="similarList" v-if="simSonData">
          <div v-for="song in simSonData" :key="song.ID" class="similarSong">
            <div class="coverSm" @click="playThisNow(song.ID)">
                <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/' + song.CatNum +'/cover-thumb.jpg'" :alt="song.AlbumTitle">
                <div class="screen">
                    <img :src="require('~/assets/images/actions/playSong_light.svg')" alt="Play">
                </div>
            </div>
            <div class="asname" @click="$store.dispatch('OpenSingSonP', song.ID)">
                <p><b>{{ song.Title }}</b>
                <!-- <img src="~/assets/images/table/eye.svg" alt="See More"> -->
                </p>
                <p>by {{ song.ArtistName }}</p>
            </div>
            <div class="song-actions">
                <img :src="require('~/assets/images/actions/addToQueue_dark.svg')" alt="Add to Queue" @click="addToQueue(song.ID)">
            </div>
          </div>
      </div>
  </div>
    <div v-if="name4Share" class="sharePanelScreen" @click="closeShareP"></div> 
    <div v-if="name4Share" class="name4Share">
        <label for="name">Name the Playlist to share</label>
        <input type="text" id="name" name="name" v-model="thename" >
        <button class="large" @click="post2API()">SHARE</button>
    </div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import axios from 'axios';
import baseURL from '~/assets/api-url.js'

export default {
    name: 'SimilarSongs',
    computed: {
        ...mapState(['simSonData', 'simOG']),
        ...mapGetters({
            slug: 'SLUG'
        }),
        placeholder(){
            return 'Similar Songs of ' + this.simOG[0].Title
        }
    },
    data() {
        return {
            name4Share: false,
            thename: ''
        }
    },
    methods: {
        closePanel() {
            this.$store.commit('CLOSE_SIMSON')
        },
        addToQueue(songId) {
            this.$store.commit('ADD_QUEUE', songId)
        },
        playThisNow(songId) {
            this.$store.commit('PLAY_THIS', songId)
        },
        async sharePlaylist() {
            let allIDs = []
            for(let s = 0; s < this.simSonData.length; s++) {
                allIDs.push(this.simSonData[s].ID)
            }
            let url = baseURL + '/playlist'
            return axios.post( url, {
                name: this.thename, 
                songs: allIDs
            })
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        async post2API() {
            this.name4Share = true
            const theID = await this.sharePlaylist()
            let theslug = this.slug(this.thename)
            let url = 'https://' + window.location.hostname + '/playlist/' + theID + '-' + theslug;
            this.$store.dispatch('CopyURL', url)
            this.name4Share = false
        },
        closeShareP() {
            this.name4Share = false
        },
        openShareP() {
            this.thename = this.placeholder
            this.name4Share = true
        }
    }
}
</script>

<style scoped>
.similarPanel {
  width: 280px;
  height: calc(100% - 160px);
  position: fixed;
  padding: 10px 0 40px 0;
  top: 90px;
  right: 0;
  background: #f2f2f2ee;
  border-left: #44444444 1px solid;
  border-top: #44444444 1px solid;
  border-radius: 5px 0 0 0;
  font-size: 0.9em;
  /* z-index: -1; */
}
.similarList {
  height: calc(100% - 120px);
  width: calc(100% - 40px);
  padding: 0 20px;
  overflow-y: scroll;
}
.similarSong, .rPanelHead {
    width: 100%;
    min-height: 40px;
    height: fit-content;
    padding: 15px 0;
    display: flex;
    justify-content: left;
    border-bottom: #44444444 1px solid;
    position: relative;
}
.song-actions {
    position: absolute;
    padding: 15px;
    height: 30px;
    width: 30px;
    right: 0;
    top: 5px;
    border-radius: 50%;
    background: #f8f8f8ee;
    opacity: 0;
    transition-duration: 200ms;
    transform: translateX(15px);
    cursor: pointer;
}
.song-actions img {
    width: 28px;
    height: 28px;
}
@media (hover: hover) {
.similarSong:hover .song-actions, .rPanelHead:hover .song-actions {
    opacity: 1;
}
}
.rPanelHead {
    width: calc(100% - 40px);
    padding: 20px;
    background: #00000088;
    border-bottom: none;
    color: #ebece0;
}
.coverSm {
    width: 40px;
    height: 40px;
    background: #444;
    display: block;
    margin-right: 10px;
    position: relative;
}
.coverSm img {
    width: 40px;
    height: 40px;
}
.coverSm .screen {
    width: 40px;
    height: 40px;
    background: #00000088;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
}
@media (hover: hover) {
.similarSong:hover .coverSm .screen {
    opacity: 1;
    transition-duration: 200ms;
}
.rPanelHead:hover .coverSm .screen {
    opacity: 1;
    transition-duration: 200ms;
}
}
.actions {
    display: flex;
    padding: 0 20px 10px 20px;
    justify-content: space-between;
    margin: 0;
}
.actions p {
    padding-top: 7px;
}
.actions img {
    width: 30px;
    opacity: 0.5;
    cursor: pointer;
    margin: 0;
}
@media (hover: none) {
    .song-actions {
    opacity: 1;
}
}
@media (hover: hover) {
.actions img:hover {
    opacity: 1;
    transition-duration: 200ms;
}
.asname:hover {
    color: #222;
    transition-duration: 200ms;
}
.rPanelHead .asname:hover {
    color: #FFF;
    transition-duration: 200ms;
}
}
@media (max-width: 800px) {
    .similarPanel {
        height: calc(100% - 110px);
        top: 40px;
    }
}
@media (max-width: 600px) {
    .similarPanel {
    width: 100%;
    max-width: none;
    top: 0;
    padding: 10px 0 0 0;
    height: calc(100% - 110px);
    z-index: 1000;
    }
}
</style>