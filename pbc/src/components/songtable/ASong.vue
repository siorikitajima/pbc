<template>
<!-- <router-link :to="{ name: 'PostDetails', params: { id: post.id }}"> -->
  <div class="asong">
    <div class="ascover" v-if="song" @click="playThisNow(song.ID)">
        <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/' + song.CatNum +'/cover-thumb.jpg'" :alt="song.AlbumTitle">
        <div class="screen">
            <img :src="require('../../assets/images/actions/playSong_light.svg')" alt="Play">
        </div>
    </div>
    <div class="asname" @click="openSingle('song', song)">
        <p><b>{{ song.Title }} </b><img src="../../assets/images/table/eye.svg" alt="See More"></p>
        <p>by {{ song.ArtistName }}</p>
        <p><i>{{ length }}</i></p>
        
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
        <img :src="require('../../assets/images/actions/playSong_dark.svg')" alt="Play Track" @click="playThisNow(song.ID)">
        <img :src="require('../../assets/images/actions/addToQueue_dark.svg')" alt="Add to Queue" @click="addToQueue(song.ID)">
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
import { ref, computed } from '@vue/reactivity'

export default {
    name: 'ASong',
    props: [ 'song', 'dist' ],
    emits: ['openThis', 'showPanel', 'queueAction'],
    setup(props) {
        const spQueue = ref([])
        const sqPlaying = ref('')
        const sqEnded = ref([])
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
        return { spQueue, sqPlaying, sqEnded, snippet, length, slug, artistslug, showProjectLink }
    },
    methods: {
        openSingle(type, da) {
            let data = { type: type, data: da }
            this.$emit('openThis', data)
        },
        openPanel(panel, data) {
            let da = { type: panel, data: data}
            this.$emit('showPanel', da)
        },
        // addToQueue(songId) {
        //     if (!localStorage.getItem("spQueue")) {
        //         localStorage.setItem("spQueue", JSON.stringify([]))
        //     }
        //     const queueItems = JSON.parse(localStorage.getItem("spQueue"))
        //     queueItems.push(songId)
        //     localStorage.setItem("spQueue", JSON.stringify(queueItems))
        //     this.spQueue = JSON.parse(localStorage.getItem("spQueue"))
        // },
        // playThisNow(songId) {
        //     if (!localStorage.getItem("spQueue")) {
        //         localStorage.setItem("spQueue", JSON.stringify([]))
        //     }
        //     const queueItems = JSON.parse(localStorage.getItem("spQueue"))
        //     queueItems.unshift(songId)
        //     localStorage.setItem("spQueue", JSON.stringify(queueItems))
        //     this.spQueue = JSON.parse(localStorage.getItem("spQueue"))
        // }
        addToQueue(songId) {
            let data = { type: 'add', data: songId }
            this.$emit('queueAction', data)
        },
        playThisNow(songId) {
            let data = { type: 'play', data: songId }
            this.$emit('queueAction', data)
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
    position: relative;
}
.ascover img, .asflow img {
    width: 100%;
}
.ascover .screen {
    width: 60px;
    height: 60px;
    background: #00000088;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
}
.ascover .screen img {
    width: 40px;
    height: 40px;
    padding: 10px;
}
.ascover .screen:hover {
    opacity: 1;
    transition-duration: 200ms;
}
.asname {
    padding-left: 10px;
    /* margin-top: -10px; */
    width: 250px;
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