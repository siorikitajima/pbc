<template>
<div>
    <div class="resultWrapper" v-bind:class="{ moveToRight: sliderPanel || presetPanel, moveDown: searchPanel }">
        <div v-if="songs.length">
            <ResultHead :songCount="songCount" :resultQuery="resultQuery" @clearVal="clearValue($event)" @queueAction="getList4Queue($event)" />
            <SongList :fltdsongs="fltBySearch" :song="song" :dist="'result'" @passThis="passSingle($event)" @openPanel="passPanel($event)" @queueAction="passQueue($event)" />
        </div>
        <div v-else><Loading /></div>
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

</div>
</template>

<script>
// import getSongs from '../composables/getSongs'
import SongList from '../components/songtable/SongList.vue'
import Loading from '../components/songtable/Loading.vue'
import ResultHead from '../components/songtable/ResultHead.vue'
import { ref, computed } from '@vue/reactivity'
import Search from '../components/filter/Search.vue'
import Filters from '../components/filter/Filters.vue'
import Presets from '../components/filter/Presets.vue'
import { onMounted } from 'vue'

export default {
    name: 'Result',
    components: { SongList, ResultHead, 
    Search, Filters, Presets, Loading }, 
    props: ['songs', 'song'],
    emits: ['panelReq', 'singlePanel', 'queueAction'],
    setup() {
        // const { songs, error, load } = getSongs()
        // load()

        const searchPanel = ref(false)
        const sliderPanel = ref(true)
        const presetPanel = ref(false)
        const componentLoaded = ref(false)
        // const initialValue = computed(()=>{
        //     if(localStorage.getItem("filterValues")) { 
        //         console.log(JSON.parse(localStorage.getItem("filterValues")))
        //         return JSON.parse(localStorage.getItem("filterValues"))
        //         // this.rhythm.min = values.rhythm.min
        //         // this.rhythm.max = values.rhythm.max
        //         // this.speed.min = values.speed.min
        //         // this.speed.max = values.speed.max
        //         // this.experimental.min = values.experimental.min
        //         // this.experimental.max = values.experimental.max
        //         // this.mood.min = values.mood.min
        //         // this.mood.max = values.mood.max
        //         // this.organic.min = values.organic.min
        //         // this.organic.max = values.organic.max
        //         // this.allSearch = values.search
        //     } else {
        //         const defaultData = {  
        //             "rhythm": { "min": 0, "max": 10 },
        //             "speed": { "min": 0, "max": 10 },
        //             "experimental": { "min": 0, "max": 10 },
        //             "mood": { "min": 0, "max": 10 },
        //             "organic": { "min": 0, "max": 10 },
        //             "search": []
        //         }
        //         console.log(defaultData)
        //         return defaultData
        //     }
        // })
        // const rhythm = ref({ min: this.initialValue.rhythm.min, max: this.initialValue.rhythm.max })
        // const speed = ref({ min: this.initialValue.speed.min, max: this.initialValue.speed.max })
        // const experimental = ref({ min: this.initialValue.experimental.min, max: this.initialValue.experimental.max })
        // const mood = ref({ min: this.initialValue.mood.min, max: this.initialValue.mood.max })
        // const organic = ref({ min: this.initialValue.organic.min, max: this.initialValue.organic.min })

        // const rhythm = ref({ min: 0, max: 10 })
        // const speed = ref({ min: 0, max: 10 })
        // const experimental = ref({ min: 0, max: 10 })
        // const mood = ref({ min: 0, max: 10 })
        // const organic = ref({ min: 0, max: 10 })
        
        // const rhythm = ref({ min: null, max: null })
        // const speed = ref({ min: null, max: null })
        // const experimental = ref({ min: null, max: null })
        // const mood = ref({ min: null, max: null })
        // const organic = ref({ min: null, max: null })

        const rhythm = ref({ min: [], max: [] })
        const speed = ref({ min: [], max: [] })
        const experimental = ref({ min: [], max: [] })
        const mood = ref({ min: [], max: [] })
        const organic = ref({ min: [], max: [] })
        const search = ref('')
        const allSearch = ref([])

        onMounted(()=> {
        const values = JSON.parse(localStorage.getItem("filterValues"))
            if(values !== null) {
                if( values.rhythm.min !== 0 || values.rhythm.max !== 10 || values.speed.min !== 0 || values.speed.max !== 10 || values.experimental.min !== 0 || values.experimental.max !== 10 || values.mood.min !== 0 || values.mood.max !== 10 || values.organic.min !== 0 || values.organic.max !== 10 || values.search.length !== 0) {
                    rhythm.value.min = values.rhythm.min
                    rhythm.value.max = values.rhythm.max
                    speed.value.min = values.speed.min
                    speed.value.max = values.speed.max
                    experimental.value.min = values.experimental.min
                    experimental.value.max = values.experimental.max
                    mood.value.min = values.mood.min
                    mood.value.max = values.mood.max
                    organic.value.min = values.organic.min
                    organic.value.max = values.organic.max
                    allSearch.value = values.search
                } 
            } else {
                    rhythm.value.min = 0
                    rhythm.value.max = 10
                    speed.value.min = 0
                    speed.value.max = 10
                    experimental.value.min = 0
                    experimental.value.max = 10
                    mood.value.min = 0
                    mood.value.max = 10
                    organic.value.min = 0
                    organic.value.max = 10
                    allSearch.value = []
            }
            componentLoaded.value = true
        })

        return { 
        searchPanel, sliderPanel, presetPanel, componentLoaded,
        rhythm, speed, experimental, mood, organic, 
        search, allSearch } 
    },
    // mounted() {
    //         const values = JSON.parse(localStorage.getItem("filterValues"))
    //         if(values !== null) {
    //             if( values.rhythm.min !== 0 || values.rhythm.max !== 10 || values.speed.min !== 0 || values.speed.max !== 10 || values.experimental.min !== 0 || values.experimental.max !== 10 || values.mood.min !== 0 || values.mood.max !== 10 || values.organic.min !== 0 || values.organic.max !== 10 || values.search.length !== 0) {
    //                 this.rhythm.min = values.rhythm.min
    //                 this.rhythm.max = values.rhythm.max
    //                 this.speed.min = values.speed.min
    //                 this.speed.max = values.speed.max
    //                 this.experimental.min = values.experimental.min
    //                 this.experimental.max = values.experimental.max
    //                 this.mood.min = values.mood.min
    //                 this.mood.max = values.mood.max
    //                 this.organic.min = values.organic.min
    //                 this.organic.max = values.organic.max
    //                 this.allSearch = values.search
    //             } 
    //         } else {
    //                 this.rhythm.min = 0
    //                 this.rhythm.max = 10
    //                 this.speed.min = 0
    //                 this.speed.max = 10
    //                 this.experimental.min = 0
    //                 this.experimental.max = 10
    //                 this.mood.min = 0
    //                 this.mood.max = 10
    //                 this.organic.min = 0
    //                 this.organic.max = 10
    //                 this.allSearch = []
    //         }
    //         this.componentLoaded = true
    // },
    computed: {
        fltBySearch: function() {
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
        songCount: function() {
            if( !this.componentLoaded || !this.songs ) {
                return null } else {
            return this.fltBySearch.length;
                }
        },
        resultQuery: function() {
            // const values = JSON.parse(localStorage.getItem("filterValues"))

// const initialQuery = {  
            //         rhythm: { min: 0, max: 10 },
            //         speed: { min: 0, max: 10 },
            //         experimental: { min: 0, max: 10 },
            //         mood: { min: 0, max: 10 },
            //         organic: { min: 0, max: 10 },
            //         search: []
            // }
            // const currentquery = {
            //     rhythm: { min: this.rhythm.min, max: this.rhythm.max },
            //     speed: { min: this.speed.min, max: this.speed.max },
            //     experimental: { min: this.experimental.min, max: this.experimental.max },
            //     mood: { min: this.mood.min, max: this.mood.max },
            //     organic: { min: this.organic.min, max: this.organic.max },
            //     search: this.allSearch 
            // }


// console.log(values)
            // if( values.rhythm.min !== 0 || values.rhythm.max !== 10 || values.speed.min !== 0 || values.speed.max !== 10 || values.experimental.min !== 0 || values.experimental.max !== 10 || values.mood.min !== 0 || values.mood.max !== 10 || values.organic.min !== 0 || values.organic.max !== 10 || values.search.length !== 0) {
            //     this.rhythm.min = values.rhythm.min
            //     this.rhythm.max = values.rhythm.max
            //     this.speed.min = values.speed.min
            //     this.speed.max = values.speed.max
            //     this.experimental.min = values.experimental.min
            //     this.experimental.max = values.experimental.max
            //     this.mood.min = values.mood.min
            //     this.mood.max = values.mood.max
            //     this.organic.min = values.organic.min
            //     this.organic.max = values.organic.max
            //     this.allSearch = values.search
            // } 


            // else if ( this.rhythm.min == 0 && this.rhythm.max == 10 && this.speed.min == 0 && this.speed.max == 10 && this.experimental.min == 0 && this.experimental.max == 10 && this.mood.min == 0 && values.mood.max == 10 && !values.organic.min == 0 && !values.organic.max == 10 && !values.search.length == 0 )
            
            // else {
            //     this.rhythm.min = initialQuery.rhythm.min
            //     this.rhythm.max = initialQuery.rhythm.max
            //     this.speed.min = initialQuery.speed.min
            //     this.speed.max = initialQuery.speed.max
            //     this.experimental.min = initialQuery.experimental.min
            //     this.experimental.max = initialQuery.experimental.max
            //     this.mood.min = initialQuery.mood.min
            //     this.mood.max = initialQuery.mood.max
            //     this.organic.min = initialQuery.organic.min
            //     this.organic.max = initialQuery.organic.max
            //     this.allSearch = initialQuery.search
            // }

            // const query = {
            //     rhythm: this.rhythm,
            //     speed: this.speed,
            //     experimental: this.experimental,
            //     mood: this.mood,
            //     organic: this.organic,
            //     search: this.allSearch 
            // }
            const query = {
                rhythm: { min: this.rhythm.min, max: this.rhythm.max },
                speed: { min: this.speed.min, max: this.speed.max },
                experimental: { min: this.experimental.min, max: this.experimental.max },
                mood: { min: this.mood.min, max: this.mood.max },
                organic: { min: this.organic.min, max: this.organic.max },
                search: this.allSearch 
            }
            // localStorage.setItem("filterValues", JSON.stringify(query))
            return query
        }
    },
    methods: {
        getList4Queue(data) {
            let songIds = []
            let thisdata
            // console.log(data)
            if(data.type == 'playAll') {
                for(let s = 0; s < this.fltBySearch.length; s++) {
                    let id = this.fltBySearch[s].ID
                    songIds.push(id)
                }
                thisdata = {type: 'playAll', data: songIds}
            } else if (data.type == 'addAll') {
                for(let s = 0; s < this.fltBySearch.length; s++) {
                    let id = this.fltBySearch[s].ID
                    songIds.push(id)
                }
                thisdata = {type: 'addAll', data: songIds}
            } else if (data.type == 'playThem') {
                // console.log(data)
                let fromNum = data.from
                let toNum = data.to
                // console.log(fromNum, toNum)
                    for(let s = fromNum; s < toNum; s++) {
                        let id = this.fltBySearch[s].ID
                        songIds.push(id)
                    }
                thisdata = {type: 'playAll', data: songIds}
            } else if (data.type == 'addThem') {
                let fromNum = data.from
                let toNum = data.to
                // console.log(fromNum, toNum)
                for(let s = fromNum; s < toNum; s++) {
                    let id = this.fltBySearch[s].ID
                    songIds.push(id)
                }
                thisdata = {type: 'addAll', data: songIds}
            }
            // console.log(thisdata)                
            this.$emit('queueAction', thisdata)
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
        // initializeFilter() {
        //     if(localStorage.getItem("filterValues")) { 
        //         const values = JSON.parse(localStorage.getItem("filterValues"))
        //         this.rhythm.min = values.rhythm.min
        //         this.rhythm.max = values.rhythm.max
        //         this.speed.min = values.speed.min
        //         this.speed.max = values.speed.max
        //         this.experimental.min = values.experimental.min
        //         this.experimental.max = values.experimental.max
        //         this.mood.min = values.mood.min
        //         this.mood.max = values.mood.max
        //         this.organic.min = values.organic.min
        //         this.organic.max = values.organic.max
        //         this.allSearch = values.search
        //     }
        // },
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
    opacity: 0.3;
    cursor: pointer;
}
.closeIcon:hover {
    opacity: 1;
    transition-duration: 200ms;
}
</style>