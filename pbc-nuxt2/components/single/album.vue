<template>
  <div class="wrapper">
    <div class="flex">
        <div class="div400" v-if="album">
            <img v-if="album.AlbumID" class="albumArt" :src="coverImg(album.AlbumID, null)" :alt="album.Title">
        </div>
        <div class="div400">
          <p>// PB {{ album.Type }} //</p>
          <h2>{{ album.Title }}</h2>
          <p>by <NuxtLink :to="'/project/' + album.ArtistSlug" >{{ album.Project }}</NuxtLink></p>
          <div class="actions">
            <img :src="require('~/assets/images/actions/playSong_dark.svg')" alt="Play All" @click="playAll()">
            <img :src="require('~/assets/images/actions/addToQueue_dark.svg')" alt="Add All to Queue" @click="addAll()">
            <NuxtLink :to="'/project/' + album.ArtistSlug" >
            <img :src="require('~/assets/images/actions/seeArtist_Icon_dark.svg')" alt="Artist Page">  
            </NuxtLink>
            <img :src="require('~/assets/images/actions/Share_Icon_dark.svg')" alt="Share" @click="shareURL()">
          </div>
          <p>{{ album.Description }}</p>
        </div>
    </div>
    
    <GlobalRangeSlider v-if="rangeSlider" :songCount="albumSongs.length" :type="actionType" @setRange="rangeAction($event)" @close="rangeSlider=false" />

  </div>
</template>

<script>
import GlobalRangeSlider from "~/components/global/rangeSlider"
import { mapGetters } from 'vuex'

export default {
    name: 'SingleAlbum',
    props: ['album', 'albumSongs'],
    components: { GlobalRangeSlider },
    data(){
        return {
            actionType: '',
            rangeSlider: false
        }
    },
    computed: {
        ...mapGetters({
            coverImg: 'COVER_IMG_L',
        }),
        songIDs() {
            let songIDs = []
            let leng = this.albumSongs.length
            for (let t = 0; t < leng; t++) {
                let id = this.albumSongs[t].ID
                    songIDs.push(id)
            }
            return songIDs
        }
    },
    methods: {
        playAll() {
            if(this.album.Type == 'Album') { 
                this.$store.dispatch('playThemAction', this.songIDs)
            } else {
                this.actionType = 'PLAY'
                this.rangeSlider = true
            }
        },
        addAll() {
            if(this.album.Type == 'Album') {
                this.$store.commit('ADD_ALL', this.songIDs)
            } else {
                this.actionType = 'ADD TO QUEUE'
                this.rangeSlider = true
            }
        },
        rangeAction(data) {
            let payload = { data: data, ids: this.songIDs }
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
h2 {
    margin: 7px 0;
}
.wrapper {
    width: 800px;
    max-width: 100%;
    height: 100%;
    margin: 0 auto;
}
.flex {
    display: flex;
    justify-content:center
}
.div400 {
    display: block;
    width: 380px;
    margin: 0 10px;
}
.div400 img.albumArt {
    width: 100%;
}
.actions {
    border-top: #ddd 1px solid;
    border-bottom: #ddd 1px solid;
}
@media(max-width:800px) {
    .flex {
        display: block;
        text-align: center;
    }
    .div400 {
        margin: 10px auto;
    }
}
</style>