<template>
      <div class="relatedArtists" v-if="artist">
        <div class="relArtist" v-for="artist in artist.RelatedEntities" :key="artist">
            <router-link :to="'/project/' + artist.name.toLowerCase().replace(/\s+/g, '-')">
            <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/artists/' + artist.img" :alt="artist.name">
            <div class="screen"></div>
            <h3>{{ artist.name }}</h3>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'artist' ]
}
</script>

<style scoped>
.relatedArtists {
    width: 100%;
    padding: 0 0 50px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.relArtist {
    width: 180px;
    height: 100px;
    margin: 0 10px;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    text-align: center;
    color: #fff;
}
.relArtist img, .relArtist h3 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.relArtist img {
    width: 100%;
}
.relArtist h3, .relArtist a h3 {
    width: 90%;
    font-size: 1em;
    color: #fff;
}
.relArtist .screen {
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left: 0;
    background: #00000088;
}
.relArtist:hover .screen {
    background: #00000033;
    transition-duration: 200ms;
}
</style>