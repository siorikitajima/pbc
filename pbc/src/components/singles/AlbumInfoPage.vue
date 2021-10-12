<template>
<div class="wrapper" v-if="album">
    <div class="flex">
        <ul class="div400">
            <li><b>Year</b>{{ album.Year }}</li>
            <li><b>Track Count</b>{{ album.Tracks }}</li>
        </ul>
        <ul class="div400">
            <li><b>Album ID</b>{{ album.AlbumID }}</li>
            <li><b>UPC Code</b>{{ album.UPCCode }}</li>
        </ul>
    </div>

     <div class="div800">    
        <p class="headerbg"><b>Cover Artist</b></p>
        <a :href="album.coverLink" target="_blank">
            <div class="aWriter">
                <div class="artistThumb" v-if="album">
                <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/' + album.AlbumID +'/cover.jpg'" :alt="album.Title">
                </div>
                <p>{{ album.AlbumArt }}</p>
            </div>
        </a>
    </div>

    <div class="channels">
        <img :src="require('../../assets/images/singles/Single-Song_Bandcamp.svg')" alt="Bandcamp">
        <img :src="require('../../assets/images/singles/Single-Song_Spotify.svg')" alt="Spotify">   
        <img :src="require('../../assets/images/singles/Single-Song_Apple.svg')" alt="Apple Music">
        <img :src="require('../../assets/images/singles/Single-Song_GooglePlay.svg')" alt="Google Play">
        <img :src="require('../../assets/images/singles/Single-Song_SoundCloud.svg')" alt="SoundCloud">
        <img :src="require('../../assets/images/singles/Single-Song_Vimeo.svg')" alt="Vimeo">   
        <img :src="require('../../assets/images/singles/Single-Song_Youtube.svg')" alt="Youtube">   
        <img :src="require('../../assets/images/singles/Single-Song_Tidal.svg')" alt="Tidal">   
        <img :src="require('../../assets/images/singles/Single-Song_Deezer.svg')" alt="Deezer">   
    </div>
  </div>

</template>

<script>

export default {
    name: 'AlbumInfoPage',
    props: ['album']
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
    text-align: center;
}
.aWriter, .aWriter a, .aAlbum, .aAlbum a {
    display: flex;
    justify-content: center;
    padding: 10px;
    min-width: fit-content;
}
.aWriter a, .aAlbum a {
    padding: 0;
}
.aWriter p, .aWriter a p, .aAlbum p, .aAlbum a p {
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
    margin: 10px 0 30px 0;
}
ul.div400 {
    list-style: none;
    padding: 10px 0;
}
ul li {
    height: 24px;
    padding: 3px;
    margin-bottom: 5px;
    background: #f2f2f2;
}

ul li b {
    padding-left: 10px;
    padding-right: 10px;
}
ul li span {
    font-size: 0.8em;
}
</style>