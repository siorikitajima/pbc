<template>
  <div class="similarPanel">
      <div class="actions">
           <img :src="require('../../assets/images/global/Close_Icon_dark.svg')" alt="Close" @click="closePanel">
           <p>Similar Songs</p>
           <img :src="require('../../assets/images/global/share.svg')" alt="Share">
      </div>
      <div class="rPanelHead">
          <div class="coverSm">
                <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/' + ogSong.CatNum +'/cover-thumb.jpg'" :alt="ogSong.AlbumTitle">
          </div>
          <div>
            <!-- <p>Similar Songs of</p> -->
            <p><b>{{ ogSong.Title }}</b></p>
            <p>by {{ ogSong.ArtistName }}</p>
          </div>
      </div>
      <div class="similarList">
          <div v-for="song in similarList" :key="song" class="similarSong">
            <div class="coverSm">
                <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/' + song.CatNum +'/cover-thumb.jpg'" :alt="song.AlbumTitle">
            </div>
            <div>
                <p><b>{{ song.Title }}</b></p>
                <p>by {{ song.ArtistName }}</p>
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
.similarPanel {
  width: 280px;
  height: calc(100% - 160px);
  position: fixed;
  padding: 10px 0 0 0;
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