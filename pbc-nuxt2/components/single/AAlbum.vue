<template>
  <div class="albumBox" v-if="album">
        <NuxtLink :to="'/album/' + album.AlbumID + '-'  + album.SlugName">
        <img @click="$store.commit('SHOW_LOADING')" v-if="album.AlbumID" :src="coverImg(album.AlbumID, null)" :alt="album.Title">
        <div class="screen"></div>
        <h3>{{ album.Title }}</h3>
        </NuxtLink>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'AAlbum',
    props: { album: Object },
    computed: {
        ...mapGetters({
            coverImg: 'COVER_IMG_L',
        })
    }
}

</script>

<style scoped>
.albumBox {
    width: 180px;
    height: 180px;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    text-align: center;
    color: #fff;
    margin: 10px;
}
.albumBox img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
}
.albumBox h3 {
    font-weight: normal;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}
.albumBox h3, .albumBox a h3 {
    width: 90%;
    font-size: 1em;
    color: #fff;
}
.albumBox .screen {
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left: 0;
    background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.2) 100%);
}
.albumBox:hover .screen {
    background: linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 100%);
    transition-duration: 200ms;
}

@media (max-width: 600px) {
    .albumBox {
    width: calc(50vw - 20px);
    height: calc(50vw - 20px);
    margin: 5px;
    }
}
</style>