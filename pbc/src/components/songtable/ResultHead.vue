<template>
  <div class="resultHead">
      <div class="resultIcon" @click="playTen">
          <p class="trackCount"><b>{{ songCount }}</b><br/>Tracks</p>
          <div class="screen">
            <img :src="require('../../assets/images/actions/playSong_light.svg')" alt="Play">
          </div>
      </div>
      <div class="resultQuery">
          <p>
          <span @click="clearValue('rhythm')">RTM <b>{{ rthValue }}</b></span>
          <span @click="clearValue('speed')">SPD <b>{{ spdValue }}</b></span>
          <span @click="clearValue('experimental')">EXP <b>{{ expValue }}</b></span>
          <span @click="clearValue('mood')">MOD <b>{{ modValue }}</b></span>
          <span @click="clearValue('organic')">ORG <b>{{ orgValue }}</b></span>
          </p>
          <p>
          <span v-for="searchKey in searchKeys" :key="searchKey" class="searchWords" @click="clearValue( searchKey )">{{ searchKey }}</span>
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
// import { ref } from '@vue/reactivity'
export default {
    name: 'ResultHead',
    props: ['songCount', 'resultQuery'],
    emits: ['clearVal', 'queueAction'],
    // setup() {
    //     const searchWords = ref('')
    //     return { searchWords }
    // },
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
        searchKeys: function() { return this.resultQuery.search },
    },
    methods: {
        clearValue(type) {
            this.$emit('clearVal', type)
        },
        playTen() {
            let data = { type: 'playTen' }
            this.$emit('queueAction', data)
        },
        // deleteKey(key) {
        //     this.$emit('deleteKey', key)
        // }
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
    background: #666;
    margin-right: 10px;
    text-align: center;
    flex-shrink: 0;
    position: relative;
}
.resultIcon .screen {
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
}
.resultIcon:hover .screen {
    opacity: 1;
    transition-duration: 200ms;
}
.resultActions {
    margin-top: 5px;
    display: flex;
    justify-content: left;
}
.trackCount {
    /* padding: 5px 10px;
    background: #666; */
    color: #fff;
    margin-top: 10px;
    /* border-radius: 5px;
    width: fit-content; */
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
.resultQuery p span:hover::after {
    content: 'CLEAR';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 10px);
    padding: 5px 0;
    background: #666;
    border-radius: 3px;
    text-align: center;
    color: #fff;
    font-size: 0.9em;
}
.resultQuery p span.searchWords:hover::after {
    content: 'DELETE';
}
</style>