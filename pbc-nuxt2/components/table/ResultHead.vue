<template>
<div>
  <div class="resultHead">
      <div class="resultIcon">
          <div>
            <p class="trackCount"><b>{{ songCount }}</b>
            <span> Tracks</span></p>
          </div>
          <GlobalRangeSlider v-if="rangeSlider" :songCount="songCount" :type="actionType" @setRange="rangeAction($event)" @close="rangeSlider=false" />
      </div>

      <div class="resultQuery">
          <p>
          <span @click="clearValue('rhythm')" :class="{ active: rthActive }">RTM <b>{{ rthValue }}</b></span>
          <span @click="clearValue('speed')" :class="{ active: spdActive }">SPD <b>{{ spdValue }}</b></span>
          <span @click="clearValue('experimental')" :class="{ active: expActive }">EXP <b>{{ expValue }}</b></span>
          <span @click="clearValue('mood')" :class="{ active: modActive }">MOD <b>{{ modValue }}</b></span>
          <span @click="clearValue('organic')" :class="{ active: orgActive }">ORG <b>{{ orgValue }}</b></span>
        <br class="linebreak" />
          <span v-for="searchKey in searchKeys" :key="searchKey.key" class="searchWords" @click="clearSearchValue( searchKey )" :data-col="searchKey.type">{{ searchKey.key }}</span>
          <span v-if="anythingActive" class="searchWords clearAll" @click="clearAll()" >CLEAR ALL</span>
          </p>
      </div>
      <div class="actions">
            <img :src="require('~/assets/images/actions/playSong_dark.svg')" alt="Play Tracks" @click="playThem()">
            <img :src="require('~/assets/images/actions/addToQueue_dark.svg')" alt="Add to Queue" @click="addThem()">
            <img :src="require('~/assets/images/actions/Share_Icon_dark.svg')" alt="Share" @click="copyURL()">
      </div>

    <div class="mobileActions">
        <img class="actionBtn" :src="require('~/assets/images/actions/Actions_Icon.svg')" alt="Actions" @click="openAction()">
    </div>
  </div>

    <div class="panelScreen" v-show="mobileAction" @click="closeAction()"></div>
    <ul class="mobileActions" v-show="mobileAction" @click="closeAction()">
        <li class="actionHead">
            <p>RTM <b>{{ rthValue }}</b>, SPD <b>{{ spdValue }}</b>, EXP <b>{{ expValue }}</b>, MOD <b>{{ modValue }}</b>, ORG <b>{{ orgValue }}</b>, <span v-for="searchKey in searchKeys" :key="searchKey.key">{{ searchKey.key }}, </span></p>
        </li>

        <li @click="playThem()">
            <img :src="require('~/assets/images/actions/playSong_dark.svg')" alt="Play Track">
            <p>Play Tracks</p>
        </li>
        <li @click="addThem()">
            <img :src="require('~/assets/images/actions/addToQueue_dark.svg')" alt="Add to Queue">
            <p>Add to Queue</p>
        </li>
        <li @click="copyURL()">
            <img :src="require('~/assets/images/actions/Share_Icon_dark.svg')" alt="Share">
            <p>Share the Search Result</p>
        </li>
    </ul>
</div>
</template>

<script>
import { mapState } from 'vuex';
import GlobalRangeSlider from "~/components/global/rangeSlider"

export default {
    name: 'ResultHead',
    props: ['songCount', 'ids'],
    components: { GlobalRangeSlider },
    data() {
        return {
            songFrom: 1,
            songTo: 10,
            actionType: '',
            mobileAction: false,
            rangeSlider: false
        }
    },
    computed: {
        ...mapState(['rhythm', 'speed', 'experimental', 'mood', 'organic', 'filter']),
        rthActive() {
            if (this.rhythm.min == 0 && this.rhythm.max == 10) {
                return false } else { return true }
        },
        spdActive() {
            if (this.speed.min == 0 && this.speed.max == 10) {
                return false } else { return true }
        },
        expActive() {
            if (this.experimental.min == 0 && this.experimental.max == 10) {
                return false } else { return true }
        },
        modActive() {
            if (this.mood.min == 0 && this.mood.max == 10) {
                return false } else { return true }
        },
        orgActive() {
            if (this.organic.min == 0 && this.organic.max == 10) {
                return false } else { return true }
        },
        rthValue() { 
            return  this.rhythm.min + '-' + this.rhythm.max },
        spdValue() { 
            return this.speed.min + '-' + this.speed.max },
        expValue() { 
            return this.experimental.min + '-' + this.experimental.max },
        modValue() { 
            return this.mood.min + '-' + this.mood.max },
        orgValue() { 
            return this.organic.min + '-' + this.organic.max },
        searchKeys() { 
            let searches = []
            if ( this.filter.album.length !== 0 ) {
                this.filter.album.forEach(a => searches.push(a))
            }
            if ( this.filter.project.length !== 0 ) {
                this.filter.project.forEach(a => searches.push(a))
            }
            if ( this.filter.artist.length !== 0 ) {
                this.filter.artist.forEach(a => searches.push(a))
            }
            if ( this.filter.song.length !== 0 ) {
                this.filter.song.forEach(a => searches.push(a))
            }
            if ( this.filter.instrument.length !== 0 ) {
                this.filter.instrument.forEach(a => searches.push(a))
            }
            if ( this.filter.genre.length !== 0 ) {
                this.filter.genre.forEach(a => searches.push(a))
            }
            if ( this.filter.tag.length !== 0 ) {
                this.filter.tag.forEach(a => searches.push(a))
            }
            if ( this.filter.mood.length !== 0 ) {
                this.filter.mood.forEach(a => searches.push(a))
            }
            if ( this.filter.search.length !== 0 ) {
                this.filter.search.forEach(a => searches.push(a))
            }
            return searches
        },
        anythingActive() {
            if (this.rthActive || this.spdActive || this.expActive || this.modActive || this.orgActive || this.searchKeys.length > 0) {
                return true
            } else { return false }
        }
    },
    methods: {
        clearValue(type) {
            if(type == 'rhythm') {
                this.$store.commit('SET_RHY', { min: 0, max: 10 })
            } else if (type == 'speed') {
                this.$store.commit('SET_SPD', { min: 0, max: 10 })
            } else if (type == 'experimental') {
                this.$store.commit('SET_EXP', { min: 0, max: 10 })
            } else if (type == 'mood') {
                this.$store.commit('SET_MOD', { min: 0, max: 10 })
            } else if (type == 'organic') {
                this.$store.commit('SET_ORG', { min: 0, max: 10 })
            } 
            const query = {
                rhythm: { min: this.rhythm.min, max: this.rhythm.max },
                speed: { min: this.speed.min, max: this.speed.max },
                experimental: { min: this.experimental.min, max: this.experimental.max },
                mood: { min: this.mood.min, max: this.mood.max },
                organic: { min: this.organic.min, max: this.organic.max }
            }
            localStorage.setItem("filterValues", JSON.stringify(query))
        },
        clearSearchValue(data) {
            for(let s = 0; s < this.searchKeys.length; s++ ) {
                if(this.searchKeys[s].type == data.type && this.searchKeys[s].key == data.key) {
                    if(data.type == 'album') {
                    this.$store.commit('rmFilterAlbum', data.id)
                    } else if(data.type == 'artist') {
                    this.$store.commit('rmFilterArtist', data.id)
                    } else if(data.type == 'project') {
                    this.$store.commit('rmFilterProject', data.key)
                    } else if(data.type == 'song') {
                    this.$store.commit('rmFilterSong', data.id)
                    } else if(data.type == 'instrument') {
                    this.$store.commit('rmFilterInstrument', data.id)
                    } else if(data.type == 'genre') {
                    this.$store.commit('rmFilterGenre', data.id)
                    } else if(data.type == 'tag') {
                    this.$store.commit('rmFilterTag', data.id)
                    } else if(data.type == 'mood') {
                    this.$store.commit('rmFilterMood', data.id)
                    } else if(data.type == 'search') {
                    this.$store.commit('rmFilterSearch', data.id)
                    }
                }
            }
            localStorage.setItem("searchKeys", JSON.stringify(this.filter))
        },
        playThem() {
            if(this.ids.length < 11) {                
                this.$store.dispatch('playThemAction', this.ids)
            } else {
                this.actionType = 'PLAY'
                this.rangeSlider = true
            }
        },
        addThem() {
            if(this.ids.length < 11) {
                this.$store.dispatch('AddThemAction', this.ids)
            } else {
                this.actionType = 'ADD TO QUEUE'
                this.rangeSlider = true
            }
        },
        rangeAction(data) {
            let payload = { data: data, ids: this.ids }
            this.$store.dispatch('setRange', payload)
        },
        openAction() {
            this.mobileAction = true
        },
        closeAction() {
            this.mobileAction = false
        },
        copyURL() {
            let searches = ''
            let query
            if(this.searchKeys.length > 0) {
                for(let s = 0; s < this.searchKeys.length; s++) {
                    if(s < this.searchKeys.length - 1) {
                        let akey = this.searchKeys[s].type + '@' + encodeURI(this.searchKeys[s].key) + ','
                        searches = searches + akey
                    } else {
                        let akey = this.searchKeys[s].type + '@' + encodeURI(this.searchKeys[s].key)
                        searches = searches + akey  
                    }
                }
                query = '?rth=' + this.rthValue + '&spd=' + this.spdValue + '&exp=' + this.expValue + '&mod=' + this.modValue + '&org=' + this.orgValue + '&keys=' + searches
            } else {
                query = '?rth=' + this.rthValue + '&spd=' + this.spdValue + '&exp=' + this.expValue + '&mod=' + this.modValue + '&org=' + this.orgValue
            }

            const url = 'https://' + window.location.hostname + query
            this.$store.dispatch('CopyURL', url)
            console.log(url)
        },
        clearAll() {
            this.$store.commit('clearFilter')
            this.$store.commit('CLEAR_PB_FILTERS')
            const query = {
                rhythm: { min: this.rhythm.min, max: this.rhythm.max },
                speed: { min: this.speed.min, max: this.speed.max },
                experimental: { min: this.experimental.min, max: this.experimental.max },
                mood: { min: this.mood.min, max: this.mood.max },
                organic: { min: this.organic.min, max: this.organic.max }
            }
            localStorage.setItem("filterValues", JSON.stringify(query))
            localStorage.setItem("searchKeys", JSON.stringify(this.filter))
        }
    }
}
</script>

<style scoped>
.resultHead {
    width: 800px;
    max-width: 90%;
    margin: 20px auto 10px auto;
    display: flex;
    justify-content: left;
    position: relative;
}
.resultHead .actions {
    position: absolute;
    margin: 0;
    top: 0;
    right: 0;
}
@media (hover: none) {
    .resultHead .actions {
        display: none;
    }
}
.resultIcon {
    width: 60px;
    height: 60px;
    background: #444;
    margin-right: 10px;
    text-align: center;
    flex-shrink: 0;
    position: relative;
    z-index: 100;
}
.resultIcon .rangeSelector {
    opacity: 0;
}

@media (hover: hover) {
    .resultIcon:hover .rangeSelector {
    opacity: 1;
    transition-duration: 200ms;
}
}
.resultActions {
    margin-top: 5px;
    display: flex;
    justify-content: left;
}
.trackCount {
    color: #fff;
    margin-top: 10px;
    font-size: 1.1em;
}
.trackCount.dark {
    font-size: 1.2em;
    margin: 20px;
}
.trackCount span {
    font-size: 0.9em;
}
.shareIcon, .backToTop {
    width: 32px;
    height: 32px;
    background: #666;
    margin-left: 10px;
}
.resultQuery p span {
    padding: 4px 10px;
    border: #666 1px solid;
    display: inline-block;
    border-radius: 5px;
    width: fit-content;
    margin: 0 5px 6px 0;
    font-size: 0.9em;
    cursor: pointer;
    position: relative;
    line-height: 1.2em;
}
.resultQuery p span.active {
    color: #fff; 
    border: #0092c5 1px solid;
    background: #0092c5;
}
.resultQuery p span.searchWords { color: #fff; }
.resultQuery p span.searchWords[data-col="artist"] {  
    background: #F94144; 
    border: #F94144 1px solid;}
.resultQuery p span.searchWords[data-col="project"] {  
    background: #90BE6D; 
    border: #90BE6D 1px solid;}
.resultQuery p span.searchWords[data-col="album"] {  
    background: #F3722C; 
    border: #F3722C 1px solid;}
.resultQuery p span.searchWords[data-col="song"] {  
    background: #43AA8B; 
    border: #43AA8B 1px solid;}
.resultQuery p span.searchWords[data-col="instrument"] {  
    background: #F8961E; 
    border: #F8961E 1px solid;}
.resultQuery p span.searchWords[data-col="genre"] {  
    background: #577590; 
    border: #577590 1px solid;}
.resultQuery p span.searchWords[data-col="tag"] {  
    background: #F9C74F; 
    border: #F9C74F 1px solid;}
.resultQuery p span.searchWords[data-col="mood"] {  
    background: #6b5790; 
    border: #6b5790 1px solid;}
.resultQuery p span.searchWords[data-col="search"] {  
    background: #666; 
    border: #666 1px solid;}

.resultQuery p span.searchWords.clearAll {
    background: #444;
}
div.mobileActions {
    position: absolute;
    top: 10px;
    right: 20px;
    height: 32px;
    width: 32px;
    opacity: 0.7;
}
div.mobileSldr {
    width: calc(100% - 20px);
    background:#333;
    height: fit-content;
    position: fixed;
    bottom: 40px;
    padding: 30px 10px;
    left: 0;
    z-index: 2200;
}

.range-slider {
    margin: 10px auto 30px auto;
}

.range-slider input {
    background: #222;
}
.panelNav {
    width: 32px;
    height: 32px;
    position: fixed;
}
.panelNav.closeIcon, .panelNav.setIcon {
    bottom: 150px;
    right: 20px;
}

@media (hover: hover) {
.resultQuery p span.active:hover::after, .resultQuery p span.searchWords:hover::after {
    content: 'CLEAR';
    position: absolute;
    top: -1px;
    left: -1px;
    width: 100%;
    height: calc(100% - 10px);
    padding: 5px 0;
    background: #666;
    border: #666 1px solid;
    border-radius: 5px;
    text-align: center;
    color: #fff;
    font-size: 0.9em;
}
.resultQuery p span.searchWords:hover::after {
    content: 'DELETE';
}
.resultQuery p span.searchWords.clearAll:hover::after {
    content: 'CLEAR ALL';
    font-size: 1em;
}

div.mobileActions {
    display: none;
}

}
@media (max-width: 900px) {
    div.mobileActions {
        right: 16px;
    }
}
@media (max-width: 760px) {
    br.linebreak {
        display: none;
    }
    .resultQuery {
        width: calc(100% - 120px);
    }
}
@media (max-width: 600px) {
    .resultHead {
        display: block;
    }
    .resultIcon .rangeSelector {
        display: none;
    }
    .resultIcon {
        width: max-content;
        height: unset;
        padding: 0 0 10px 0;
        background: unset;
    }
    .resultIcon .trackCount {
        color: #222;
        font-size: 1.4em;
    }
    .resultQuery {
        width: 100%;
    }
    div.mobileActions {
        display: block;
        top: 0;
    }
    .resultHead .actions {
        display: none;
    }
    div.mobileSldr {
        bottom: 100px;
    }
    .panelNav.closeIcon, .panelNav.setIcon {
        bottom: 210px;
    }
}
@media (max-width: 600px) {
    .panelNav.closeIcon, .panelNav.setIcon {
        bottom: 220px;
        right: 10px;
    }
}
</style>