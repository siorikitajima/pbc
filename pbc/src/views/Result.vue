<template>
<div>
    <div class="resultWrapper" v-bind:class="{ moveToRight: sliderPanel || presetPanel, moveDown: searchPanel }">
        <div v-if="songs.length">
            <ResultHead :songCount="songCount" :resultQuery="resultQuery" @clearVal="clearValue($event)" />
            <SongList :songs="fltBySearch" @passThis="openSingle($event)" />
        </div>
        <div v-else> Loading... </div>
    </div>

    <transition name="slideFRTop">
        <Filters v-show="sliderPanel" @loadSlider="filterResult($event)" :rhythm="rhythm" :speed="speed" :experimental="experimental" :mood="mood" :organic="organic" />
    </transition>
    <transition name="slideFRTop">
        <Presets v-show="presetPanel" @loadPreset="updateFilter($event)" />
    </transition>
    <transition name="slideFRLeft">
        <Search @loadSearch="updateResult($event)" v-show="searchPanel" :search="search" :allSearch="allSearch" />
    </transition>

    <div id="navLeft" class="cornerNavs">
        <a @click="toggleSliderPanel">
            <img v-if="sliderPanel" class="navIcons active filters" :src="require('../assets/images/header/Filter_Icon_white.svg')" alt="Filter">
            <img v-else class="navIcons filters" :src="require('../assets/images/header/Filter_Icon.svg')" alt="Filter">
        </a>
        <a @click="togglePresetPanel">
            <img v-if="presetPanel" class="navIcons active filters" :src="require('../assets/images/header/Preset_Icon_white.svg')" alt="Filter">
            <img v-else class="navIcons filters" :src="require('../assets/images/header/Preset_Icon.svg')" alt="Filter">
        </a>
        <a @click="toggleSearchPanel">
            <img v-if="searchPanel" class="navIcons active filters" :src="require('../assets/images/header/Search_Icon_white.svg')" alt="Filter">
            <img v-else class="navIcons filters" :src="require('../assets/images/header/Search_Icon.svg')" alt="Filter">
        </a>
    </div>

    <div v-if="singlePanels" class="singlePanelScreen" @click="closeSingles"></div>
        <div v-if="singlePanels" class="singlePageCoutainer">
            <SingleSong v-if="singleSongPanel" :song="tempSongData" :album="tempAlbumData" />
            <div class="closeIcon" @click="closeSingles">
                <img :src="require('../assets/images/global/Close_Icon_dark.svg')" alt="Close">
            </div>
        </div>

</div>
</template>

<script>
import getSongs from '../composables/getSongs'
import getAlbums from '../composables/getAlbums'
import SongList from '../components/songtable/SongList.vue'
import ResultHead from '../components/songtable/ResultHead.vue'
import { ref } from '@vue/reactivity'
import Search from '../components/filter/Search.vue'
import Filters from '../components/filter/Filters.vue'
import Presets from '../components/filter/Presets.vue'
import SingleSong from '../components/singles/SingleSong.vue'

export default {
    name: 'Result',
    components: { SongList, Search, Filters, ResultHead, Presets, SingleSong },
    setup() {
        const { songs, error, load } = getSongs()
        const { albums, albumserror, loadAlbums } = getAlbums()
        // const search = ref('')
        const searchPanel = ref(false)
        const sliderPanel = ref(true)
        const presetPanel = ref(false)
        const rhythm = ref({ min: 0, max: 10 })
        const speed = ref({ min: 0, max: 10 })
        const experimental = ref({ min: 0, max: 10 })
        const mood = ref({ min: 0, max: 10 })
        const organic = ref({ min: 0, max: 10 })
        const search = ref('')
        const allSearch = ref([])
        const singlePanels = ref(false)
        const singleSongPanel = ref(false)
        const tempSongData = ref('')
        const tempAlbumData = ref('')
        load()
        loadAlbums()

        return { songs, error, searchPanel, sliderPanel, presetPanel, rhythm, speed, experimental, mood, organic, search, allSearch, singleSongPanel, singlePanels, tempSongData, albums, albumserror, tempAlbumData } 
    },
    computed: {
        fltBySearch: function() {
            return this.songs.filter((song) => {
                if ( song.PBRhythm >= this.rhythm.min && song.PBRhythm <= this.rhythm.max && song.PBSpeed >= this.speed.min && song.PBSpeed <= this.speed.max && song.PBExperimental >= this.experimental.min && song.PBExperimental <= this.experimental.max && song.PBMood >= this.mood.min && song.PBMood <= this.mood.max && song.PBOrganic >= this.organic.min && song.PBOrganic <= this.organic.max ) {
                    if( this.allSearch.length == 0 ) { 
                        return true
                    } else {
                    for(let s = 0; s < this.allSearch.length; s++ ) {
                        if ( song.Title.toLowerCase().match(this.allSearch[s].toLowerCase())) { return true }
                        else if ( song.ArtistName.toLowerCase().match(this.allSearch[s].toLowerCase())) { return true }
                        else if ( song.Writers.toLowerCase().match(this.allSearch[s].toLowerCase())) { return true }
                        // else { return false }
                    }
                    return false
                }
            }
        })
        },
        songCount: function() {
            return this.fltBySearch.length;
        },
        resultQuery: function() {
            return { 
                rhythm: this.rhythm,
                speed: this.speed,
                experimental: this.experimental,
                mood: this.mood,
                organic: this.organic,
                search: this.allSearch
                }
        }
    },
    methods: {
        openSingle(data) {
            let singleData = data.data
            let singleType = data.type
            if(singleType == 'song') {
                for (let a = 0; a < this.albums.length; a++ ) {
                    if ( this.albums[a].AlbumID == singleData.CatNum) {
                        this.tempAlbumData = this.albums[a].Year
                    }
                }
                this.tempSongData = singleData
                this.singleSongPanel = true
            }
            if(!this.singlePanels) {
                this.singlePanels = true
            }
        },
        closeSingles() {
            if(this.singleSongPanel) {
                this.singleSongPanel = false
            }
            this.singlePanels = false
        },
        updateResult(searchkey) {
            // this.search = searchkey[0];
            this.allSearch = searchkey;
            console.log(searchkey)
        },
        toggleSearchPanel() {
            this.searchPanel = !this.searchPanel
        },
        toggleSliderPanel() {
            this.sliderPanel = !this.sliderPanel
        },
        togglePresetPanel() {
            this.presetPanel = !this.presetPanel
        },
        filterResult(filterVal) {
            if (filterVal.type == 'rhythm') {
                this.rhythm.min = filterVal.min
                this.rhythm.max = filterVal.max
            }
            if (filterVal.type == 'speed') {
                this.speed.min = filterVal.min
                this.speed.max = filterVal.max
            }
            if (filterVal.type == 'experimental') {
                this.experimental.min = filterVal.min
                this.experimental.max = filterVal.max
            }
            if (filterVal.type == 'mood') {
                this.mood.min = filterVal.min
                this.mood.max = filterVal.max
            }
            if (filterVal.type == 'organic') {
                this.organic.min = filterVal.min
                this.organic.max = filterVal.max
            }
        },
        clearValue(type) {
            if (type == 'rhythm') {
                this.rhythm.min = 0
                this.rhythm.max = 10
            }
            else if (type == 'speed') {
                this.speed.min = 0
                this.speed.max = 10
            }
            else if (type == 'experimental') {
                this.experimental.min = 0
                this.experimental.max = 10
            }
            else if (type == 'mood') {
                this.mood.min = 0
                this.mood.max = 10
            }
            else if (type == 'organic') {
                this.organic.min = 0
                this.organic.max = 10
            }
            else {
                let word = type
                this.search = ''
                for(let s = 0; s < this.allSearch.length; s++ ) {
                    if(this.allSearch[s] == word) {
                        // console.log(this.allSearch, word, s)
                        this.allSearch.splice(s, 1)
                    }
                }
            }
        },
        updateFilter(val) { //// Don't know why this doesn't work as a separate method. Need to come back
            this.presetPanel = false
            
            //// Rhythm
            let r0New = Number(val.rhythm[0])
            let r1New = Number(val.rhythm[1])
            this.rhythm.min = Number(this.rhythm.min)
            this.rhythm.max = Number(this.rhythm.max)
            if( r0New !== this.rhythm.min ) {
                if( r0New < this.rhythm.min ) {
                    let rSteps = ( this.rhythm.min - r0New ) / 0.25
                    let numSteps = 400 / rSteps
                    let rAdd = setInterval(()=> { this.rhythm.min = Number(this.rhythm.min - 0.25)}, numSteps)
                    setTimeout(() => { clearInterval(rAdd)
                    this.rhythm.min = r0New }, 500)
                } else {
                    let rSteps = ( r0New - this.rhythm.min ) / 0.25
                    let numSteps = 400 / rSteps
                    let rAdd = setInterval(()=> { this.rhythm.min = Number(this.rhythm.min + 0.25)}, numSteps)
                    setTimeout(() => { clearInterval(rAdd)
                    this.rhythm.min = r0New }, 500)
                }
            }
            if( r1New !== this.rhythm.max ) {
                if( r1New < this.rhythm.max ) {
                    let rSteps = ( this.rhythm.max - r1New ) / 0.25
                    let numSteps = 400 / rSteps
                    let rAdd = setInterval(()=> { this.rhythm.max = Number( this.rhythm.max - 0.25 )}, numSteps )
                    setTimeout(() => { clearInterval(rAdd)
                    this.rhythm.max = r1New }, 500)
                } else {
                    let rSteps = ( r1New - this.rhythm.max ) / 0.25
                    let numSteps = 400 / rSteps
                    let rAdd = setInterval(()=> { this.rhythm.max = Number( this.rhythm.max + 0.25 )}, numSteps )
                    setTimeout(() => { clearInterval(rAdd)
                    this.rhythm.max = r1New }, 500)
                }
            }

            //// Speed
            let s0New = Number(val.speed[0])
            let s1New = Number(val.speed[1])
            this.speed.min = Number(this.speed.min)
            this.speed.max = Number(this.speed.max)
            if( s0New !== this.speed.min ) {
                if( s0New < this.speed.min ) {
                    let rSteps = ( this.speed.min - s0New ) / 0.25
                    let numSteps = 400 / rSteps
                    let rAdd = setInterval(()=> { this.speed.min = Number(this.speed.min - 0.25)}, numSteps)
                    setTimeout(() => { clearInterval(rAdd)
                    this.speed.min = s0New }, 500)
                } else {
                    let rSteps = ( s0New - this.speed.min ) / 0.25
                    let numSteps = 400 / rSteps
                    let rAdd = setInterval(()=> { this.speed.min = Number(this.speed.min + 0.25)}, numSteps)
                    setTimeout(() => { clearInterval(rAdd)
                    this.speed.min = s0New }, 500)
                }
            }
            if( s1New !== this.speed.max ) {
                if( s1New < this.speed.max ) {
                    let rSteps = ( this.speed.max - s1New ) / 0.25
                    let numSteps = 400 / rSteps
                    let rAdd = setInterval(()=> { this.speed.max = Number( this.speed.max - 0.25 )}, numSteps )
                    setTimeout(() => { clearInterval(rAdd)
                    this.speed.max = s1New }, 500)
                } else {
                    let rSteps = ( s1New - this.speed.max ) / 0.25
                    let numSteps = 400 / rSteps
                    let rAdd = setInterval(()=> { this.speed.max = Number( this.speed.max + 0.25 )}, numSteps )
                    setTimeout(() => { clearInterval(rAdd)
                    this.speed.max = s1New }, 500)
                }
            }

            //// Experimental
            let e0New = Number(val.experimental[0])
            let e1New = Number(val.experimental[1])
            this.experimental.min = Number(this.experimental.min)
            this.experimental.max = Number(this.experimental.max)
            if( e0New !== this.experimental.min ) {
                if( e0New < this.experimental.min ) {
                    let rSteps = ( this.experimental.min - e0New ) / 0.25
                    let numSteps = 400 / rSteps
                    let rAdd = setInterval(()=> { this.experimental.min = Number(this.experimental.min - 0.25)}, numSteps)
                    setTimeout(() => { clearInterval(rAdd)
                    this.experimental.min = e0New }, 500)
                } else {
                    let rSteps = ( e0New - this.experimental.min ) / 0.25
                    let numSteps = 400 / rSteps
                    let rAdd = setInterval(()=> { this.experimental.min = Number(this.experimental.min + 0.25)}, numSteps)
                    setTimeout(() => { clearInterval(rAdd)
                    this.experimental.min = e0New }, 500)
                }
            }
            if( e1New !== this.experimental.max ) {
                if( e1New < this.experimental.max ) {
                    let rSteps = ( this.experimental.max - e1New ) / 0.25
                    let numSteps = 400 / rSteps
                    let rAdd = setInterval(()=> { this.experimental.max = Number( this.experimental.max - 0.25 )}, numSteps )
                    setTimeout(() => { clearInterval(rAdd)
                    this.experimental.max = e1New }, 500)
                } else {
                    let rSteps = ( e1New - this.experimental.max ) / 0.25
                    let numSteps = 400 / rSteps
                    let rAdd = setInterval(()=> { this.experimental.max = Number( this.experimental.max + 0.25 )}, numSteps )
                    setTimeout(() => { clearInterval(rAdd)
                    this.experimental.max = e1New }, 500)
                }
            }
            
            //// Mood
            let m0New = Number(val.mood[0])
            let m1New = Number(val.mood[1])
            this.mood.min = Number(this.mood.min)
            this.mood.max = Number(this.mood.max)
            if( m0New !== this.mood.min ) {
                if( m0New < this.mood.min ) {
                    let rSteps = ( this.mood.min - m0New ) / 0.25
                    let numSteps = 400 / rSteps
                    let rAdd = setInterval(()=> { this.mood.min = Number(this.mood.min - 0.25)}, numSteps)
                    setTimeout(() => { clearInterval(rAdd)
                    this.mood.min = m0New }, 500)
                } else {
                    let rSteps = ( m0New - this.mood.min ) / 0.25
                    let numSteps = 400 / rSteps
                    let rAdd = setInterval(()=> { this.mood.min = Number(this.mood.min + 0.25)}, numSteps)
                    setTimeout(() => { clearInterval(rAdd)
                    this.mood.min = m0New }, 500)
                }
            }
            if( m1New !== this.mood.max ) {
                if( m1New < this.mood.max ) {
                    let rSteps = ( this.mood.max - m1New ) / 0.25
                    let numSteps = 400 / rSteps
                    let rAdd = setInterval(()=> { this.mood.max = Number( this.mood.max - 0.25 )}, numSteps )
                    setTimeout(() => { clearInterval(rAdd)
                    this.mood.max = m1New }, 500)
                } else {
                    let rSteps = ( m1New - this.mood.max ) / 0.25
                    let numSteps = 400 / rSteps
                    let rAdd = setInterval(()=> { this.mood.max = Number( this.mood.max + 0.25 )}, numSteps )
                    setTimeout(() => { clearInterval(rAdd)
                    this.mood.max = m1New }, 500)
                }
            }

            //// Organic
            let o0New = Number(val.organic[0])
            let o1New = Number(val.organic[1])
            this.organic.min = Number(this.organic.min)
            this.organic.max = Number(this.organic.max)
            if( o0New !== this.organic.min ) {
                if( o0New < this.organic.min ) {
                    let rSteps = ( this.organic.min - o0New ) / 0.25
                    let numSteps = 400 / rSteps
                    let rAdd = setInterval(()=> { this.organic.min = Number(this.organic.min - 0.25)}, numSteps)
                    setTimeout(() => { clearInterval(rAdd)
                    this.organic.min = o0New }, 500)
                } else {
                    let rSteps = ( o0New - this.organic.min ) / 0.25
                    let numSteps = 400 / rSteps
                    let rAdd = setInterval(()=> { this.organic.min = Number(this.organic.min + 0.25)}, numSteps)
                    setTimeout(() => { clearInterval(rAdd)
                    this.organic.min = o0New }, 500)
                }
            }
            if( o1New !== this.organic.max ) {
                if( o1New < this.organic.max ) {
                    let rSteps = ( this.organic.max - o1New ) / 0.25
                    let numSteps = 400 / rSteps
                    let rAdd = setInterval(()=> { this.organic.max = Number( this.organic.max - 0.25 )}, numSteps )
                    setTimeout(() => { clearInterval(rAdd)
                    this.organic.max = o1New }, 500)
                } else {
                    let rSteps = ( o1New - this.organic.max ) / 0.25
                    let numSteps = 400 / rSteps
                    let rAdd = setInterval(()=> { this.organic.max = Number( this.organic.max + 0.25 )}, numSteps )
                    setTimeout(() => { clearInterval(rAdd)
                    this.organic.max = o1New }, 500)
                }
            }
        },
    }
}
</script>

<style>
.resultWrapper {
    width: 100%;
    height: calc(100% - 40px);
    padding: 20px 0;
    top: 0;
    left: 0;
    position: fixed;
    overflow-y: scroll;
    transition-duration: 200ms;
}
.resultWrapper.moveToRight {
    width: calc(100% - 280px);
    left: 280px;
}

.resultWrapper.moveDown {
    height: calc(100% - 120px);
    top: 80px;
}

.slideFRLeft-enter-active,
.slideFRLeft-leave-active,
.slideFRTop-enter-active,
.slideFRTop-leave-active {
    transition: 200ms;
}
.slideFRLeft-enter-from { transform: translate(-110%, 0); }
.slideFRLeft-leave-to { transform: translate(-110%, 0); }
.slideFRTop-enter-from { transform: translate(0, -110%); }
.slideFRTop-leave-to { transform: translate(0, -110%); }

.navIcons.filters {
  width: 24px;
  height: 24px;
  margin: 0 10px;
  padding: 10px;
  border: #666 1px solid;
  border-radius: 50%;
}

.navIcons.active {
    background: #666;
    border-radius: 50%;
}

.singlePanelScreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #00000033;
    z-index: 2000;
    cursor: pointer;
}
.singlePageCoutainer {
    position: fixed;
    top: 20px;
    left: auto;
    right: 20px;
    bottom: 20px;
    width: 860px;
    padding: 50px;
    height: fit-content;
    max-height: calc(100% - 140px);
    border-radius: 5px;
    background: #ffffff;
    z-index: 3000;
}
.closeIcon {
    width: 50px;
    height: 50px;
    position: fixed;
    top: 50px;
    right: 50px;
    cursor: pointer;
}
</style>