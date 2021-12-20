<template>
<div>
    <div class="resultWrapper" v-bind:class="{ moveToRight: sliderPanel || presetPanel, moveDown: searchPanel }">
        <div v-if="fltBySearch">
            <TableResultHead :songCount="songCount" v-if="componentLoaded" :ids="tempSongIDs" />
            <TableSongList :fltdsongs="fltBySearch" :song="sqPData" :dist="'result'" />
        </div>
        <div v-else><TableLoading /></div>
    </div>

<transition name="slideFRTop">
    <FilterFilters v-show="sliderPanel" :songCount="songCount" @leftPanel="leftPanel" />
</transition>
<transition name="slideFRTop">
    <FilterPresets v-show="presetPanel" :presets="presets"  @loadPreset="updateFilter()" />
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
            componentLoaded: false
        }
    },
    mounted() {
        if(this.$route.query.rth) {
            let rth = this.$route.query.rth.split('-')
            let spd = this.$route.query.spd.split('-')
            let exp = this.$route.query.exp.split('-')
            let mod = this.$route.query.mod.split('-')
            let org = this.$route.query.org.split('-')
            if(this.$route.query.keys) {
                let keys = this.$route.query.keys
                let keysTemp = keys.includes(',') ? keys.split(',') : [keys]
                let keysData = []
                for(let k = 0; k < keysTemp.length; k++) {
                    let akey = keysTemp[k].split('@')
                    let obj = { type: akey[0], key: akey[1] }
                    keysData.push(obj)
                }
                this.$store.commit('SET_ALL_SEARCH', keysData)
            }
            this.$store.commit('SET_RHY', { min: rth[0], max: rth[1] })
            this.$store.commit('SET_SPD', { min: spd[0], max: spd[1] })
            this.$store.commit('SET_EXP', { min: exp[0], max: exp[1] })
            this.$store.commit('SET_MOD', { min: mod[0], max: mod[1] })
            this.$store.commit('SET_ORG', { min: org[0], max: org[1] })
        } else {
            const values = JSON.parse(localStorage.getItem("filterValues"))
            if(values !== null) {
                if( values.rhythm.min !== 0 || values.rhythm.max !== 10 || values.speed.min !== 0 || values.speed.max !== 10 || values.experimental.min !== 0 || values.experimental.max !== 10 || values.mood.min !== 0 || values.mood.max !== 10 || values.organic.min !== 0 || values.organic.max !== 10 || values.search.length !== 0) {
                    this.$store.commit('SET_RHY', { min: values.rhythm.min, max: values.rhythm.max })
                    this.$store.commit('SET_SPD', { min: values.speed.min, max: values.speed.max })
                    this.$store.commit('SET_EXP', { min: values.experimental.min, max: values.experimental.max })
                    this.$store.commit('SET_MOD', { min: values.mood.min, max: values.mood.max })
                    this.$store.commit('SET_ORG', { min: values.organic.min, max: values.organic.max })
                    this.$store.commit('SET_ALL_SEARCH', values.search)
                } 
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
        ...mapState(['songs', 'sqPData', 'rhythm', 'speed', 'experimental', 'mood', 'organic', 'search', 'allSearch', 'tempSongIDs']),
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
            if(data.type == 'playThem') {
                let songIds = []
                for(let s = 0; s < this.fltBySearch.length; s++) {
                    let id = this.fltBySearch[s].ID
                    songIds.push(id)
                }
                this.$store.commit('PLAY_ALL', songIds)
            } else if (data.type == 'addThem') {
                let songIds = []
                for(let s = 0; s < this.fltBySearch.length; s++) {
                    let id = this.fltBySearch[s].ID
                    songIds.push(id)
                }
                this.$store.commit('ADD_ALL', songIds)
            } 
        },
        updateResult(data) {
            let alreadyHaveIt = false
            for(let s = 0; s < this.allSearch.length; s++) {
                if (this.allSearch[s].key.match(data.key)) {
                    alreadyHaveIt = true
                }
            }
            if(!alreadyHaveIt) {
                this.$store.commit('ADD_ALL_SEARCH', data)
                }
            if(this.searchPanel) {this.searchPanel = false}
        },
        // toggleSearchPanel() {
        //     this.searchPanel = !this.searchPanel
        // },
        // toggleSliderPanel() {
        //     this.sliderPanel = !this.sliderPanel
        // },
        // togglePresetPanel() {
        //     this.presetPanel = !this.presetPanel
        // },
        updateFilter() {
            this.presetPanel = false
            this.sliderPanel = true
        }
    },
    watch: {
        fltBySearch(newV, oldV) {
            let ids = []
            for (let s = 0; s < this.fltBySearch.length; s++ ) {
                ids.push(this.fltBySearch[s].ID)
            }
            this.$store.commit('SET_SONG_IDS', ids)
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
@media (max-width: 600px) {
.resultWrapper {
    padding: 0 0 60px 0;
    height: calc(100% - 120px);
}
}
</style>