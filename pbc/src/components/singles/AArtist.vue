<template>

    <div class="artistBox" v-if="RelatedArtist" >
        <router-link :to="'/project/' + artist.slug">
        <img v-if="artist.img" :src="'https://pblibrary.s3.us-east-2.amazonaws.com/artists/' + artist.img" :alt="artist.name">
        <div class="screen"></div>
        <h3>{{ artist.name }}</h3>
        </router-link>
    </div>

    <div class="artistBox" v-else >
        <router-link :to="'/' + artistType + '/' + artist.ArtistSlug">
        <img v-if="artist.Img" :src="'https://pblibrary.s3.us-east-2.amazonaws.com/artists/' + artist.Img" :alt="artist.ArtistName">
        <div class="screen"></div>
        <h3>{{ artist.ArtistName }}</h3>
        </router-link>
    </div>
    
</template>

<script>
import { computed } from '@vue/reactivity'

export default {
    name: 'AArtist',
    props: { artist: Object, location: String },
    setup(props) {
        const artistType = computed(() => {
            return props.artist.Type == 'P' ? 'project' : 'artist'
        })
        const RelatedArtist = computed(() => {
            return props.location == 'related' ? true : false
        })
        return { artistType, RelatedArtist }
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
</style>