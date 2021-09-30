<template>
  <div class="queuePanel">
      <div class="actions">
           <img :src="require('../../assets/images/global/Close_Icon.svg')" alt="Close" @click="closePanel">
           <p>Queue</p>
           <img :src="require('../../assets/images/global/share_white.svg')" alt="Share">
      </div>
      <div class="queueList">
          <div v-for="song in 10" :key="song" class="queueSong">
            <div class="coverSm">
                <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/PB13/cover-thumb.jpg'" alt="song.AlbumTitle">
            </div>
            <div>
                <p><b>Song Title</b></p>
                <p>by Orlando the Kind</p>
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
    emits: [ 'closeThis' ],
    // setup(props) {
    //     const og = ref(props.ogSong)

    //     return { og }
    // }
    methods: {
        closePanel() {
            this.$emit('closeThis')
        }
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
  height: calc(100% - 120px);
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
}

.coverSm {
    width: 40px;
    height: 40px;
    background: #444;
    display: block;
    margin-right: 10px;
}
.coverSm img {
    width: 40px;
    height: 40px;
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
}
.actions img:hover {
    opacity: 1;
    transition-duration: 200ms;
}
</style>