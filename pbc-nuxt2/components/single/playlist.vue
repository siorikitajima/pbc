<template>
    <div class="playlistTop">
        <img class="bgimg" src="~/assets/images/global/sharon-mccutcheon-kh8OsQRLJFU-unsplash.jpg" alt="">
        <div class="info">
            <p>// PB Playlist //</p>
            <h1>{{ PlaylistName }}</h1>
        <div class="channels pl">
            <button class="playlist" @click="playAll()">PLAY ALL</button> 
            <img :src="require('~/assets/images/actions/addToQueue_light.svg')" alt="Add All to Queue" @click="addAll()">
            <img :src="require('~/assets/images/actions/Share_Icon_white.svg')" alt="Share" @click="shareURL()">
        </div>
        </div>
        <GlobalRangeSlider v-if="rangeSlider" :songCount="playlist.length" :type="actionType" @setRange="rangeAction($event)" @close="rangeSlider=false" />
    </div>
</template>

<script>
import GlobalRangeSlider from "~/components/global/rangeSlider"

export default {
    name: 'SinglePlaylist',
    props: [ 'PlaylistName', 'playlist' ],
    components: { GlobalRangeSlider },
    data(){
        return {
            actionType: '',
            rangeSlider: false
        }
    },
    methods: {
        playAll() {
                let ids = JSON.parse(JSON.stringify(this.playlist))
                this.$store.dispatch('playThemAction', ids)      
        },
        addAll() {
                let ids = JSON.parse(JSON.stringify(this.playlist))
                this.$store.dispatch('AddThemAction', ids)
        },
        shareURL() {
            let url = window.location.href
            this.$store.dispatch('CopyURL', url)
        },
        rangeAction(data) {
            let payload = { data: data, ids: this.playlist }
            this.$store.dispatch('setRange', payload)
        },
    }
}
</script>

<style scoped>
.playlistTop {
    width: 100%;
    height: fit-content;
    padding: 0;
    margin: 0 auto 50px auto;
    overflow: hidden;
    text-align: center;
    color: #fff;
    background: #00000033;
    position: relative;
}
.playlistTop img.bgimg {
    width: 100%;
    height: auto;
    min-height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
}
@media screen and (max-width: 600px) {
    .playlistTop img.bgimg {
        width: 150%;
    }
}
.playlistTop .info {
    height: auto;
    width: 100%;
    padding: 40px 0 20px 0;
    z-index: 1000;
}
.playlistTop .info h1 {
    margin: 10px auto;
}
.channels.pl {
    display: flex;
    justify-content: center;
}
button.playlist {
    display: inline-block;
    margin: 0 16px 0 0;
    padding: 8px 20px;
    background-color: #d85192;
    animation: glowbtn 5s infinite;
}
button.playlist:hover {
    animation: none;
}
@keyframes glowbtn {
  0% {background-color: #d85192;}
  50% {background-color: #2e327c;}
  100% {background-color: #d85192;}
}
</style>