<template>
<div>
    <div class="resultWrapper" v-bind:class="{ moveToRight: sliderPanel || presetPanel, moveDown: searchPanel }">
        <div v-if="songs.length">
            <TableResultHead :songCount="songCount" :resultQuery="resultQuery" @clearVal="clearValue($event)" @queueAction="getList4Queue($event)" />
            <TableSongList :fltdsongs="fltBySearch" :song="sqPData" :dist="'result'" @passThis="passSingle($event)" @openPanel="passPanel($event)" @queueAction="passQueue($event)" />
        </div>
        <div v-else><Loading /></div>
    </div>

<transition name="slideFRTop">
    <FilterFilters v-show="sliderPanel" @loadSlider="filterResult($event)" :rhythm="rhythm" :speed="speed" :experimental="experimental" :mood="mood" :organic="organic" />
</transition>
<transition name="slideFRTop">
    <FilterPresets v-show="presetPanel" :presets="presets" @loadPreset="updateFilter($event)" />
</transition>
<transition name="slideFRLeft">
    <FilterSearch @loadSearch="updateResult($event)" v-show="searchPanel" :search="search" :allSearch="allSearch" :searchKeys="searchKeys" />
</transition>

<FilterIcons :sliderPanel="sliderPanel" :presetPanel="presetPanel" :searchPanel="searchPanel" @leftPanel="leftPanel($event)" />

</div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import baseURL from '~/assets/api-url.js'

export default {
    name: 'Result',
    async asyncData() {

        let presetUrl = baseURL + '/preset'
        let presetdata = await axios.get(presetUrl)
        let presets = await presetdata.data

        let searchUrl = baseURL + '/search'
        let searchdata = await axios.get(searchUrl)
        let searchKeys = await searchdata.data

        return { presets, searchKeys }
    },
    data() {
        return {
            sliderPanel: false,
            presetPanel: false,
            searchPanel: false,
            componentLoaded: false,

            rhythm : { min: 0, max: 10 },
            speed : { min: 0, max: 10 },
            experimental : { min: 0, max: 10 },
            mood : { min: 0, max: 10 },
            organic : { min: 0, max: 10 },
            search : '',
            allSearch : []
        }
    },
    mounted() {
        const values = JSON.parse(localStorage.getItem("filterValues"))
        if(values !== null) {
            if( values.rhythm.min !== 0 || values.rhythm.max !== 10 || values.speed.min !== 0 || values.speed.max !== 10 || values.experimental.min !== 0 || values.experimental.max !== 10 || values.mood.min !== 0 || values.mood.max !== 10 || values.organic.min !== 0 || values.organic.max !== 10 || values.search.length !== 0) {
                this.rhythm.min = values.rhythm.min
                this.rhythm.max = values.rhythm.max
                this.speed.min = values.speed.min
                this.speed.max = values.speed.max
                this.experimental.min = values.experimental.min
                this.experimental.max = values.experimental.max
                this.mood.min = values.mood.min
                this.mood.max = values.mood.max
                this.organic.min = values.organic.min
                this.organic.max = values.organic.max
                this.allSearch = values.search
            } 
        }
        this.componentLoaded = true
        //// Debug Log
        let query = {
            rhythm: { min: this.rhythm.min, max: this.rhythm.max },
            speed: { min: this.speed.min, max: this.speed.max },
            experimental: { min: this.experimental.min, max: this.experimental.max },
            mood: { min: this.mood.min, max: this.mood.max },
            organic: { min: this.organic.min, max: this.organic.max },
            search: this.allSearch 
        }
        console.log('Filter Value on Mounted:', query)
    },
    computed: {
        ...mapState(['songs', 'sqPData']),
        fltBySearch() {
            if( !this.componentLoaded || !this.songs ) {
                return null } else {
            return this.songs.filter((song) => {
                //// Match to the Slider Value
                if ( song.PBRhythm >= this.rhythm.min && song.PBRhythm <= this.rhythm.max && song.PBSpeed >= this.speed.min && song.PBSpeed <= this.speed.max && song.PBExperimental >= this.experimental.min && song.PBExperimental <= this.experimental.max && song.PBMood >= this.mood.min && song.PBMood <= this.mood.max && song.PBOrganic >= this.organic.min && song.PBOrganic <= this.organic.max ) {
                    //// If there is no other item, that's the result
                    if( this.allSearch.length == 0 ) { 
                        return true
                    } else {
                        const query = {
                            rhythm: { min: this.rhythm.min, max: this.rhythm.max },
                            speed: { min: this.speed.min, max: this.speed.max },
                            experimental: { min: this.experimental.min, max: this.experimental.max },
                            mood: { min: this.mood.min, max: this.mood.max },
                            organic: { min: this.organic.min, max: this.organic.max },
                            search: this.allSearch 
                        }
                        localStorage.setItem("filterValues", JSON.stringify(query))
                        
                        //// If Search keywords exist
                        for(let s = 0; s < this.allSearch.length; s++ ) {
                            //// Song is searched by name by itself
                            if( this.allSearch[s].type == 'song') {
                                if ( song.Title.toLowerCase().match(this.allSearch[s].key.toLowerCase())) { return true }
                            }
                            if( this.allSearch[s].type == 'instrument') {
                                if ( song.Instruments && song.Instruments.toLowerCase().includes(this.allSearch[s].key.toLowerCase())) { return true }
                            }
                            if( this.allSearch[s].type == 'album') {
                                if ( song.AlbumTitle.toLowerCase().match(this.allSearch[s].key.toLowerCase())) { return true }
                            }
                            if( this.allSearch[s].type == 'project') {
                                if ( song.ArtistName.toLowerCase().match(this.allSearch[s].key.toLowerCase())) { return true }
                            }
                            if( this.allSearch[s].type == 'artist') {
                                if ( song.Writers.toLowerCase().includes(this.allSearch[s].key.toLowerCase())) { return true }
                            }

                            if( this.allSearch[s].type == 'genre') {
                                if ( song.Genre && song.Genre.toLowerCase().match(this.allSearch[s].key.toLowerCase()) || song.SubGenreA && song.SubGenreA.toLowerCase().match(this.allSearch[s].key.toLowerCase()) || song.SubGenreB && song.SubGenreB.toLowerCase().match(this.allSearch[s].key.toLowerCase())) { return true }
                            }
                            if( this.allSearch[s].type == 'tag') {
                                if ( song.Tags && song.Tags.toLowerCase().includes(this.allSearch[s].key.toLowerCase())) { return true }
                            }
                            if( this.allSearch[s].type == 'mood') {
                                if ( song.PrimaryMood && song.PrimaryMood.toLowerCase().match(this.allSearch[s].key.toLowerCase()) || song.SecondaryMoods && song.SecondaryMoods.toLowerCase().match(this.allSearch[s].key.toLowerCase())) { return true }
                            }
                            if( this.allSearch[s].type == 'search') {
                                if ( song.Title.toLowerCase().match(this.allSearch[s].key.toLowerCase()) || song.Description && song.Description.toLowerCase().includes(this.allSearch[s].key.toLowerCase())) { return true }
                            }
                        }
                        return false
                    }
                }
            })
            }
        },
        songCount() {
            if( !this.componentLoaded || !this.songs ) {
                return null } else {
            return this.fltBySearch.length;
                }
        },
        resultQuery: function() {
            const query = {
                rhythm: { min: this.rhythm.min, max: this.rhythm.max },
                speed: { min: this.speed.min, max: this.speed.max },
                experimental: { min: this.experimental.min, max: this.experimental.max },
                mood: { min: this.mood.min, max: this.mood.max },
                organic: { min: this.organic.min, max: this.organic.max },
                search: this.allSearch 
            }
            return query
        },
        isMobile() {
            console.log('window.innerWidth: ' + window.innerWidth)
            if (window.innerWidth <= 768) {
            return true
            } 
            return false
        }
    },
    methods: {
        leftPanel(data) {
            if (data.type == 'filter') {
                if ( !this.sliderPanel && this.presetPanel ) {
                    this.presetPanel = false
                    setTimeout(() => this.sliderPanel = true , 100)
                } else {
                this.sliderPanel = !this.sliderPanel
                }
                if(this.isMobile && this.searchPanel) {
                    this.searchPanel = false
                }
            } else if (data.type == 'preset') {
                if ( !this.presetPanel && this.sliderPanel ) {
                    this.sliderPanel = false
                    setTimeout(() => this.presetPanel = true , 100)
                } else {
                    this.presetPanel = !this.presetPanel
                }
                if(this.isMobile && this.searchPanel) {
                    this.searchPanel = false
                }
            } else if (data.type == 'search') {
                this.searchPanel = !this.searchPanel
                if(this.isMobile && this.sliderPanel) {
                    this.sliderPanel = false
                }
                if(this.isMobile && this.presetPanel) {
                    this.presetPanel = false
                }
            }
        },
        getList4Queue(data) {
            let songIds = []

            if(data.type == 'playAll') {
                for(let s = 0; s < this.fltBySearch.length; s++) {
                    let id = this.fltBySearch[s].ID
                    songIds.push(id)
                }
                this.$store.commit('PLAY_ALL', songIds)
            } else if (data.type == 'addAll') {
                for(let s = 0; s < this.fltBySearch.length; s++) {
                    let id = this.fltBySearch[s].ID
                    songIds.push(id)
                }
                this.$store.commit('ADD_ALL', songIds)
            } else if (data.type == 'playThem') {
                let fromNum = data.from
                let toNum = data.to
                    for(let s = fromNum; s < toNum; s++) {
                        let id = this.fltBySearch[s].ID
                        songIds.push(id)
                    }
                this.$store.commit('PLAY_ALL', songIds)
            } else if (data.type == 'addThem') {
                let fromNum = data.from
                let toNum = data.to
                for(let s = fromNum; s < toNum; s++) {
                    let id = this.fltBySearch[s].ID
                    songIds.push(id)
                }
                this.$store.commit('ADD_ALL', songIds)
            }
        },
        passQueue(data) {
            this.$emit('queueAction', data)
        },
        passPanel(data) {
            this.$emit('panelReq', data)
        },
        passSingle(data) {
            this.$emit('singlePanel', data)
        },
        updateResult(data) {
            let alreadyHaveIt = false
            for(let s = 0; s < this.allSearch.length; s++) {
                if (this.allSearch[s].key.match(data.key)) {
                    alreadyHaveIt = true
                }
            }
            if(!alreadyHaveIt) {this.allSearch.push(data)}
            if(this.searchPanel) {this.searchPanel = false}
        },
        toggleSearchPanel() {
            this.searchPanel = !this.searchPanel
            // if(this.sliderPanel) {
            //     this.sliderPanel = false
            // }
            // if(this.presetPanel) {
            //     this.presetPanel = false
            // }
        },
        toggleSliderPanel() {
            this.sliderPanel = !this.sliderPanel
            // if(this.searchPanel) {
            //     this.searchPanel = false
            // }
        },
        togglePresetPanel() {
            this.presetPanel = !this.presetPanel
            // if(this.searchPanel) {
            //     this.searchPanel = false
            // }
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
            const query = {
                rhythm: this.rhythm,
                speed: this.speed,
                experimental: this.experimental,
                mood: this.mood,
                organic: this.organic,
                search: this.allSearch 
            }
            localStorage.setItem("filterValues", JSON.stringify(query))
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
                if(this.allSearch.length == 1) {
                    this.allSearch = []
                } else {
                    for(let s = 0; s < this.allSearch.length; s++ ) {
                        if(this.allSearch[s] == word) {
                            this.allSearch.splice(s, 1)
                        }
                    }
                }
            }
        },
        updateFilter(val) { //// Don't know why this doesn't work as a separate method. Need to come back
            this.presetPanel = false
            this.sliderPanel = true
            
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
            const query = {
                rhythm: this.rhythm,
                speed: this.speed,
                experimental: this.experimental,
                mood: this.mood,
                organic: this.organic,
                search: this.allSearch 
            }
            setTimeout(()=>{
                localStorage.setItem("filterValues", JSON.stringify(query))
            }, 700)
        }
    }
}

</script>
<style scoped>
.resultWrapper {
    width: 100%;
    height: calc(100% - 40px);
    padding: 20px 0;
    top: 0;
    left: 0;
    position: fixed;
    overflow-y: scroll;
    transition-duration: 200ms;
    z-index: 0;
}

@media (max-width: 1200px) {
.resultWrapper {
    margin-top: 60px;
    padding: 0 0 20px 0;
    height: calc(100% - 100px);
}
}

@media (min-width: 1200px) {
.resultWrapper.moveToRight {
    width: calc(100% - 280px);
    left: 280px;
}

.resultWrapper.moveDown {
    height: calc(100% - 120px);
    top: 80px;
}
}
</style>