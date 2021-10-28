<template>
  <div class="resultHead">
      <div class="resultIcon">
          <p class="trackCount"><b>{{ songCount }}</b><br/><span> Tracks</span></p>
          <!-- <div class="screen">
            <img :src="require('../../assets/images/actions/playSong_light.svg')" alt="Play">
          </div> -->
        <div class="screen">
            <div v-if="songCount > 10">
                <input type="number" min="1" :max="songTo-1" v-model="songFrom"/>
                <p class="trackCount dark"><span> - </span></p>
                <input type="number" :min="songFrom+1" :max="songCount" v-model="songTo"/>
                <p class="trackCount dark"><span> Tracks</span></p>
                <img :src="require('../../assets/images/actions/playSong_dark.svg')" alt="Play" @click="playThem()">
                <img :src="require('../../assets/images/actions/addToQueue_dark.svg')" alt="Add to Queue" @click="addThem()">
            </div>
            <div v-else>
                <p class="trackCount dark"><b>{{ songCount }}</b><span> Tracks</span></p>
                <img :src="require('../../assets/images/actions/playSong_dark.svg')" alt="Play" @click="playAll()">
                <img :src="require('../../assets/images/actions/addToQueue_dark.svg')" alt="Add to Queue" @click="addAll()">
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
          </p>
          <p>
          <span v-for="searchKey in searchKeys" :key="searchKey.key" class="searchWords" @click="clearValue( searchKey )" :data-col="searchKey.type">{{ searchKey.key }}</span>
          </p>
          <!-- <div class="resultActions">
              <p class="trackCount"><b>{{ songCount }}</b> Tracks</p>
              <div class="shareIcon"></div>
              <div class="backToTop"></div>
          </div> -->
      </div>
  </div>
</template>

<script>
import { ref, computed } from '@vue/reactivity'
export default {
    name: 'ResultHead',
    props: ['songCount', 'resultQuery'],
    emits: ['clearVal', 'queueAction'],
    setup(props) {
        const songFrom = ref(1)
        const songTo = ref(10)

        const rthActive = computed(()=> {
            if (props.resultQuery.rhythm.min == 0 && props.resultQuery.rhythm.max == 10) {
                return false } else { return true }
        })
        const spdActive = computed(()=> {
            if (props.resultQuery.speed.min == 0 && props.resultQuery.speed.max == 10) {
                return false } else { return true }
        })
        const expActive = computed(()=> {
            if (props.resultQuery.experimental.min == 0 && props.resultQuery.experimental.max == 10) {
                return false } else { return true }
        })
        const modActive = computed(()=> {
            if (props.resultQuery.mood.min == 0 && props.resultQuery.mood.max == 10) {
                return false } else { return true }
        })
        const orgActive = computed(()=> {
            if (props.resultQuery.organic.min == 0 && props.resultQuery.organic.max == 10) {
                return false } else { return true }
        })
        return { songFrom, songTo,
        rthActive, spdActive, expActive, modActive, orgActive
        }
    },
    // data() {
    //     return {
    //     rthValue :'',
    //     spdValue :'',
    //     expValue :'',
    //     modValue :'',
    //     orgValue :''
    //     }
    // },
    computed: {
        rthValue: function() { 
            // if ( this.resultQuery.rhythm.min == !0 && this.resultQuery.rhythm.max == !10 ) 
            return  this.resultQuery.rhythm.min + '-' + this.resultQuery.rhythm.max },
        spdValue: function() { 
            // if ( this.resultQuery.speed.min == !0 && this.resultQuery.speed.max == !10 ) 
            return this.resultQuery.speed.min + '-' + this.resultQuery.speed.max },
        expValue: function() { 
            // if ( this.resultQuery.experimental.min == !0 && this.resultQuery.experimental.max == !10 ) 
            return this.resultQuery.experimental.min + '-' + this.resultQuery.experimental.max },
        modValue: function() { 
            // if ( this.resultQuery.mood.min == !0 && this.resultQuery.mood.max == !10 ) 
            return this.resultQuery.mood.min + '-' + this.resultQuery.mood.max },
        orgValue: function() { 
            // if ( this.resultQuery.organic.min == !0 && this.resultQuery.organic.max == !10 ) 
            return this.resultQuery.organic.min + '-' + this.resultQuery.organic.max },
        searchKeys: function() { return this.resultQuery.search }
        // rthActive: function() {
        //     if (this.resultQuery.rhythm.min == 0 && this.resultQuery.rhythm.max == 10) {
        //         return false
        //     } else { return true }
        // }
    },
    methods: {
        clearValue(type) {
            this.$emit('clearVal', type)
        },
        // playTen() {
        //     let data = { type: 'playTen' }
        //     this.$emit('queueAction', data)
        // },
        // deleteKey(key) {
        //     this.$emit('deleteKey', key)
        // }
        playThem() {
            let data = {
                type: 'playThem',
                from: Number(this.songFrom -1),
                to: Number(this.songTo)
            }
            // console.log(data)
            this.$emit('queueAction', data)
        },
        addThem() {
            let data = {
                type: 'addThem',
                from: Number(this.songFrom -1),
                to: Number(this.songTo)
            }
            // console.log(data)
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
        }
    }
}
</script>

<style scoped>
.resultHead {
    width: 800px;
    margin: 20px auto 10px auto;
    display: flex;
    justify-content: left;
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
/* .resultIcon .screen {
    width: 60px;
    height: 60px;
    background: #00000088;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
}
.resultIcon .screen img {
    width: 40px;
    height: 40px;
    padding: 10px;
} */
.resultIcon .screen {
    width: 40px;
    height: 60px;
    background: #ccc;
    position: absolute;
    padding: 0 10px;
    top: 0;
    left: 0;
    opacity: 0;
    vertical-align: middle;
    /* display: flex;
    justify-content: space-between; */
    overflow: hidden;
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
    background: #ddd;
    color: #444;
    border: none;
    text-align: center;
    padding: 0;
}
.resultIcon .screen img {
    width: 40px;
    height: 40px;
    padding: 10px;
    cursor: pointer;
}
.resultIcon:hover .screen {
    width: max-content;
    opacity: 1;
    transition-duration: 200ms;
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
    color: #444;
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
/* .resultQuery p {
    margin-top: 5px;
} */
.resultQuery p span {
    display: inline-block;
    padding: 3px 10px;
    border: #666 1px solid;
    /* color: #fff; */
    border-radius: 5px;
    width: fit-content;
    margin: 0 5px 6px 0;
    font-size: 0.9em;
    cursor: pointer;
    position: relative;
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
</style>