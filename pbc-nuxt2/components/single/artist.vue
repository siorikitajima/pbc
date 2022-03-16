<template>
    <div class="artistTop" v-if="artist">
        <img v-if="artist.Img" class="cover" :src="storageURL + 'artists/' + artist.Img" :alt="artist.ArtistName">
        <div class="info">
        <p v-if="artist.Type == 'P'">// PB Project //</p>
        <p v-else>// PB Artist //</p>
        <h1>{{ artist.ArtistName }}</h1>
        <p>{{ artist.Bio }}</p>
        <div class="channels" v-if="artist">
            <div class="oneIcon">
                <img :src="require('~/assets/images/actions/playSong_white.svg')" 
                alt="Play All" @click="playAll()"
                @mouseover="showInfo['act1'] = true" @mouseleave="showInfo['act1'] = false">
                <transition name="bounce">
                    <div class="ttinfo" v-if="showInfo['act1']"><p>Play Traks</p></div>
                </transition>
            </div>
            <div class="oneIcon">
                <img :src="require('~/assets/images/actions/addToQueue_white.svg')" 
                alt="Add All to Queue" @click="addAll()"
                @mouseover="showInfo['act2'] = true" @mouseleave="showInfo['act2'] = false">
                <transition name="bounce">
                    <div class="ttinfo" v-if="showInfo['act2']"><p>Add to Queue</p></div>
                </transition>
            </div>
            <div class="oneIcon">
                <img :src="require('~/assets/images/actions/Share_Icon_white.svg')" 
                alt="Share" @click="shareURL()"
                @mouseover="showInfo['act3'] = true" @mouseleave="showInfo['act3'] = false">
                <transition name="bounce">
                    <div class="ttinfo" v-if="showInfo['act3']"><p>Share</p></div>
                </transition>
            </div>
            <div class="oneIcon">
                <a :href="artist.URL" v-if="artist.URL" target="_blank">
                    <img :src="require('~/assets/images/singles/Single-Artist_ws.svg')" 
                    alt="Website"
                    @mouseover="showInfo['act4'] = true" @mouseleave="showInfo['act4'] = false">
                </a>
                <transition name="bounce">
                    <div class="ttinfo" v-if="showInfo['act4']"><p>Website</p></div>
                </transition>
            </div>
            <div class="oneIcon">
                <a :href="artist.BandcampURL" v-if="artist.BandcampURL" target="_blank">
                    <img :src="require('~/assets/images/singles/Single-Artist_BC.svg')" 
                    alt="Bandcamp"
                    @mouseover="showInfo['act5'] = true" @mouseleave="showInfo['act5'] = false">
                </a>
                <transition name="bounce">
                    <div class="ttinfo" v-if="showInfo['act5']"><p>Bandcamp</p></div>
                </transition>
            </div>
            <div class="oneIcon">
                <a :href="artist.SoundcloudURL" v-if="artist.SoundcloudURL" target="_blank">
                    <img :src="require('~/assets/images/singles/Single-Artist_SC.svg')" 
                    alt="SoundCloud"
                    @mouseover="showInfo['act6'] = true" @mouseleave="showInfo['act6'] = false">
                </a>
                <transition name="bounce">
                    <div class="ttinfo" v-if="showInfo['act6']"><p>SoundCloud</p></div>
                </transition>
            </div>
            <div class="oneIcon">
                <a :href="artist.InstagramURL" v-if="artist.InstagramURL" target="_blank">
                    <img :src="require('~/assets/images/singles/Single-Artist_IG.svg')" 
                    alt="Instagram"
                    @mouseover="showInfo['act7'] = true" @mouseleave="showInfo['act7'] = false"> 
                </a>  
                <transition name="bounce">
                    <div class="ttinfo" v-if="showInfo['act7']"><p>Instagram</p></div>
                </transition>
            </div>
            <div class="oneIcon">
                <a :href="artist.FacebookURL" v-if="artist.FacebookURL" target="_blank">
                    <img :src="require('~/assets/images/singles/Single-Artist_FB.svg')" 
                    alt="Facebook"
                    @mouseover="showInfo['act8'] = true" @mouseleave="showInfo['act8'] = false"> 
                </a>  
                <transition name="bounce">
                    <div class="ttinfo" v-if="showInfo['act8']"><p>Facebook</p></div>
                </transition>
            </div>
            <div class="oneIcon">
                <a :href="artist.SpotifyURL" v-if="artist.SpotifyURL" target="_blank">
                    <img :src="require('~/assets/images/singles/Single-Artist_SP.svg')" 
                    alt="Spotify"
                    @mouseover="showInfo['act9'] = true" @mouseleave="showInfo['act9'] = false"> 
                </a>  
                <transition name="bounce">
                    <div class="ttinfo" v-if="showInfo['act9']"><p>Spotify</p></div>
                </transition>
            </div>
            </div>
        </div>

        <GlobalRangeSlider v-if="rangeSlider" :songCount="ids.length" :type="actionType" @setRange="rangeAction($event)" @close="rangeSlider=false" />

    </div>
</template>

<script>
import GlobalRangeSlider from "~/components/global/rangeSlider"
import storageURL from '~/assets/storage-url.js'

export default {
    name: 'SingleArtist',
    props: [ 'artist', 'ids' ],
    components: { GlobalRangeSlider },
    data(){
        return {
            actionType: '',
            rangeSlider: false,
            storageURL: storageURL,
            showInfo:
            {
            'act1': false,
            'act2': false,
            'act3': false,
            'act4': false,
            'act5': false,
            'act6': false,
            'act7': false,
            'act8': false,
            'act9': false
            }
        }
    },
    methods: {
        playAll() {
            if(this.ids.length < 11) {
                this.$store.dispatch('playThemAction', this.ids)
            } else {
                this.actionType = 'PLAY'
                this.rangeSlider = true
            }
        },
        addAll() {
            if(this.ids.length < 11) {
                this.$store.commit('ADD_ALL', this.ids)
            } else {
                this.actionType = 'ADD TO QUEUE'
                this.rangeSlider = true
            }
        },
        rangeAction(data) {
            let payload = { data: data, ids: this.ids }
            this.$store.dispatch('setRange', payload)
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
.channels {
    display: flex;
    justify-content: center;
}
.channels .oneIcon {
    position: relative;
}
.ttinfo{
    background: #333333cc;
    color: #ccc !important;
    border: #ccc 1px solid;
  }
  .ttinfo p {
      color: #ccc;
      /* font-size: 0.8em; */
  }

</style>