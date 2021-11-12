<template>
    <div class="playlistTop">
        <div class="info">
            <p>// PB Playlist //</p>
            <h1>{{ playlist.PlaylistName }}</h1>
        <div class="channels">
            <img :src="require('~/assets/images/actions/playSong_light.svg')" alt="Play All" @click="playAll(playlist.Songs)">
            <img :src="require('~/assets/images/actions/addToQueue_light.svg')" alt="Add All to Queue" @click="addAll(playlist.Songs)">
            <img :src="require('~/assets/images/actions/Share_Icon_white.svg')" alt="Share" @click="shareURL()">
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SinglePlaylist',
    props: [ 'playlist' ],
    methods: {
        playAll(ids) {
            this.$store.commit('PLAY_ALL', ids)
        },
        addAll(ids) {
            this.$store.commit('ADD_ALL', ids)
        },
        shareURL() {
            let url = window.location.href
            this.$store.dispatch('CopyURL', url)
        }
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