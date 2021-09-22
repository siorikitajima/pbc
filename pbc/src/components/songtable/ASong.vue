<template>
<!-- <router-link :to="{ name: 'PostDetails', params: { id: post.id }}"> -->
  <div class="asong">
    <div class="ascover">
        <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/' + song.CatNum +'/cover-thumb.jpg'" :alt="song.AlbumTitle">
    </div>
    <div class="asname">
        <p><b>{{ song.Title }}</b></p>
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
  </div>
<!-- </router-link> -->
</template>

<script>
import { computed } from '@vue/reactivity'

export default {
    props: [ 'song' ],
    setup(props) {
        const snippet = computed(() => {
            return props.song.Description ? props.song.Description.substring(0, 100) : ''
        })
        const length = computed(() => {
            return props.song.Length ? props.song.Length.slice(2) : ''
        })
        return { snippet, length }
    }
}
</script>

<style>
.asong {
    width: 800px;
    height: 60px;
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
</style>