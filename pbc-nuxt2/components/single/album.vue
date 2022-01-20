<template>
  <div class="wrapper">
    <div class="flex">
        <div class="div400" v-if="album">
            <img v-if="album.AlbumID" class="albumArt" :src="'https://pblibrary.s3.us-east-2.amazonaws.com/' + album.AlbumID +'/cover.jpg'" :alt="album.Title">
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
                // let songIDs = []
                // let leng = (this.album.Type == 'Album') ? this.albumSongs.length : 10
                
                // for (let t = 0; t < leng; t++) {
                //     let id = this.albumSongs[t].ID
                //         songIDs.push(id)
                // }
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
        // setRange(data) {
        //     if(data.type == 'PLAY') {
        //         let rangeIDs = this.songIDs.slice(data.from, data.to)
        //         this.$store.dispatch('PlayAllIDs', rangeIDs)
        //         setTimeout(()=> {
        //             let thelen = rangeIDs.length
        //             let theRest = rangeIDs.splice(1, thelen - 1)
        //             this.$store.commit('ADD_ALL', theRest)
        //             let leng = Number(data.to - data.from)
        //             setTimeout(() => {
        //                 this.$store.dispatch('addedQPanel', leng)
        //             }, 1000)
        //         }, 3000)
        //     } else {
        //         let rangeIDs = this.songIDs.slice(data.from, data.to)
        //         let leng = Number(data.to - data.from)
        //         this.$store.commit('ADD_ALL', rangeIDs)
        //         setTimeout(() => {
        //             this.$store.dispatch('addedQPanel', leng)
        //         }, 1000)
        //     }
        // },
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