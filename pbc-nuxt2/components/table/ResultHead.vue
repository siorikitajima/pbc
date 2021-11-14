<template>
<div>
  <div class="resultHead">
      <div class="resultIcon">
          <div>
            <p class="trackCount"><b>{{ songCount }}</b>
            <span> Tracks</span></p>
          </div>
        <div class="screen">
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
      </div>

      <div class="resultQuery">
          <p>
          <span @click="clearValue('rhythm')" :class="{ active: rthActive}">RTM <b>{{ rthValue }}</b></span>
          <span @click="clearValue('speed')" :class="{ active: spdActive}">SPD <b>{{ spdValue }}</b></span>
          <span @click="clearValue('experimental')" :class="{ active: expActive}">EXP <b>{{ expValue }}</b></span>
          <span @click="clearValue('mood')" :class="{ active: modActive}">MOD <b>{{ modValue }}</b></span>
          <span @click="clearValue('organic')" :class="{ active: orgActive}">ORG <b>{{ orgValue }}</b></span>
          <!-- </p>
          <p> -->
        <br class="linebreak" />
          <span v-for="searchKey in searchKeys" :key="searchKey.key" class="searchWords" @click="clearValue( searchKey )" :data-col="searchKey.type">{{ searchKey.key }}</span>
          </p>
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
            <p>Play #{{songFrom}} - #{{songTo}}</p>
        </li>
        <li @click="addThem()">
            <img :src="require('~/assets/images/actions/addToQueue_dark.svg')" alt="Add to Queue">
            <p>Add #{{songFrom}} - #{{songTo}} to Queue</p>
        </li>
        <li @click="shareURL()">
            <img :src="require('~/assets/images/actions/Share_Icon_dark.svg')" alt="Share">
            <p>Share the Result</p>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: 'ResultHead',
    props: ['songCount', 'resultQuery'],
    emits: ['clearVal', 'queueAction'],
    data() {
        return {
            songFrom: 1,
            songTo: 10,
            mobileAction: false
        }
    },
    computed: {
        rthActive() {
            if (this.resultQuery.rhythm.min == 0 && this.resultQuery.rhythm.max == 10) {
                return false } else { return true }
        },
        spdActive() {
            if (this.resultQuery.speed.min == 0 && this.resultQuery.speed.max == 10) {
                return false } else { return true }
        },
        expActive() {
            if (this.resultQuery.experimental.min == 0 && this.resultQuery.experimental.max == 10) {
                return false } else { return true }
        },
        modActive() {
            if (this.resultQuery.mood.min == 0 && this.resultQuery.mood.max == 10) {
                return false } else { return true }
        },
        orgActive() {
            if (this.resultQuery.organic.min == 0 && this.resultQuery.organic.max == 10) {
                return false } else { return true }
        },
        rthValue() { 
            return  this.resultQuery.rhythm.min + '-' + this.resultQuery.rhythm.max },
        spdValue() { 
            return this.resultQuery.speed.min + '-' + this.resultQuery.speed.max },
        expValue() { 
            return this.resultQuery.experimental.min + '-' + this.resultQuery.experimental.max },
        modValue() { 
            return this.resultQuery.mood.min + '-' + this.resultQuery.mood.max },
        orgValue() { 
            return this.resultQuery.organic.min + '-' + this.resultQuery.organic.max },
        searchKeys() { return this.resultQuery.search }
    },
    methods: {
        clearValue(type) {
            this.$emit('clearVal', type)
        },
        playThem() {
            let data = {
                type: 'playThem',
                from: Number(this.songFrom -1),
                to: Number(this.songTo)
            }
            this.$emit('queueAction', data)
        },
        addThem() {
            let data = {
                type: 'addThem',
                from: Number(this.songFrom -1),
                to: Number(this.songTo)
            }
            this.$emit('queueAction', data)
        },
        playAll() {
            let data = { 
                type: 'playThem',
                from: 0,
                to: this.songCount
             }
            this.$emit('queueAction', data)
        },
        addAll() {
            let data = { 
                type: 'addThem',
                from: 0,
                to: this.songCount
             }
            this.$emit('queueAction', data)
        },
        openAction() {
            this.mobileAction = true
        },
        closeAction() {
            this.mobileAction = false
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
.resultIcon .screen {
    width: 100%;
    height: 60px;
    background: #444;
    position: absolute;
    padding: 0 10px;
    top: 0;
    left: 0;
    opacity: 0;
    vertical-align: middle;
    overflow: hidden;
    color: #ddd;
}
.resultIcon .screen div {
    display: flex;
    justify-content: space-between;
}
.resultIcon .screen input {
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
.resultIcon .screen img {
    width: 40px;
    height: 40px;
    padding: 10px;
    cursor: pointer;
}

@media (hover: hover) {
    .resultIcon:hover .screen {
    width: max-content;
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
}
.trackCount.dark {
    font-size: 1.2em;
    margin: 20px;
    /* color: #444; */
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

div.mobileActions {
    position: absolute;
    top: 10px;
    right: 8px;
    height: 32px;
    width: 32px;
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

div.mobileActions {
    display: none;
}

}
@media (max-width: 900px) {
    div.mobileActions {
        right: 24px;
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
    .resultIcon .screen {
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
        top: 0;
    }
}
@media (max-width: 400px) {
    div.mobileActions {
        right: 0;
    }
}
</style>