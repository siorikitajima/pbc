<template>
  <div class="queuePanel">
      <div class="actions">
           <img :src="require('../../assets/images/global/Close_Icon.svg')" alt="Close" @click="closePanel">
           <p>Queue</p>
           <img :src="require('../../assets/images/actions/Actions_Icon_white.svg')" alt="Actions"
            @mouseover="hover = true" @click="hover = !hover">
            <div class="actionDD" v-if="hover" @mouseover="hover = true" @mouseleave="hover = false">
                <div>
                    <img :src="require('../../assets/images/global/share_white.svg')" alt="Share"><p>Share</p>
                </div>
                <div @click="deleteAllQueue()">
                    <img :src="require('../../assets/images/actions/Delete_Icon.svg')" alt="Delete All"><p>Delete All</p>
                </div>
            </div>
      </div>
      <div class="queueList">

        <div v-if="sqEnded.length > 0">
          <div v-for="esong in sqEnded" :key="esong.ID" class="queueSong ended">
            <div class="coverSm" @click="playThisNow(esong.ID)">
                <img :src="`https://pblibrary.s3.us-east-2.amazonaws.com/${esong.CatNum}/cover-thumb.jpg`" :alt="esong.AlbumTitle">
                <div class="screen">
                    <img :src="require('../../assets/images/actions/playSong_light.svg')" alt="Play">
                </div>
            </div>
            <div>
                <p><b>{{ esong.Title }}</b></p>
                <p>by {{ esong.ArtistName }}</p>
            </div>
            <div class="song-actions">
                <img :src="require('../../assets/images/actions/Delete_Icon_dark.svg')" alt="Delete" @click="removeFromEnded(esong.ID)">
            </div>
          </div>
        </div>

        <div v-if="sqPlaying">
          <div class="queueSong playing">
            <div class="coverSm" @click="playThisFirst(sqPlaying.ID)">
                <img :src="`https://pblibrary.s3.us-east-2.amazonaws.com/${sqPlaying.CatNum}/cover-thumb.jpg`" :alt="sqPlaying.AlbumTitle">
                <div class="screen">
                    <img :src="require('../../assets/images/actions/playSong_light.svg')" alt="Play">
                </div>
            </div>
            <div>
                <p><b>{{ sqPlaying.Title }}</b></p>
                <p>by {{ sqPlaying.ArtistName }}</p>
            </div>
          </div>
        </div>

        <div v-if="spQueue.length > 0">
          <div v-for="song in spQueue" :key="song.ID" class="queueSong upcoming">
            <div class="coverSm" @click="playThisFirst(song.ID)">
                <img :src="`https://pblibrary.s3.us-east-2.amazonaws.com/${song.CatNum}/cover-thumb.jpg`" :alt="song.AlbumTitle">
                <div class="screen">
                    <img :src="require('../../assets/images/actions/playSong_light.svg')" alt="Play">
                </div>
            </div>
            <div>
                <p><b>{{ song.Title }}</b></p>
                <p>by {{ song.ArtistName }}</p>
            </div>
            <div class="song-actions">
                <img :src="require('../../assets/images/actions/Delete_Icon_dark.svg')" alt="Delete" @click="removeFromQueue(song.ID)">
            </div>
          </div>

        </div>
        <!-- <div v-else>
            <p>No Song in Queue</p>
        </div> -->
      </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'

export default {
    name: 'SimilarSongs',
    props: [ 'similarList', 'sqPlaying', 'spQueue', 'sqEnded' ],
    emits: [ 'closeThis', 'queueAction' ],
    setup() {
        const hover = ref(false)
        
        return { hover }
    },
    methods: {
        closePanel() {
            this.$emit('closeThis')
        },
        // addToQueue(songId) { ///// Preserve this method for Shopping Cart
        //     if (!localStorage.getItem("spQueue")) {
        //         localStorage.setItem("spQueue", JSON.stringify([]))
        //     }
        //     const queueItems = JSON.parse(localStorage.getItem("spQueue"))
        //     queueItems.push(songId)
        //     localStorage.setItem("spQueue", JSON.stringify(queueItems))
        //     this.spQueue = JSON.parse(localStorage.getItem("spQueue"))
        // },
        // removeFromQueue(songId) {
        //     const queueItems = JSON.parse(localStorage.getItem("spQueue"))
        //     const index = queueItems.findIndex(({ id }) => id === songId)
        //     queueItems.splice(index, 1)
        //     localStorage.setItem("spQueue", JSON.stringify(queueItems))
        //     this.spQueue = JSON.parse(localStorage.getItem("spQueue"))
        // },
        // playThisNow(songId) {
        //     if (!localStorage.getItem("spQueue")) {
        //         localStorage.setItem("spQueue", JSON.stringify([]))
        //     }
        //     const queueItems = JSON.parse(localStorage.getItem("spQueue"))
        //     songId.concat(queueItems)
        //     localStorage.setItem("spQueue", JSON.stringify(queueItems))
        //     this.spQueue = JSON.parse(localStorage.getItem("spQueue"))
        // }

        removeFromQueue(songId) {
            let data = { type: 'remove', data: songId }
            this.$emit('queueAction', data)
        },
        playThisFirst(songId) {
            let data = { type: 'skip', data: songId }
            this.$emit('queueAction', data)
        },
        removeFromEnded(songId) {
            let data = { type: 'removeEnded', data: songId }
            this.$emit('queueAction', data)
        },
        playThisNow(songId) {
            let data = { type: 'play', data: songId }
            this.$emit('queueAction', data)
        },
        deleteAllQueue() {
            let data = { type: 'deleteAll' }
            this.$emit('queueAction', data)
            this.hover = false
        }

    },
    computed: {
        // queueSongsData: function() { ///// Preserve this method for Shopping Cart
        //     this.spQueue = JSON.parse(localStorage.getItem("spQueue")) || []
        //     if(this.spQueue.length == 0 ) { return [] }
        //     else {
        //         return this.songs.filter((song) => {
        //             for(let q = 0; q < this.spQueue.length; q++) {
        //                 if(song.ID.match(this.spQueue[q])) {
        //                     return true
        //                 }
        //             }
        //             return false
        //         })
        //     }
        // }
    }
}
</script>

<style scoped>
.queuePanel {
  width: 320px;
  height: calc(100% - 180px);
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
.queueSong.upcoming:first-of-type .song-actions {
    display: none;
}
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
.queueSong.playing .coverSm .screen {
    opacity: 1;
    cursor: none;
}
.queueSong:hover .coverSm .screen {
    opacity: 1;
    transition-duration: 200ms;
}
.actions {
    display: flex;
    padding: 0 20px 10px 20px;
    justify-content: space-between;
    position: relative;
    z-index: 100;
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
.actions img:hover {
    opacity: 1;
    transition-duration: 200ms;
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
.actionDD div:hover {
    background: #111;
    transition-duration: 200ms;
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
</style>