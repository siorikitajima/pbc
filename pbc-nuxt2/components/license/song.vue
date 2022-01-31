<template>
<div class="wrapper">
    <div class="song">
        <div class="ascover" v-if="song" @click="$store.commit('PLAY_THIS', song.ID)">
            <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/' + song.CatNum +'/cover-thumb.jpg'" :alt="song.AlbumTitle">
            <div class="playing" v-if="sqPlaying[0] === song.ID">
                <img :src="require('~/assets/images/global/play-active.svg')" alt="Playing">
            </div>
            <div class="screen" v-else>
                <img :src="require('~/assets/images/actions/playSong_light.svg')" alt="Play">
            </div>
        </div>
        <div class="asname">
            <p><b>{{ song.Title }} </b></p>
            <p>by {{ song.ArtistName }}</p>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'LicenseSong',
    props: [ 'song' ],
    computed: {
        ...mapState(['sqPlaying'])
    }
}
</script>

<style scoped>
.wrapper {
        width: 100%;
        text-align: center;
    }
.song {
    display: flex;
    width: fit-content;
    margin: 0 auto;
    max-width: calc(100% - 40px);
}
.ascover {
    width: 50px;
    height: 50px;
    position: relative;
    flex-shrink: 0;
}
.ascover img, .asflow img {
    width: 100%;
}
.ascover .screen {
    width: 50px;
    height: 50px;
    background: #00000088;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
}
.ascover .playing {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
    background: #00000066;
}
.ascover .screen img, .ascover .playing img {
    width: 40px;
    height: 40px;
    padding: 5px;
}
@media (hover: hover) {
    .ascover .screen:hover {
        opacity: 1;
        transition-duration: 200ms;
    }
}
.asname {
    padding: 0 0 20px 0;
    width: fit-content;
    height: fit-content;
    flex-shrink: 0;
    margin: 3px 0 0 10px;
    text-align: left;
    max-width: inherit;
}

@media (max-width: 960px) {
    .song {
        padding-right: 50px;
    }
}
</style>