<template>
<div class="tableWrapper">
    <div class="tableHeader">
        <p>SONG / ARTIST / DURATION</p>
        <p>FLOW</p>
        <p>KEY / BPM</p>
        <p>RTM</p>
        <p>SPD</p>
        <p>EXP</p>
        <p>MOD</p>
        <p>ORG</p>
    </div>
    <div v-for="song in songs" :key="song.ID">
        <ASong :song="song" /> 
    </div>
</div>
</template>

<script>
import ASong from './ASong.vue'

export default {
    props: ['songs'],
    components: { ASong },
    // setup(props) {
    //     console.log('songs are read')
    // }
}
</script>

<style scoped>
.tableHeader {
    /* height: 20px; */
    width: 800px;
    padding: 5px 10px;
    color: #ffffff88;
    background: #444444;
    margin: 0 auto;
    font-size: 0.8em;
    display: flex;
    justify-content: space-between;
}
.tableHeader p {
    display: block;
}
.tableWrapper {
    margin-bottom: 60px;
}
</style>