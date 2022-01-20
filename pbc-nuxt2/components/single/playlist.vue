<template>
    <div class="playlistTop">
        <div class="info">
            <p>// PB Playlist //</p>
            <h1>{{ playlistInfo.PlaylistName }}</h1>
        <div class="channels">
            <img :src="require('~/assets/images/actions/playSong_light.svg')" alt="Play All" @click="playAll()">
            <img :src="require('~/assets/images/actions/addToQueue_light.svg')" alt="Add All to Queue" @click="addAll()">
            <img :src="require('~/assets/images/actions/Share_Icon_white.svg')" alt="Share" @click="shareURL()">
        </div>
        </div>
        <GlobalRangeSlider v-if="rangeSlider" :songCount="playlist.length" :type="actionType" @setRange="rangeAction($event)" @close="rangeSlider=false" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import GlobalRangeSlider from "~/components/global/rangeSlider"

export default {
    name: 'SinglePlaylist',
    props: [ 'playlistInfo' ],
    components: { GlobalRangeSlider },
    computed:{
        ...mapState(['playlist']),
    },
    data(){
        return {
            actionType: '',
            rangeSlider: false
        }
    },
    methods: {
        playAll() {
            if(this.playlist.length < 11) {           
                let payload = { data: {type: 'PLAY', from: 0, to: this.playlist.length }, ids: this.playlist }
                this.$store.dispatch('setRange', payload)
            } else {
                this.actionType = 'PLAY'
                this.rangeSlider = true
            }
        },
        addAll() {
            if(this.playlist.length < 11) {
                let payload = { data: {type: 'ADD', from: 0, to: this.playlist.length }, ids: this.playlist }
                this.$store.dispatch('setRange', payload)
            } else {
                this.actionType = 'ADD TO QUEUE'
                this.rangeSlider = true
            }
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
    background: #444;
}
.playlistTop .info {
    height: auto;
    width: 100%;
    padding: 40px 0 20px 0;
}
.playlistTop .info h1 {
    margin: 10px auto;
}

</style>