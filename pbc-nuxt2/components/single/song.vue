<template>
  <div class="wrapper">
    <div class="flex">
        <div class="div260">
        <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/' + song.CatNum +'/cover.jpg'" :alt="song.AlbumTitle">
        </div>
        <div class="div520">
          <p>// PB Track //</p>
          <h2>{{ song.Title }}</h2>
          <p>by {{ song.ArtistName }}</p>
          <div class="actions">
            <img :src="require('../../assets/images/actions/playSong_dark.svg')" alt="Play Track" @click="$store.commit('PLAY_THIS', song.ID)">
            <img :src="require('../../assets/images/actions/addToQueue_dark.svg')" alt="Add to Queue" @click="$store.commit('ADD_QUEUE', song.ID)">
            <img :src="require('../../assets/images/actions/SimilarSong_Icon_dark.svg')" alt="Similar Songs" @click="$store.dispatch('OpenSimSong', song.ID)">
            <NuxtLink v-if="panel" :to="'/song/' + song.ID + '-' + slug(song.Title)">
            <img :src="require('../../assets/images/actions/seeSong_Icon_dark.svg')" alt="Track Page" @click="$store.commit('CLOSE_SING_SONG')">
            </NuxtLink>
            <NuxtLink :to="'/project/' + slug(song.ArtistName)">
            <img :src="require('../../assets/images/actions/seeArtist_Icon_dark.svg')" alt="Artist Page" @click="$store.commit('CLOSE_SING_SONG')">  
            </NuxtLink>
            <img :src="require('../../assets/images/actions/Share_Icon_dark.svg')" alt="Share" @click="shareURL()">
            <NuxtLink :to="{ path: '/requests', query: { song: song.ID }}">
            <img :src="require('../../assets/images/actions/inquery_dark.svg')" alt="Inquery" @click="$store.commit('CLOSE_SING_SONG')">
            </NuxtLink>
            <button class="small" @click="licenseThis(song.ID)">LICENSE</button> 
          </div>
          <p>{{ song.Description }}</p>

        </div>
    </div>
    <div class="flex singleScreen">
        <client-only>
        <ul class="div260">
            <li><b>Rhythm</b>{{ song.PBRhythm }}<span>/10</span></li>
            <li><b>Speed</b>{{ song.PBSpeed }}<span>/10</span></li>
            <li><b>Flow</b>{{ song.ShapeArc }}</li>
            <li><b>Duration</b>{{ length }}</li>
        </ul>
        <ul class="div260">
            <li><b>Experimental</b>{{ song.PBExperimental }}<span>/10</span></li>
            <li><b>Mood</b>{{ song.PBMood }}<span>/10</span></li>
            <li><b>Key</b>{{ song.MusicKey }}</li>
            <li><b>BPM</b>{{ song.BPM }}</li>
        </ul>
        <ul class="div260">
            <li><b>Organic</b>{{ song.PBOrganic }}<span>/10</span></li>
            <li><b>Density</b>5<span>/10</span></li>
            <li><b>Stems</b>{{ song.Stems }}</li>
            <li><b>ISRC</b>{{ song.ISRCCode }}</li>
        </ul>
        </client-only>
    </div>
    <div class="flex singleMobile">
        <client-only>
        <ul class="div260 left">
            <li><b>Rhythm</b>{{ song.PBRhythm }}<span>/10</span></li>
            <li><b>Speed</b>{{ song.PBSpeed }}<span>/10</span></li>
            <li><b>Experimental</b>{{ song.PBExperimental }}<span>/10</span></li>
            <li><b>Mood</b>{{ song.PBMood }}<span>/10</span></li>
            <li><b>Organic</b>{{ song.PBOrganic }}<span>/10</span></li>
            <li><b>Density</b>5<span>/10</span></li>
        </ul>
        <ul class="div260 right">
            <li><b>Flow</b>{{ song.ShapeArc }}</li>
            <li><b>Duration</b>{{ length }}</li>
            <li><b>Key</b>{{ song.MusicKey }}</li>
            <li><b>BPM</b>{{ song.BPM }}</li>
            <li><b>Stems</b>{{ song.Stems }}</li>
            <li><b>ISRC</b>{{ song.ISRCCode }}</li>
        </ul>
        </client-only>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'SingleSong',
    props: ['song', 'panel'],
    computed: {
        length() { return this.song.Length ? this.song.Length.slice(2) : '' },
        ...mapGetters({
            slug: 'SLUG'
        }),
    },
    methods: {
    shareURL() {
        let url = 'https://' + window.location.hostname + '/song/' + this.song.ID + '-' + this.slug(this.song.Title)
            this.$store.dispatch('CopyURL', url)
        },
    licenseThis(id) {
        this.$store.dispatch('OpenLicenseP', id)
        }
    }
}
</script>

<style scoped>
h2 {
    margin: 7px 0;
}
.wrapper {
    width: 800px;
    height: 100%;
    max-width: 100%;
    margin: 0 auto;
}
.flex {
    display: flex;
    justify-content:center
}
.div400 {
    display: block;
    width: 380px;
    margin: 0 10px 20px 10px;
}
.div260 {
    display: block;
    width: 250px;
    margin: 0 5px;
}
.div520 {
    display: block;
    width: 500px;
    margin: 0 0 10px 20px;
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
.div260 img {
    width: 100%;
}
ul.div260 {
    list-style: none;
    padding: 5px 0;
}
ul li {
    height: fit-content;
    padding: 5px;
    margin-bottom: 5px;
    background: #ddd;
}
ul li:nth-of-type(3), ul li:nth-of-type(4) {
    background: #f2f2f2;
}
ul li b {
    padding-left: 10px;
    padding-right: 10px;
}
ul li span {
    font-size: 0.8em;
}
.channels {
    text-align: center;
    padding: 10px 50px 0 50px;
    border-top: #ddd 1px solid;
    border-bottom: #ddd 1px solid;
    margin: 10px 0 0 0;
}
.actions {
/*     height: fit-content;
    margin: 10px 0;
    padding: 10px 0 5px 0;
    position: relative;*/
    border-top: #ddd 1px solid;
    border-bottom: #ddd 1px solid;
}
/*.actions img, .channels img {
    width: 32px;
    height: 32px;
    margin: 0 10px 0 0;
    cursor: pointer;
    display: inline-block;
}
.actions img {
    margin: 0 16px 0 0;
}
.actions button.small {
    display: inline-block;
    position: absolute;
    top: 2px;
    margin-left: 5px;
    margin: 10px 16px 0 0;
} */
.flowWrapper {
    display: flex;
    justify-content: left;
    margin-top: 20px;
    gap: 20px;
}
img.flow {
    height: 40px;
    width: 160px;
}
.flex.singleMobile {
        display: none;
    }
@media(max-width: 800px) {
    .flex {
    display: block;
    justify-content:center
}
.wrapper {
    width: 100%;
    max-width: 100%;
    height: fit-content;
    margin-top: 50px;
}
    .div260 {
        margin: 0 auto 20px auto;
        max-width: calc(50% - 15px);
    }
    .div520 {
    width: calc(100% - 20px);
    margin: 0 10px;
    text-align: center;
    }
    .flex.singleMobile {
        display: flex;
        justify-content: center;
        width: fit-content;
        max-width: calc(100% - 20px);
        margin: 10px auto;
        text-align: left;
        /* gap: 10px; */
    }

    .flex.singleScreen {
        display: none;
    }
    .flex.singleMobile .div260.left li {
        background: #DDD;
    }
    .flex.singleMobile .div260.right li {
        background: #f2f2f2;
    }
}
@media(max-width: 600px) {
    .flex.singleMobile {
        display: block;
        max-width: unset;
        width: 100%;
    }
    .flex.singleMobile .div260 {
        max-width: unset;
        width: calc(100% - 20px);
    }    
}
</style>