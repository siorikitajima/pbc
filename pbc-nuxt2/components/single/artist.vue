<template>
    <div class="artistTop" v-if="artist">
        <img v-if="artist.Img" class="cover" :src="'https://pblibrary.s3.us-east-2.amazonaws.com/artists/' + artist.Img" :alt="artist.ArtistName">
        <div class="info">
        <p v-if="artist.Type == 'P'">// PB Project //</p>
        <p v-else>// PB Artist //</p>
        <h1>{{ artist.ArtistName }}</h1>
        <p>{{ artist.Bio }}</p>
        <div class="channels" v-if="artist">
            <img :src="require('~/assets/images/actions/playSong_white.svg')" alt="Play All" @click="playAll()">
            <img :src="require('~/assets/images/actions/addToQueue_white.svg')" alt="Add All to Queue" @click="addAll()">
            <img :src="require('~/assets/images/actions/Share_Icon_white.svg')" alt="Share" @click="shareURL()">
            <a :href="artist.URL" v-if="artist.URL" target="_blank">
                <img :src="require('~/assets/images/singles/Single-Artist_ws.svg')" alt="Website">
            </a>
            <a :href="artist.BandcampURL" v-if="artist.BandcampURL" target="_blank">
                <img :src="require('~/assets/images/singles/Single-Artist_BC.svg')" alt="Bandcamp">
            </a>
            <a :href="artist.SoundcloudURL" v-if="artist.SoundcloudURL" target="_blank">
                <img :src="require('~/assets/images/singles/Single-Artist_SC.svg')" alt="SoundCloud">
            </a>
            <a :href="artist.InstagramURL" v-if="artist.InstagramURL" target="_blank">
                <img :src="require('~/assets/images/singles/Single-Artist_IG.svg')" alt="Instagram"> 
            </a>  
            <a :href="artist.FacebookURL" v-if="artist.FacebookURL" target="_blank">
                <img :src="require('~/assets/images/singles/Single-Artist_FB.svg')" alt="Facebook"> 
            </a>  
            <a :href="artist.SpotifyURL" v-if="artist.SpotifyURL" target="_blank">
                <img :src="require('~/assets/images/singles/Single-Artist_SP.svg')" alt="Spotify"> 
            </a>  
        </div>
        </div>

        <GlobalRangeSlider v-if="rangeSlider" :songCount="ids.length" :type="actionType" @setRange="setRange($event)" @close="rangeSlider=false" />

    </div>
</template>

<script>
import GlobalRangeSlider from "~/components/global/rangeSlider"

export default {
    name: 'SingleArtist',
    props: [ 'artist', 'ids' ],
    components: { GlobalRangeSlider },
    data(){
        return {
            actionType: '',
            rangeSlider: false
        }
    },
    methods: {
        playAll() {
            if(this.ids.length < 10) {
                this.$store.commit('PLAY_ALL', this.ids)
            } else {
                this.actionType = 'PLAY'
                this.rangeSlider = true
            }
        },
        addAll() {
            if(this.ids.length < 10) {
                this.$store.commit('ADD_ALL', this.ids)
            } else {
                this.actionType = 'ADD TO QUEUE'
                this.rangeSlider = true
            }
        },
        setRange(data) {
            if(data.type == 'PLAY') {
                let rangeIDs = this.ids.slice(data.from, data.to)
                this.$store.commit('PLAY_ALL', rangeIDs)
            } else {
                let rangeIDs = this.ids.slice(data.from, data.to)
                let leng = Number(data.to - data.from)
                this.$store.commit('ADD_ALL', rangeIDs)
                setTimeout(() => {
                    this.$store.dispatch('addedQPanel', leng)
                }, 1000)
            }
        },
        shareURL() {
            let url = window.location.href
            this.$store.dispatch('CopyURL', url)
        }
    }
}
</script>

<style scoped>
.artistTop {
    width: 100%;
    min-height: 300px;
    height: fit-content;
    padding: 30px 0;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    text-align: center;
    color: #fff;
}
.artistTop .info {
    height: fit-content;
    width: 100%;
    padding: 20px 0;
    background: #00000088;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.artistTop .info h1 {
    margin: 15px auto;
}
.artistTop img.cover {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
}
.artistTop p, .artistTop h1 {
    width: fit-content;
    max-width: 800px;
    margin: 0 auto;
}
@media (max-width: 600px) {
.artistTop img.cover {
    min-width: 100%;
    width: auto;
    height: 100%;
}
.artistTop .info {
    width: calc(100% - 20px);
    padding: 20px 10px;
}
.artistTop {
    height: 400px;
}
}

</style>