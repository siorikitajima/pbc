<template>
  <div class="similarPanel">
      <div class="actions">
           <img :src="require('../../assets/images/global/Close_Icon_dark.svg')" alt="Close" @click="closePanel">
           <p>Similar Songs</p>
           <img :src="require('../../assets/images/global/share.svg')" alt="Share">
      </div>
      <div class="rPanelHead">
          <div class="coverSm" v-if="ogSong">
                <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/' + ogSong.CatNum +'/cover-thumb.jpg'" :alt="ogSong.AlbumTitle">
                <!-- <div class="screen">
                    <img :src="require('../../assets/images/actions/playSong_light.svg')" alt="Play">
                </div> -->
          </div>
          <div class="asname" @click="openSingle('song', ogSong)">
            <p><b>{{ ogSong.Title }}</b><img src="../../assets/images/table/eye_white.svg" alt="See More"></p>
            <p>by {{ ogSong.ArtistName }}</p>
          </div>
        <!-- <div class="song-actions">
            <img :src="require('../../assets/images/actions/addToQueue_dark.svg')" alt="Add to Queue" @click="addToQueue(song.ID)">
        </div> -->
      </div>
      <div class="similarList" v-if="similarList">
          <div v-for="song in similarList" :key="song" class="similarSong">
            <div class="coverSm" @click="playThisNow(song.ID)">
                <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/' + song.CatNum +'/cover-thumb.jpg'" :alt="song.AlbumTitle">
                <div class="screen">
                    <img :src="require('../../assets/images/actions/playSong_light.svg')" alt="Play">
                </div>
            </div>
            <div class="asname" @click="openSingle('song', song)">
                <p><b>{{ song.Title }}</b><img src="../../assets/images/table/eye.svg" alt="See More"></p>
                <p>by {{ song.ArtistName }}</p>
            </div>
            <div class="song-actions">
                <img :src="require('../../assets/images/actions/addToQueue_dark.svg')" alt="Add to Queue" @click="addToQueue(song.ID)">
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    name: 'SimilarSongs',
    props: [ 'similarList', 'ogSong' ],
    emits: [ 'closeThis', 'singlePanel' ],
    // setup(props) {
    //     const og = ref(props.ogSong)

    //     return { og }
    // }
    methods: {
        closePanel() {
            this.$emit('closeThis')
        },
        openSingle(type, da) {
            let data = { type: type, data: da }
            this.$emit('singlePanel', data)
        },
        addToQueue(songId) {
            let data = { type: 'add', data: songId }
            this.$emit('queueAction', data)
        },
        playThisNow(songId) {
            let data = { type: 'play', data: songId }
            this.$emit('queueAction', data)
        }
    }
}
</script>

<style scoped>
.similarPanel {
  width: 280px;
  height: calc(100% - 200px);
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
.similarSong:hover .song-actions, .rPanelHead:hover .song-actions {
    opacity: 1;
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
.similarSong:hover .coverSm .screen {
    opacity: 1;
    transition-duration: 200ms;
}
.rPanelHead:hover .coverSm .screen {
    opacity: 1;
    transition-duration: 200ms;
}
.actions {
    display: flex;
    padding: 0 20px 10px 20px;
    justify-content: space-between;
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
.asname:hover {
    color: #222;
    transition-duration: 200ms;
}
.rPanelHead .asname:hover {
    color: #FFF;
    transition-duration: 200ms;
}
</style>