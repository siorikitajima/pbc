<template>
  <div class="wrapper">
    <div class="flex">
        <div class="div400" v-if="album">
            <img v-if="album.AlbumID" class="albumArt" :src="'https://pblibrary.s3.us-east-2.amazonaws.com/' + album.AlbumID +'/cover.jpg'" :alt="album.Title">
        </div>
        <div class="div400">
          <p>// PB Album //</p>
          <h2>{{ album.Title }}</h2>
          <p>by {{ album.Project }}</p>
          <div class="actions">
            <img :src="require('~/assets/images/actions/playSong_dark.svg')" alt="Play All" @click="playAll(album.AlbumID, album.Tracks)">
            <img :src="require('~/assets/images/actions/addToQueue_dark.svg')" alt="Add All to Queue" @click="addAll(album.AlbumID, album.Tracks)">
            <img :src="require('~/assets/images/actions/Share_Icon_dark.svg')" alt="Share" @click="shareURL()">
            <NuxtLink :to="'/project/' + album.ArtistSlug" >
            <img :src="require('~/assets/images/actions/seeArtist_Icon_dark.svg')" alt="Artist Page">  
            </NuxtLink>
          </div>
          <p>{{ album.Description }}</p>
        </div>
    </div>
  </div>
</template>

<script>

export default {
    name: 'SingleAlbum',
    props: ['album'],

    methods: {
        playAll(albumId, tracks) {
            let songIDs = []
            if(tracks > 21) {tracks = 10}
            for (let t = 0; t < tracks; t++) {
                if(t < 9) {
                    let id = albumId + '0' + (t + 1)
                    songIDs.push(id)
                } else {
                    let id = albumId + (t + 1)
                    songIDs.push(id)
                }
            }
            this.$store.commit('PLAY_ALL', songIDs)
        },
        addAll(albumId, tracks) {
            let songIDs = []
            if(tracks > 21) {tracks = 10}
            for (let t = 0; t < tracks; t++) {
                if(t < 9) {
                    let id = albumId + '0' + (t + 1)
                    songIDs.push(id)
                } else {
                    let id = albumId + (t + 1)
                    songIDs.push(id)
                }
            }
            this.$store.commit('ADD_ALL', songIDs)
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
</style>