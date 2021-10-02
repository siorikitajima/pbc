<template>
<!-- <router-link :to="{ name: 'PostDetails', params: { id: post.id }}"> -->
  <div class="asong">
    <div class="ascover">
        <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/' + song.CatNum +'/cover-thumb.jpg'" :alt="song.AlbumTitle">
    </div>
    <div class="asname" @click="openSingle('song', song)">
        <p><b>{{ song.Title }} </b><img src="../../assets/images/table/eye.svg" alt="See More"></p>
        <p>by {{ song.ArtistName }}</p>
        <p><i>{{ length }}</i></p>
        <!-- <p>{{ snippet }}</p> -->
        
    </div>
    <div class="asflow">
        <img :src="require('../../assets/images/table/' + song.ShapeArc + '.png')" :alt="song.ShapeArc">
    </div>
    <div class="askey">
        <p><b>Key </b>{{ song.MusicKey }}</p>
        <p><b>BPM </b>{{ song.BPM }}</p>
    </div>
    <ul class="asvalues">
        <li class="rtm">{{ song.PBRhythm }}</li>
        <li class="spd">{{ song.PBSpeed }}</li>
        <li class="exp">{{ song.PBExperimental }}</li>
        <li class="mod">{{ song.PBMood }}</li>
        <li class="grd">{{ song.PBOrganic }}</li>
    </ul>
    <div class="actions">
        <img :src="require('../../assets/images/actions/playSong_dark.svg')" alt="Play Track">
        <img :src="require('../../assets/images/actions/addToQueue_dark.svg')" alt="Add to Queue">
        <img :src="require('../../assets/images/actions/SimilarSong_Icon_dark.svg')" alt="Similar Songs" @click="openPanel('similar', song)">
        <img :src="require('../../assets/images/actions/CustomWork_dark.svg')" alt="Custom Work">
        <img :src="require('../../assets/images/actions/Share_Icon_dark.svg')" alt="Share">
        <router-link :to="'/song/' + song.ID + '-' + slug">
        <img :src="require('../../assets/images/actions/seeSong_Icon_dark.svg')" alt="Track Page" >
        </router-link>
        <router-link :to="'/project/' + artistslug" v-if="showProjectLink">
        <img :src="require('../../assets/images/actions/seeArtist_Icon_dark.svg')" alt="Artist Page">  
        </router-link>
        <button class="small">LICENSE</button> 
    </div>
  </div>
<!-- </router-link> -->
</template>

<script>
import { computed, ref } from '@vue/reactivity'

export default {
    props: [ 'song', 'dist' ],
    emits: ['openThis', 'showPanel'],
    setup(props) {
        const snippet = computed(() => {
            return props.song.Description ? props.song.Description.substring(0, 100) : ''
        })
        const length = computed(() => {
            return props.song.Length ? props.song.Length.slice(2) : ''
        })
        const slug = computed(() => {
            return props.song.Title.toLowerCase().replace(/\s+/g, '-')
        })
        const artistslug = computed(() => {
            return props.song.ArtistName.toLowerCase().replace(/\s+/g, '-')
        })
        // const dist = ref(props.dist)
        const showProjectLink = computed(() => {
            if(props.dist == 'project') { return false }
            else { return true }
        })
        return { snippet, length, slug, artistslug, showProjectLink }
    },
    methods: {
        openSingle(type, da) {
            let data = { type: type, data: da }
            this.$emit('openThis', data)
        },
        openPanel(panel, data) {
            let da = { type: panel, data: data}
            this.$emit('showPanel', da)
        }
    }
}
</script>

<style scoped>
.asong {
    width: 800px;
    min-height: 60px;
    height: fit-content;
    max-width: 90%;
    margin: 5px auto;
    background: #f2f2f2;
    padding: 10px;
    display: flex;
    text-align: left;
    font-size: 0.9em;
    line-height: 1.4em;
}
.asong:hover {
    background: #ccc;
    transition-duration: 200ms;
}
.ascover {
    width: 60px;
    height: 60px;
}
.ascover img, .asflow img {
    width: 100%;
}
.asname {
    padding-left: 10px;
    /* margin-top: -10px; */
    width: 250px;
}
.asname img {
    width: 20px;
    height: 20px;
    margin: -10px 0 -5px 10px;
    opacity: 0;
}
.asname:hover img {
    opacity: 1;
    transition-duration: 200ms;
} 
.asflow {
    width: 120px;
    margin: auto 20px auto 0;
}
.askey {
    margin-top: 10px;
    width: 70px;
}
.asvalues {
    display: block;
    margin: 10px 0;
}
.asvalues li {
    list-style: none;
    display: inline-block;
    width: 40px;
    height: 20px;
    margin: auto 5px auto 0;
    text-align: center;
    padding: 10px 0;
    color: #FFF;
}
.asvalues li.rtm {
    background: url('../../assets/images/table/rtm.png');
    background-size: cover;
}
.asvalues li.spd {
    background: url('../../assets/images/table/spd.png');
    background-size: cover;
}
.asvalues li.exp {
    background: url('../../assets/images/table/exp.png');
    background-size: cover;
}
.asvalues li.mod {
    background: url('../../assets/images/table/mod.png');
    background-size: cover;
}
.asvalues li.grd {
    background: url('../../assets/images/table/grd.png');
    background-size: cover;
}
.asname:hover {
    color: #222;
    transition-duration: 200ms;
}
.actions {
    display: none;
    margin: auto 10px;
}
.asong:hover .asflow, .asong:hover .askey, .asong:hover .asvalues {
    display: none;
}
.asong:hover .actions{
    display: block;
}
</style>