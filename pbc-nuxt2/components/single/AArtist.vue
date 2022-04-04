<template>
<div>
    <div class="artistBox" v-if="RelatedArtist" @click="$store.commit('SHOW_LOADING')" >
        <NuxtLink :to="'/project/' + artist.slug">
        <img v-if="artist.img" :src="storageURL + 'artists/thumb/' + artist.img" :alt="artist.name">
        <div class="screen"></div>
        <h3>{{ artist.name }}</h3>
        </NuxtLink>
    </div>
    <div class="artistBox" v-else @click="$store.commit('SHOW_LOADING')" >
        <NuxtLink :to="'/' + artistType + '/' + artist.ArtistSlug">
        <img v-if="artist.Img" :src="storageURL + 'artists/thumb/' + artist.Img" :alt="artist.ArtistName">
        <div class="screen"></div>
        <h3>{{ artist.ArtistName }}</h3>
        </NuxtLink>
    </div>
</div>
</template>

<script>
import storageURL from '~/assets/storage-url.js'

export default {
    name: 'AArtist',
    data() {return {
        storageURL: storageURL
    }},
    props: { artist: Object, location: String },
    computed: {
        artistType() {
            return this.artist.Type == 'P' ? 'project' : 'artist'
        },
        RelatedArtist() {
            return this.location == 'related' ? true : false
        }
    }
}
</script>

<style scoped>
.artistBox {
    width: 180px;
    height: 100px;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    text-align: center;
    color: #fff;
    margin: 10px;
}
.artistBox img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
}
.artistBox h3 {
    font-weight: normal;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.artistBox h3, .artistBox a h3 {
    width: 90%;
    font-size: 1em;
    color: #fff;
}
.artistBox .screen {
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left: 0;
    background: #00000066;
}
.artistBox:hover .screen {
    background: #00000022;
    transition-duration: 200ms;
}
@media (max-width: 600px) {
    .artistBox {
    width: calc(50vw - 20px);
    height: 80px;
    margin: 5px;
    }
}
</style>