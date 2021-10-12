<template>
  <div class="thePlayer">
    <div class="controller">
        <img :src="require('../../assets/images/player/Previous_btn.svg')" alt="Previous">
        <img :src="require('../../assets/images/player/Play_btn.svg')" alt="Play">
        <img :src="require('../../assets/images/player/Next_btn.svg')" alt="Next">
    </div>
    <div class="cover" v-if="song">
        <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/' + song.CatNum +'/cover-thumb.jpg'" :alt="song.AlbumTitle">
    </div>
    <div class="info">
        <p>{{ song.Title }} <span> by {{ song.ArtistName }}</span></p>
        <div class="duration"></div>
    </div>
    <div class="icons">
        <!-- <img :src="require('../../assets/images/actions/playSong_white.svg')" alt="Play"> -->
        <!-- <img :src="require('../../assets/images/actions/addToQueue_white.svg')" alt="Add to Queue"> -->
        <img :src="require('../../assets/images/actions/SimilarSong_Icon_white.svg')" alt="Similar Songs" @click="openPanel('similar', song)">
        <img :src="require('../../assets/images/actions/CustomWork_white.svg')" alt="Custom Work">
        <img :src="require('../../assets/images/actions/Share_Icon_white.svg')" alt="Share">
        <router-link :to="'/song/' + song.ID + '-' + song.slugTitle">
        <img :src="require('../../assets/images/actions/seeSong_Icon_white.svg')" alt="Track">
        </router-link>
        <router-link :to="'/project/' + song.slugArtistName">
        <img :src="require('../../assets/images/actions/seeArtist_Icon_white.svg')" alt="Artist">
        </router-link>
        <img :src="require('../../assets/images/actions/PlayList_Icon.svg')" alt="Playlist" @click="openPanel('queue', null)">
    </div>
  </div>
</template>

<script>
// import getSingleSong from '../../composables/getSingleSong'

export default {
    name: 'thePlayer',
    props: [ 'song' ],
    emits: [ 'showPanel' ],
    // setup(props) {
    //     const { singlesong, singlesongerror, singlesongload } = getSingleSong(props.songID)
    //     singlesongload()

    //     return { singlesong, singlesongerror }
    // },
    methods: {
        openPanel(panel, data) {
            let da = { type: panel, data: data}
            this.$emit('showPanel', da)
        }
    }
}
</script>

<style scoped>
.thePlayer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: calc(100% - 40px);
    height: 40px;
    padding: 10px 20px;
    background: #333;
    display: flex;
    justify-content:space-between;
    color: #ffffff88;
    font-size: 0.9em;
}
.thePlayer .controller {
    width: 160px;
    border-right: #666 1px solid;
    flex-shrink: 0;
}
.thePlayer .controller img, .thePlayer .icons img {
    height: 32px;
    margin: 4px 10px;
    cursor: pointer;
    opacity: 0.5;
}
.thePlayer .controller img:hover, .thePlayer .icons img:hover {
    opacity: 1;
    transition-duration: 200ms;
}
.thePlayer .cover {
    width: 40px;
    height: 40px;
    margin-left: 20px;
    flex-shrink: 0;
}
.thePlayer .cover img {
    width: 40px;
    aspect-ratio: 1/1;
    height: 40px;
    width: 100%;
}
.thePlayer .info {
    margin: 0 20px;
    width: inherit;
    flex-shrink: 2;
}
.thePlayer .info p span {
    font-size: 0.9em;
}
.thePlayer .info .duration {
    height: 14px;
    margin-top: 6px;
    width: 100%;
    background: #666;
}
.thePlayer .icons{
    width: fit-content;
    flex-shrink: 0;
}
</style>