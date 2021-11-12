<template>
<div>
    <div class="artistBox" v-if="RelatedArtist" >
        <NuxtLink :to="'/project/' + artist.slug">
        <img v-if="artist.img" :src="'https://pblibrary.s3.us-east-2.amazonaws.com/artists/' + artist.img" :alt="artist.name">
        <div class="screen"></div>
        <h3>{{ artist.name }}</h3>
        </NuxtLink>
    </div>
    <div class="artistBox" v-else >
        <NuxtLink :to="'/' + artistType + '/' + artist.ArtistSlug">
        <img v-if="artist.Img" :src="'https://pblibrary.s3.us-east-2.amazonaws.com/artists/' + artist.Img" :alt="artist.ArtistName">
        <div class="screen"></div>
        <h3>{{ artist.ArtistName }}</h3>
        </NuxtLink>
    </div>
</div>
</template>

<script>
export default {
    name: 'AArtist',
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