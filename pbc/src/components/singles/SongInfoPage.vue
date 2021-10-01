<template>
<div class="wrapper">
    <div class="div800">
        <p class="headerbg"><b>Project</b></p>
        <div class="flex">
            <div class="aWriter">
                <div class="artistThumb">
                    <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/artists/' + song.ArtistImage" :alt="song.ArtistName"/>
                </div>
                <p>{{ song.ArtistName }}</p>
            </div>
        </div>
        <p class="headerbg"><b>Artists</b></p>
        <div class="flex">
            <div class="aWriter" v-for="writer in song.Writers" :key="writer">
                <div class="artistThumb">
                    <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/artists/' + writer.img" :alt="writer.name"/>
                </div>
                <p>{{ writer.name }}</p>
            </div>
        </div>
    </div>
    <div class="div800">
        <p class="headerbg"><b>Album</b></p>
        <div class="aAlbum">
            <div class="albumThumb">
                <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/' + song.CatNum +'/cover-thumb.jpg'" :alt="song.AlbumTitle"/>
            </div>
            <p>{{ song.AlbumTitle }} ({{ song.Year }})</p>
        </div>
    </div>
    <div class="channels">
        <img :src="require('../../assets/images/singles/Single-Song_Apple.svg')" alt="Apple Music">
        <img :src="require('../../assets/images/singles/Single-Song_Bandcamp.svg')" alt="Bandcamp">
        <img :src="require('../../assets/images/singles/Single-Song_GooglePlay.svg')" alt="Google Play">
        <img :src="require('../../assets/images/singles/Single-Song_SoundCloud.svg')" alt="SoundCloud">
        <img :src="require('../../assets/images/singles/Single-Song_Spotify.svg')" alt="Spotify">   
        <img :src="require('../../assets/images/singles/Single-Song_Vimeo.svg')" alt="Vimeo">   
        <img :src="require('../../assets/images/singles/Single-Song_Youtube.svg')" alt="Youtube">   
        <img :src="require('../../assets/images/singles/Single-Song_Tidal.svg')" alt="Tidal">   
        <img :src="require('../../assets/images/singles/Single-Song_Deezer.svg')" alt="Deezer">   
    </div>
  </div>

</template>

<script>
export default {
    props: ['song']
}
</script>

<style scoped>
.wrapper {
    width: 800px;
    height: 100%;
    margin: 0 auto;
}
.flex {
    display: flex;
    justify-content:center;
    flex-wrap: wrap;
}
.div400 {
    display: block;
    width: 380px;
    margin: 0 10px 20px 10px;
}
.div400.group {
    width: 354px;
    padding-left: 20px;
    position: relative;
}
.div400.group::before {
    content: '';
    width: 10px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #666;
    border-radius: 5px;
}
.div800 {
    width: 780px;
    margin: 0 10px 20px 10px; 
    text-align: center;
}
.headerbg {
    width: 100%;
    padding: 3px;
    margin-top: 5px;
    background: #ddd;
    border-radius: 5px;
}
.aWriter, .aAlbum {
    display: flex;
    justify-content: center;
    padding: 10px;
    min-width: fit-content;
}
.aWriter p, .aAlbum p {
    display: inline-block;
    margin: auto 10px;
}
.artistThumb, .albumThumb {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
}
.albumThumb {
    border-radius: 0;
}
.artistThumb img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 40px;
}
.albumThumb img {
    width: 40px;
    height: 40px;
}
.channels {
    text-align: center;
    padding: 10px 50px 0 50px;
    border-top: #ddd 1px solid;
    border-bottom: #ddd 1px solid;
    margin: 10px 0 0 0;
}
</style>