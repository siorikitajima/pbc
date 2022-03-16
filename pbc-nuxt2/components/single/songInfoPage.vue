<template>
<div class="wrapper">
        <div class="flex">
            <div class="div400">
                <p class="headerbg"><b>Project</b></p>
                <div class="aWriter">
                    <NuxtLink :to="'/project/' + slug(song.ArtistName)">
                    <div class="artistThumb">
                        <img :src="storageURL + 'artists/' + song.ArtistImage" :alt="song.ArtistName"/>
                    </div>
                    <p>{{ song.ArtistName }}</p>
                    </NuxtLink>
                </div>
            </div>
            <div class="div400">
                <p class="headerbg"><b>Album</b></p>
                <div class="aAlbum">
                    <NuxtLink :to="'/album/' + song.CatNum + '-' + slug(song.AlbumTitle)">
                    <div class="albumThumb" v-if="song">
                        <img :src="coverImg(song.CatNum, song.ID)" :alt="song.AlbumTitle"/>
                    </div>
                    <p>{{ song.AlbumTitle }} ({{ song.Year }})</p>
                    </NuxtLink>
                </div>
            </div>
        </div>

     <div class="div800">    
        <p class="headerbg"><b>Artists</b></p>
        <div class="flex">
            <div class="aWriter" v-for="(writer, i) in song.Writers || []" :key="i">
                <NuxtLink :to="'/artist/' + writer.slug">
                <div class="artistThumb">
                    <img :src="storageURL + 'artists/' + writer.img" :alt="writer.name"/>
                </div>
                <p>{{ writer.name }}</p>
                </NuxtLink>
            </div>
        </div>
    </div>

    <div class="channels">
        <div class="oneIcon">
            <a :href="song.BandcampURL" v-if="song.BandcampURL" target="_blank">
                <img :src="require('~/assets/images/singles/Single-Song_Bandcamp.svg')" 
                alt="Bandcamp" @mouseover="showInfo['act1'] = true" @mouseleave="showInfo['act1'] = false">
            </a>
            <transition name="bounce">
                <div class="ttinfo" v-if="showInfo['act1']"><p>Bandcamp</p></div>
            </transition>
        </div>
        <div class="oneIcon">
            <a :href="song.AppleMusicURL" v-if="song.AppleMusicURL" target="_blank">
                <img :src="require('~/assets/images/singles/Single-Song_Apple.svg')" 
                alt="Apple Music" @mouseover="showInfo['act2'] = true" @mouseleave="showInfo['act2'] = false">
            </a>
            <transition name="bounce">
                <div class="ttinfo" v-if="showInfo['act2']"><p>Apple Music</p></div>
            </transition>
        </div>
        <div class="oneIcon">
            <a :href="song.TidalURL" v-if="song.TidalURL" target="_blank">
                <img :src="require('~/assets/images/singles/Single-Song_Tidal.svg')" 
                alt="Tidal" @mouseover="showInfo['act3'] = true" @mouseleave="showInfo['act3'] = false">   
            </a>
            <transition name="bounce">
                <div class="ttinfo" v-if="showInfo['act3']"><p>Tidal</p></div>
            </transition>
        </div>
        <div class="oneIcon">
            <a :href="song.SoundcloudURL" v-if="song.SoundcloudURL" target="_blank">
                <img :src="require('~/assets/images/singles/Single-Song_SoundCloud.svg')" 
                alt="SoundCloud" @mouseover="showInfo['act4'] = true" @mouseleave="showInfo['act4'] = false">
            </a>
            <transition name="bounce">
                <div class="ttinfo" v-if="showInfo['act4']"><p>SoundCloud</p></div>
            </transition>
        </div>
        <div class="oneIcon">
            <a :href="song.VimeoURL" v-if="song.VimeoURL" target="_blank">
                <img :src="require('~/assets/images/singles/Single-Song_Vimeo.svg')" 
                alt="Vimeo" @mouseover="showInfo['act5'] = true" @mouseleave="showInfo['act5'] = false">   
            </a>
            <transition name="bounce">
                <div class="ttinfo" v-if="showInfo['act5']"><p>Vimeo</p></div>
            </transition>
        </div>
        <div class="oneIcon">
            <a :href="song.YoutubeURL" v-if="song.YoutubeURL" target="_blank">
                <img :src="require('~/assets/images/singles/Single-Song_Youtube.svg')" 
                alt="Youtube" @mouseover="showInfo['act6'] = true" @mouseleave="showInfo['act6'] = false">   
            </a>
            <transition name="bounce">
                <div class="ttinfo" v-if="showInfo['act6']"><p>Youtube</p></div>
            </transition>
        </div>
        <div class="oneIcon">
            <a :href="song.DeezerURL" v-if="song.DeezerURL" target="_blank">
                <img :src="require('~/assets/images/singles/Single-Song_Deezer.svg')" 
                alt="Deezer" @mouseover="showInfo['act7'] = true" @mouseleave="showInfo['act7'] = false">   
            </a>
            <transition name="bounce">
                <div class="ttinfo" v-if="showInfo['act7']"><p>Deezer</p></div>
            </transition>
        </div>
        <div class="oneIcon">
            <a :href="song.SpotifyURL" v-if="song.SpotifyURL" target="_blank">
                <img :src="require('~/assets/images/singles/Single-Song_Spotify.svg')" 
                alt="Spotify" @mouseover="showInfo['act8'] = true" @mouseleave="showInfo['act8'] = false"> 
            </a>  
            <transition name="bounce">
                <div class="ttinfo" v-if="showInfo['act8']"><p>Spotify</p></div>
            </transition>
        </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import storageURL from '~/assets/storage-url.js'

export default {
    name: 'SongInfoPage',
    props: ['song'],
    data(){
        return { 
            storageURL: storageURL,
            showInfo:
            {
            'act1': false,
            'act2': false,
            'act3': false,
            'act4': false,
            'act5': false,
            'act6': false,
            'act7': false,
            'act8': false
            }
        }
    },
    computed: {
    ...mapGetters({
        slug: 'SLUG',
        coverImg: 'COVER_IMG',
    })
    }
}
</script>

<style scoped>
.wrapper {
    width: 800px;
    max-width: 100%;
    height: fit-content;
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
    margin: 0 5px;
}
.div400.group {
    width: 354px;
    padding: 0 5px;
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
    width: calc(100% - 30px);
    margin: 0 10px 20px 10px; 
    padding: 0 5px;
    text-align: center;
}
.headerbg {
    width: calc(100% - 10px);
    padding: 5px;
    background: #ddd;
    border-radius: 5px;
    text-align: center;
    margin: 0;
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
    margin: 10px 0 0 0;
    display: flex;
    justify-content: center;
}
.channels .oneIcon {
    position: relative;
}
.ttinfo{
    background: #ffffffcc;
    color: #888 !important;
    border: #888 1px solid;
  }
  .ttinfo p {
      color: #666;
      /* font-size: 0.8em; */
  }

@media(max-width: 800px) {
    .flex {
    display: block;
    }
    .div400 {
        width: calc(100% - 30px);
        margin: 0 auto;
    }
}
</style>