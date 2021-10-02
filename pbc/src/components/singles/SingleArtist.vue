<template>
        <div class="artistTop">
          <img class="cover" :src="'https://pblibrary.s3.us-east-2.amazonaws.com/artists/' + artist.Img" :alt="artist.ArtistName">
          <div class="info">
            <p v-if="artist.Type == 'P'">// PB Project //</p>
            <p v-else>// PB Artist //</p>
            <h1>{{ artist.ArtistName }}</h1>
            <p>{{ artist.Bio }}</p>
            <div class="channels">
                <img :src="require('../../assets/images/actions/Share_Icon_white.svg')" alt="Share">
                <img :src="require('../../assets/images/singles/Single-Artist_ws.svg')" alt="Website">
                <img :src="require('../../assets/images/singles/Single-Artist_BC.svg')" alt="Bandcamp">
                <img :src="require('../../assets/images/singles/Single-Artist_SC.svg')" alt="SoundCloud">
                <img :src="require('../../assets/images/singles/Single-Artist_IG.svg')" alt="Instagram">   
                <img :src="require('../../assets/images/singles/Single-Artist_FB.svg')" alt="Facebook">   
                <img :src="require('../../assets/images/singles/Single-Artist_SP.svg')" alt="Spotify">   
            </div>
          </div>
      </div>
</template>

<script>
export default {
    props: [ 'artist' ],
}
</script>

<style scoped>
.artistTop {
    width: 100%;
    min-height: 300px;
    height: fit-content;
    padding: 30px 0;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    text-align: center;
    color: #fff;
}
.artistTop .info {
    height: fit-content;
    width: 100%;
    padding: 20px 0;
    background: #00000088;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.artistTop .info h1 {
    margin: 10px auto;
}
.artistTop img.cover {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
}
.artistTop p, .artistTop h1 {
    width: fit-content;
    max-width: 800px;
    margin: 0 auto;
}


</style>