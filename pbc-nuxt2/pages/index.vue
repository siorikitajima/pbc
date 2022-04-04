<template>
<div>
    <div class="resultWrapper" v-bind:class="{ moveToRight: sliderPanel || presetPanel, moveDown: searchPanel }" @scroll="onScroll">
        <div v-if="componentLoaded">
            <TableResultHead :songCount="songCount" v-if="componentLoaded" :ids='SearchedIDs' />
            <TableSongList :fltdsongs="SearchedSongs.slice(0, loadNum.loadTo)" :dist="'result'" />
        </div>
        <div v-else><TableLoading /></div>
    </div>

<transition name="slideFRTop">
    <FilterFilters v-show="sliderPanel" :songCount="songCount" @leftPanel="leftPanel($event)" />
</transition>
<transition name="slideFRTop">
    <FilterPresets v-show="presetPanel" :presets="presets"  @loadPreset="updateFilter()" />
</transition>
<transition name="slideFRLeft">
    <FilterSearch @loadSearch="searchPanel = false" v-show="searchPanel" :searchKeys="searchKeys" :focus="searchPanel" ref="searchComp" />
</transition>

<FilterIcons :sliderPanel="sliderPanel" :presetPanel="presetPanel" :searchPanel="searchPanel" @leftPanel="leftPanel($event)" />

<PanelTutorial v-if="tutorialPanel" />
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
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
            loadNum: {
                offset: 0,
                loadTo: 20
            },
            loadMoreDone: true
        }
    },
    mounted() {
        if (localStorage.getItem("tutorial") && !this.tutorialPanel) {
            this.$store.commit('CLOSE_TUTORIAL')
        } else {
            this.$store.commit('OPEN_TUTORIAL')
        }
        this.$store.commit('clearFilter')
        if(this.$route.query.rth) {
            let rth = this.$route.query.rth.split('-')
            let spd = this.$route.query.spd.split('-')
            let exp = this.$route.query.exp.split('-')
            let mod = this.$route.query.mod.split('-')
            let org = this.$route.query.org.split('-')
            let dns = this.$route.query.dns.split('-')
            if(this.$route.query.keys) {
                let keys = this.$route.query.keys
                let keysTemp = keys.includes(',') ? keys.split(',') : [keys]
                for(let k = 0; k < keysTemp.length; k++) {
                    let akey = keysTemp[k].split('@')
                    let obj = { type: akey[0], key: akey[1] }
                    if (obj.type == 'artist') { 
                        this.$store.commit('addFilterArtist', obj) }
                    else if (obj.type == 'project') {
                        this.$store.commit('addFilterProject', obj) }
                    else if (obj.type == 'album') {
                        this.$store.commit('addFilterAlbum', obj) }
                    else if (obj.type == 'song') {
                        this.$store.commit('addFilterSong', obj) }
                }
            }
            this.$store.commit('SET_PRESETS_OG', {rhyMin:rth[0], rhyMax:rth[1], spdMin:spd[0], spdMax:spd[1], expMin:exp[0], expMax:exp[1], modMin:mod[0], modMax:mod[1], orgMin:org[0], orgMax:org[1], dnsMin:dns[0], dnsMax:dns[1] })
        } else if (localStorage.getItem("filterValues")) {
            const va = JSON.parse(localStorage.getItem("filterValues"))
            if(!va.density) { va.density = { min: 0, max: 10} }
            const da = { rhyMin: Number(va.rhythm.min), rhyMax: Number(va.rhythm.max), spdMin: Number(va.speed.min), spdMax: Number(va.speed.max), expMin: Number(va.experimental.min), expMax: Number(va.experimental.max), modMin: Number(va.mood.min), modMax: Number(va.mood.max), orgMin: Number(va.organic.min), orgMax: Number(va.organic.max), dnsMin: Number(va.density.min), dnsMax: Number(va.density.max) }
            this.$store.commit('SET_PRESETS_OG', da)            
        }

        if (localStorage.getItem("searchKeys")) {
            const va = JSON.parse(localStorage.getItem("searchKeys"))
            this.$store.commit('setAllFilter', { album: va.album, artist: va.artist, project: va.project, song: va.song, instrument: va.instrument, genre: va.genre, tag: va.tag, mood: va.mood, search: va.search, order: va.order })
        } else {
            this.$store.commit('clearFilter')
            localStorage.setItem("searchKeys", JSON.stringify(this.filter))
        }
        this.componentLoaded = true
        this.$store.commit('HIDE_LOADING')
    },
    computed: {
        ...mapState(['rhythm', 'speed', 'experimental', 'mood', 'organic', 'density', 'filter', 'tutorialPanel']),
        ...mapGetters({
            // PBfilteredSongs: 'PB_FILTERED_SONGS',
            SearchedSongs: 'FILTERED_SONGS_SEARCH',
            SearchedIDs: 'FILTERED_SONGS_IDS'
        }),
        songCount() {
            if( !this.componentLoaded || !this.SearchedSongs ) {
                return null } else {
            return this.SearchedSongs.length;
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
        updateFilter() {
            this.presetPanel = false
            if(this.isMobile) {
                this.sliderPanel = false
            } else {
                this.sliderPanel = true
            }
        },
        onScroll ({ target: { scrollTop, clientHeight, scrollHeight }}) {
            if (scrollTop + clientHeight >= scrollHeight && this.loadMoreDone) {
                this.loadMoreDone = false
                this.loadMorePosts()
                setTimeout(() => {
                    this.loadMoreDone = true
                }, 1000)
            }
        },
        loadMorePosts(){
            let offset = this.loadNum.loadTo
            let leftOvers = this.songCount - offset
            this.loadNum.offset = offset
            this.loadNum.loadTo = (leftOvers < (offset + 20)) ? this.songCount : offset + 20
        }
    },
    // watch: { 
    //   	filter(newV, oldV) { 
    //         this.SearchedSongs()
    //         console.log(this.filter, this.SearchedSongs())
    //     }
    // }
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
    padding: 0 0 100px 0;
    height: calc(100% - 160px);
}
}
</style>