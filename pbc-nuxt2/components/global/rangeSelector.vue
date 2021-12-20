<template>
    <div class="rangeSelector">
        <div v-if="songCount > 10">
            <input type="number" min="1" :max="songTo-1" v-model="songFrom"/>
            <p class="trackCount dark"><span> - </span></p>
            <input type="number" :min="songFrom+1" :max="songCount" v-model="songTo"/>
            <p class="trackCount dark"><span> Tracks</span></p>
            <img :src="require('~/assets/images/actions/playSong_light.svg')" alt="Play" @click="playThem()">
            <img :src="require('~/assets/images/actions/addToQueue_light.svg')" alt="Add to Queue" @click="addThem()">
        </div>
        <div v-else>
            <p class="trackCount dark"><b>{{ songCount }}</b>
            <span> Tracks</span></p>
            <img :src="require('~/assets/images/actions/playSong_light.svg')" alt="Play" @click="playAll()">
            <img :src="require('~/assets/images/actions/addToQueue_light.svg')" alt="Add to Queue" @click="addAll()">
        </div>
    </div>
</template>

<script>
export default {
    name: 'GlobalRangeSelector',
    props: ['songCount', 'ids'],
    data() {
        return {
            songFrom: 1,
            songTo: 10,
        }
    },
    methods: {
        playThem() {
            let fromN = Number(this.songFrom -1)
            let toN = Number(this.songTo)
            let data = this.ids.slice(fromN, toN)
            this.$store.commit('PLAY_ALL', data)
        },
        addThem() {
            let fromN = Number(this.songFrom -1)
            let toN = Number(this.songTo)
            let data = this.ids.slice(fromN, toN)
            this.$store.commit('ADD_ALL', data)
        },
        playAll() {
            this.$store.commit('PLAY_ALL', this.ids)
        },
        addAll() {
            this.$store.commit('ADD_ALL', this.ids)
        }
    }
}
</script>

<style scoped>

.rangeSelector {
    width: max-content;
    height: 60px;
    background: #444;
    position: absolute;
    padding: 0 10px;
    top: 0;
    left: 0;
    vertical-align: middle;
    overflow: hidden;
    color: #ddd;
}
.rangeSelector div {
    display: flex;
    justify-content: space-between;
}
.rangeSelector input {
    width: 60px;
    height: 40px;
    margin: auto 0;
    font-size: 1.2em;
    color: #ddd;
    border: none;
    text-align: center;
    padding: 0;
    font-weight: bold;
}
.rangeSelector img {
    width: 40px;
    height: 40px;
    padding: 10px;
    cursor: pointer;
}

.trackCount {
    color: #fff;
    margin-top: 10px;
    font-size: 1.1em;
}
.trackCount.dark {
    font-size: 1.2em;
    margin: 20px;
    /* color: #444; */
}
.trackCount span {
    font-size: 0.9em;
}

@media (max-width: 600px) {
    .rangeSelector {
        display: none;
    }
    .resultIcon .trackCount {
        color: #222;
        font-size: 1.4em;
    }
}
</style>