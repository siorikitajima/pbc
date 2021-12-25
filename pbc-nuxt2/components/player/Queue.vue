<template>
<div>
  <div class="queuePanel" :class="{ toTheRight : similarPanel }">
      <div class="actions">
           <img :src="require('~/assets/images/global/Close_Icon.svg')" alt="Close" @click="togglePanel">
           <p>Queue</p>
           <img :src="require('~/assets/images/actions/Actions_Icon_white.svg')" alt="Actions" @click="hover = !hover">
            <div class="actionDD" v-if="hover" @mouseover="hover = true" @mouseleave="hover = false" >
                <div @click="openShareP()">
                    <img :src="require('~/assets/images/global/share_white.svg')" alt="Share"><p>Share</p>
                </div>
                <div @click="deleteAllQueue()">
                    <img :src="require('~/assets/images/actions/Delete_Icon.svg')" alt="Delete All"><p>Delete All</p>
                </div>
            </div>
      </div>
      <div class="queueList">

        <div v-if="sqEData.length > 0">
          <div v-for="esong in sqEData" :key="esong.ID" class="queueSong ended">
            <div class="coverSm" @click="playThisNow(esong.ID)">
                <img :src="coverImg(esong.CatNum, esong.ID)" :alt="esong.AlbumTitle">
                <div class="screen">
                    <img :src="require('~/assets/images/actions/playSong_light.svg')" alt="Play">
                </div>
            </div>
            <div>
                <p><b>{{ esong.Title }}</b></p>
                <p>by {{ esong.ArtistName }}</p>
            </div>
            <div class="song-actions">
                <img :src="require('~/assets/images/actions/Delete_Icon_dark.svg')" alt="Delete" @click="removeFromEnded(esong.ID)">
            </div>
          </div>
        </div>

        <div v-if="sqPData">
          <div class="queueSong playing">
            <div class="coverSm" @click="playThisFirst(sqPData.ID)">
                <img :src="coverImg(sqPData.CatNum, sqPData.ID)" :alt="sqPData.AlbumTitle">
                <div class="screen">
                    <img :src="require('~/assets/images/global/play-active.svg')" alt="Play">
                </div>
            </div>
            <div>
                <p><b>{{ sqPData.Title }}</b></p>
                <p>by {{ sqPData.ArtistName }}</p>
            </div>
          </div>
        </div>

        <div v-if="sqQData.length > 0">
          <div v-for="song in sqQData" :key="song.ID" class="queueSong upcoming">
            <div class="coverSm" @click="playThisFirst(song.ID)">
                <img :src="coverImg(song.CatNum, song.ID)" :alt="song.AlbumTitle">
                <div class="screen">
                    <img :src="require('~/assets/images/actions/playSong_light.svg')" alt="Play">
                </div>
            </div>
            <div>
                <p><b>{{ song.Title }}</b></p>
                <p>by {{ song.ArtistName }}</p>
            </div>
            <div class="song-actions">
                <img :src="require('~/assets/images/actions/Delete_Icon_dark.svg')" alt="Delete" @click="removeFromQueue(song.ID)">
            </div>
          </div>
        </div>
        <!-- <div v-else>
            <p>No Song in Queue</p>
        </div> -->
      </div>
  </div>
    <div v-if="name4Share" class="sharePanelScreen" @click="closeShareP"></div> 
    <div v-if="name4Share" class="name4Share">
        <label for="name">Name the Playlist to share</label>
        <input type="text" id="name" name="name" v-model="thename">
        <button class="large" @click="post2API()">SHARE</button>
    </div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import axios from 'axios';
import baseURL from '~/assets/api-url.js'

export default {
    name: 'Queue',
    data() {
        return {
            hover: false,
            name4Share: false,
            thename:'My Queue'
        }
    },
    computed: {
        ...mapState(['songs', 'similarPanel',
        'sqQueue', 'sqPlaying', 'sqEnded']),
        ...mapGetters({
            sqPData: 'PLAYING_DATA',
            sqQData: 'QUEUE_DATA',
            sqEData: 'ENDED_DATA',
            coverImg: 'COVER_IMG',
            slug: 'SLUG'
        }),
    },
    methods: {
        togglePanel() {
            this.$store.commit('TOGGLE_QUEUE')
        },
        removeFromQueue(songId) {
            this.$store.commit('RMV_Q', songId)
        },
        removeFromEnded(songId) {
            this.$store.commit('RMV_E', songId)
        },
        deleteAllQueue() {
            this.$store.commit('RMV_ALL')
            this.hover = false
        },
        playThisNow(songId) {
            this.$store.commit('PLAY_THIS', songId)
        },
        playThisFirst(songId) {
            this.$store.commit('PLAY_SKIP', songId)
        },
        copyURL(url) {
            this.$store.dispatch('CopyURL', url)
        },
        async sharePlaylist() {
            let allIDs = this.sqQueue.concat(this.sqPlaying, this.sqEnded)
            let url = baseURL + '/playlist'
            return axios.post(url, {
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
            this.name4Share = true
        }
    }
}
</script>

<style scoped>
.queuePanel {
  width: 320px;
  height: calc(100% - 150px);
  position: fixed;
  padding: 10px 0 0 0;
  top: 110px;
  right: 0;
  background: #333;
  border-left: #44444444 1px solid;
  border-top: #44444444 1px solid;
  border-radius: 5px 0 0 0;
  font-size: 0.9em;
  color: #FFFFFF88;
  /* z-index: -1; */
}
.queuePanel.toTheRight {
    right: 275px;
    transition-duration: 100ms;
}
.queueList {
  height: calc(100% - 65px);
  width: calc(100% - 40px);
  padding: 0 20px;
  overflow-y: scroll;
}
.queueSong {
    width: 100%;
    min-height: 40px;
    height: fit-content;
    padding: 15px 0;
    display: flex;
    justify-content: left;
    border-bottom: #FFFFFF22 1px solid;
    position: relative;
}
.queueSong.ended {
    opacity: 0.5;
}
.queueSong.playing {
    background: #FFFFFF22;
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%);
}
.song-actions {
    position: absolute;
    padding: 15px;
    height: 30px;
    width: 30px;
    right: 0;
    top: 5px;
    border-radius: 50%;
    background: #333;
    opacity: 0;
    transition-duration: 200ms;
    transform: translateX(15px);
    cursor: pointer;
}
/* .queueSong.upcoming:first-of-type .song-actions {
    display: none;
} */
.song-actions img {
    width: 28px;
    height: 28px;
}

.queueSong:hover .song-actions {
    opacity: 1;
}


.coverSm {
    width: 40px;
    height: 40px;
    background: #444;
    display: block;
    margin-right: 10px;
    cursor: pointer;
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
.coverSm .screen img {
    width: 30px;
    height: 30px;
    padding: 5px;
}
.queueSong.playing .coverSm .screen {
    opacity: 0.8;
    cursor: none;
}
@media (hover: hover) {
.queueSong:hover .coverSm .screen {
    opacity: 1;
    transition-duration: 200ms;
}
.queueSong.playing:hover .coverSm .screen {
    opacity: 0.8;
}
}
.actions {
    display: flex;
    padding: 0 20px 10px 20px;
    justify-content: space-between;
    position: relative;
    z-index: 100;
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
@media (hover: hover) {
.actions img:hover {
    opacity: 1;
    transition-duration: 200ms;
}
}
.actionDD {
    position: absolute;
    top: 40px;
    right: 10px;
    background: #222;
    border-top: #666 1px solid;
}
.actionDD div {
    width: 130px;
    height: 40px;
    padding: 5px 20px;
    border-bottom: #666 1px solid;
    background: #222;
    display: flex;
    cursor: pointer;
}
@media (hover: hover) {
.actionDD div:hover {
    background: #111;
    transition-duration: 200ms;
}
}
.actionDD div img, .actionDD div p {
    display: block;
}
.actionDD div img {
    width: 28px;
    height: 28px;
    margin-top: 7px;
}
.actionDD div p {
    font-size: 1.2em;
    margin: 2px 10px 0 10px;
}

@media (max-width: 800px) {
    .queuePanel {
        width: 320px;
        height: calc(100% - 80px);
        top: 40px;
    }
}
@media (max-width: 600px) {
    .queuePanel {
    width: 100%;
    max-width: none;
    top: 0;
    padding: 10px 0 0 0;
    height: calc(100% - 100px);
    z-index: 1000;
    border-radius: 0;
    }
}
</style>