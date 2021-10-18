<template>
<div>
  <teleport to="#sidePanels">
  <SideNav />
  </teleport>

  <router-view :songs="songs" @panelReq="openPanel($event)" @singlePanel="openSingle($event)" :key="$route.fullPath" @queueAction="updateQueue($event)" />

  <transition name="slideFRBottom">
      <PlayerQueue v-show="queuePanel" :spQueue="queueSongsData" :sqPlaying="sqPlayingData" :sqEnded="sqEndedData" @closeThis="closeQueue" @queueAction="updateQueue($event)" />
  </transition>
  <transition name="slideFRBottom">
      <SimilarSongs v-show="similarPanel" :similarList="similarSongList" :ogSong="ogSongData" @closeThis="closeSimilar"  @singlePanel="openSingle($event)" @queueAction="updateQueue($event)" />
  </transition>

  <div v-if="songs.length">
      <ThePlayer :song="sqPlayingData" @showPanel="openPanel($event)" @playerHandler="playerHandler($event)" />
  </div>

<teleport to="#singlePanels">
  <div v-if="singlePanels" class="singlePanelScreen" @click="closeSingles"></div> 
    <div v-if="singlePanels" class="singlePageCoutainer">
        <SingleSong v-if="singleSongPanel" :song="tempSongData" :panel="true" @passPanel="openPanel($event)" @closeSingle="closeSinglePanel" @queueAction="updateQueue($event)" />
        <SongInfoPanel v-if="singleSongPanel" :song="tempSongData" @closeSingle="closeSinglePanel" />
        <div class="closeIcon" @click="closeSingles">
            <img :src="require('./assets/images/global/Close_Icon_dark.svg')" alt="Close">
        </div>
    </div>
</teleport>

</div>
</template>

<script>
import getSingleSong from './composables/getSingleSong'
import getSongs from './composables/getSongs'
import { ref } from '@vue/reactivity'
import ThePlayer from './components/player/ThePlayer.vue'
import SimilarSongs from './components/similar/SimilarSongs.vue'
import PlayerQueue from './components/player/PlayerQueue.vue'
import SingleSong from './components/singles/SingleSong.vue'
import SongInfoPanel from './components/singles/SongInfoPanel.vue'
import SideNav from './components/global/SideNav'

export default {
  components: { ThePlayer, SimilarSongs, PlayerQueue, SingleSong, SongInfoPanel, SideNav },
  setup() {
    const { songs, error, load } = getSongs()
    load()
    const theSongID = ref('PBC0105')
    const ogSongData = ref('')
    const queueMaster = ref([])

    const similarPanel = ref(false)
    const queuePanel = ref(false)

    const singlePanels = ref(false)
    const singleSongPanel = ref(false)
    const tempSongData = ref('')
    const tempAlbumData = ref('')

    const spQueue = ref([])
    const sqPlaying = ref([])
    const sqEnded = ref([])

    return { songs, error, 
    theSongID, ogSongData, queueMaster,
    similarPanel, queuePanel,
    singleSongPanel, singlePanels, tempSongData, tempAlbumData,
    spQueue, sqPlaying, sqEnded }
  },
  computed: {
    similarSongList: function() {
        let gap = 1.5
        let theOG = this.ogSongData
        return this.songs.filter((song) => {
            let minRhythm = ( theOG.PBRhythm < gap ) ? 0 : theOG.PBRhythm - gap
            let maxRhythm = ( theOG.PBRhythm > (10 - gap) ) ? 10 : theOG.PBRhythm + gap
            let minSpeed = ( theOG.PBSpeed < gap ) ? 0 : theOG.PBSpeed - gap
            let maxSpeed = ( theOG.PBSpeed > (10 - gap) ) ? 10 : theOG.PBSpeed + gap
            let minExperimental = ( theOG.PBExperimental < gap ) ? 0 : theOG.PBExperimental - gap
            let maxExperimental = ( theOG.PBExperimental > (10 - gap) ) ? 10 : theOG.PBExperimental + gap
            let minMood = ( theOG.PBMood < gap ) ? 0 : theOG.PBMood - gap
            let maxMood = ( theOG.PBMood > (10 - gap) ) ? 10 : theOG.PBMood + gap                 
            let minOrganic = ( theOG.PBOrganic < gap ) ? 0 : theOG.PBOrganic - gap
            let maxOrganic = ( theOG.PBOrganic > (10 - gap) ) ? 10 : theOG.PBOrganic + gap
            if ( song.PBRhythm >= minRhythm && song.PBRhythm <= maxRhythm && song.PBSpeed >= minSpeed && song.PBSpeed <= maxSpeed && song.PBExperimental >= minExperimental && song.PBExperimental <= maxExperimental && song.PBMood >= minMood && song.PBMood <= maxMood && song.PBOrganic >= minOrganic && song.PBOrganic <= maxOrganic && song.ID !== theOG.ID ) { return true }
            else { return false }
        })
    },
    queueSongsData: function() {
        let queueData = []
        if(this.spQueue.length == 0 && !localStorage.getItem("spQueue")) { 
          return []
        } else {
          if(this.spQueue.length == 0 && localStorage.getItem("spQueue")) {
              this.spQueue = JSON.parse(localStorage.getItem("spQueue"))
          }
          for(let q = 0; q < this.spQueue.length; q++) {
            for(let s = 0; s < this.songs.length; s++) {
              if( this.songs[s].ID == this.spQueue[q] ) {
                queueData.push(this.songs[s])
              }
          }
        }
        localStorage.setItem("spQueue", JSON.stringify(this.spQueue))
      }  
      return queueData
    },
    sqPlayingData: function() {
        let sqPlayingData = []
        if(this.sqPlaying.length == 0 && !localStorage.getItem("sqPlaying")) { 
          return this.songs[0]
        } else {
          if(this.sqPlaying.length == 0 && localStorage.getItem("sqPlaying")) {
              this.sqPlaying = JSON.parse(localStorage.getItem("sqPlaying"))
          }
          for(let s = 0; s < this.songs.length; s++) {
            if( this.songs[s].ID == this.sqPlaying[0] ) {
              sqPlayingData.push(this.songs[s])
            }
        }
        localStorage.setItem("sqPlaying", JSON.stringify(this.sqPlaying))
        return sqPlayingData[0]
      }  
    },
    // sqNextData: function() {
    //     let sqNextData = []
    //     if(this.sqPlaying.length == 0 && !localStorage.getItem("sqPlaying")) { 
    //       return this.songs[1]
    //     } else {
    //       if(this.sqPlaying.length == 0 && localStorage.getItem("sqPlaying")) {
    //           this.sqPlaying = JSON.parse(localStorage.getItem("sqPlaying"))
    //       }
    //       for(let s = 0; s < this.songs.length; s++) {
    //         if( this.songs[s].ID == this.spQueue[0] ) {
    //           sqNextData.push(this.songs[s])
    //         }
    //     }
    //     localStorage.setItem("sqPlaying", JSON.stringify(this.sqPlaying))
    //     return sqNextData[0]
    //   }  
    // },
    sqEndedData: function() {
        let endedData = []
        if(this.sqEnded.length == 0 && !localStorage.getItem("sqEnded")) { 
          return []
        } else {
          if(this.sqEnded.length == 0 && localStorage.getItem("sqEnded")) {
              this.sqEnded = JSON.parse(localStorage.getItem("sqEnded"))
          }
          for(let q = 0; q < this.sqEnded.length; q++) {
            for(let s = 0; s < this.songs.length; s++) {
              if( this.songs[s].ID == this.sqEnded[q] ) {
                endedData.push(this.songs[s])
              }
          }
        }
        localStorage.setItem("sqEnded", JSON.stringify(this.sqEnded))
      }  
      return endedData
    }
  },
  methods: {
    openPanel(da) {
      if (da.type == 'similar') {
        if (!this.similarPanel) {
          this.ogSongData = da.data
          this.similarPanel = !this.similarPanel
          if(this.singlePanels) { this.closeSingles() }
        } else if (this.ogSongData.ID !== da.data.ID && this.similarPanel) {
          if(this.singlePanels) { this.closeSingles() }
          this.similarPanel = false
          this.ogSongData = da.data
          setTimeout(() => { this.similarPanel = true}, 200)
        } else {
          this.similarPanel = !this.similarPanel
        }
      } else if (da.type == 'queue') {
        this.queuePanel = !this.queuePanel
      }
    },
    closeSimilar() {
      this.similarPanel = false
    },
    closeQueue() {
      this.queuePanel = false
    },
    closeSinglePanel() {
      this.singleSongPanel = false
      this.singlePanels = false
    },
    async openSingle(data) {
    let singleType = data.type
    if(singleType == 'song') {
      const { singlesong, singlesongload } = getSingleSong(data.data.ID)
      await singlesongload()
        this.tempSongData = await singlesong
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
    updateQueue(data) {
      let action = data.type
      if(action == 'add') { 
        if(!this.spQueue.includes(data.data)) {
          this.spQueue.push(data.data) 
        }
      }
      else if(action == 'remove') { 
        const index = this.spQueue.indexOf(data.data)
        this.spQueue.splice(index, 1)
      }
      else if(action == 'play') { 
        if(!this.spQueue.includes(data.data)) {
          this.spQueue.unshift(data.data) 
        } else {
          const index = this.spQueue.indexOf(data.data)
          this.spQueue.splice(index, 1)
          this.spQueue.unshift(data.data)
        }
        this.sqEnded.push(this.sqPlaying[0])
        this.sqPlaying.splice(0, 1)
        this.sqPlaying.push(this.spQueue[0])
        this.spQueue.splice(0, 1)
      }
      else if(action == 'skip') {
        const index = this.spQueue.indexOf(data.data)
        this.spQueue.splice(index, 1)
        this.spQueue.unshift(data.data)
        this.sqEnded.push(this.sqPlaying[0])
        this.sqPlaying.splice(0, 1)
        this.sqPlaying.push(this.spQueue[0])
        this.spQueue.splice(0, 1)
      }
      else if(action == 'playAll') {
        const reversed = data.data.reverse()
        for (let s = 0; s < reversed.length; s++) {
          this.spQueue.unshift(reversed[s])
        }
        this.sqEnded.push(this.sqPlaying[0])
        this.sqPlaying.splice(0, 1)
        this.sqPlaying.push(this.spQueue[0])
        this.spQueue.splice(0, 1)
      }
      else if(action == 'addAll') {
        for (let s = 0; s < data.data.length; s++) {
          this.spQueue.push(data.data[s])
        }
      }
      else if (action == 'removeEnded') {
        const index = this.sqEnded.indexOf(data.data)
        this.sqEnded.splice(index, 1)
      }
      else if (action == 'deleteAll') {
        this.sqEnded.splice(0)
        localStorage.setItem("sqEnded", JSON.stringify(this.sqEnded))
        // this.sqPlaying.splice(0)
        // localStorage.setItem("sqPlaying", JSON.stringify(this.sqPlaying))
        this.spQueue.splice(0)
        localStorage.setItem("spQueue", JSON.stringify(this.spQueue))
      }
    },
    playerHandler(data) {
      if(data.type == 'next') {
        this.sqEnded.push(this.sqPlaying[0])
        localStorage.setItem("sqEnded", JSON.stringify(this.sqEnded))
        this.sqPlaying.splice(0, 1)
        this.sqPlaying.push(this.spQueue[0])
        localStorage.setItem("sqPlaying", JSON.stringify(this.sqPlaying))
        this.spQueue.splice(0, 1)
        if(this.spQueue.length == 0) {
          const theNext = this.generateNextSong()
          console.log(theNext)
          const theNextId = theNext.ID
          this.spQueue.push(theNextId)
        }
        localStorage.setItem("spQueue", JSON.stringify(this.spQueue))

      } else if(data.type == 'prev') {
        this.spQueue.unshift(this.sqPlaying[0])
        localStorage.setItem("spQueue", JSON.stringify(this.spQueue))
        this.sqPlaying.splice(0, 1)
        this.sqPlaying.push(this.sqEnded[this.sqEnded.length - 1])
        localStorage.setItem("sqPlaying", JSON.stringify(this.sqPlaying))
        this.sqEnded.splice(this.sqEnded.length - 1, 1)
        localStorage.setItem("sqEnded", JSON.stringify(this.sqEnded))
      }
    },
    generateNextSong() {
        let gap = 1.5
        const randomNum = Math.random() * (this.songs.length - 1);
        let theOG = this.sqPlayingData
        let nextsong = []
        let minRhythm = ( theOG.PBRhythm < gap ) ? 0 : theOG.PBRhythm - gap
        let maxRhythm = ( theOG.PBRhythm > (10 - gap) ) ? 10 : theOG.PBRhythm + gap
        let minSpeed = ( theOG.PBSpeed < gap ) ? 0 : theOG.PBSpeed - gap
        let maxSpeed = ( theOG.PBSpeed > (10 - gap) ) ? 10 : theOG.PBSpeed + gap
        let minExperimental = ( theOG.PBExperimental < gap ) ? 0 : theOG.PBExperimental - gap
        let maxExperimental = ( theOG.PBExperimental > (10 - gap) ) ? 10 : theOG.PBExperimental + gap
        let minMood = ( theOG.PBMood < gap ) ? 0 : theOG.PBMood - gap
        let maxMood = ( theOG.PBMood > (10 - gap) ) ? 10 : theOG.PBMood + gap                 
        let minOrganic = ( theOG.PBOrganic < gap ) ? 0 : theOG.PBOrganic - gap
        let maxOrganic = ( theOG.PBOrganic > (10 - gap) ) ? 10 : theOG.PBOrganic + gap
        for(let s = 0; s < this.songs.length; s++) {
            if ( this.songs[s].PBRhythm >= minRhythm && this.songs[s].PBRhythm <= maxRhythm && this.songs[s].PBSpeed >= minSpeed && this.songs[s].PBSpeed <= maxSpeed && this.songs[s].PBExperimental >= minExperimental && this.songs[s].PBExperimental <= maxExperimental && this.songs[s].PBMood >= minMood && this.songs[s].PBMood <= maxMood && this.songs[s].PBOrganic >= minOrganic && this.songs[s].PBOrganic <= maxOrganic && this.songs[s].ID !== theOG.ID ) { 
              nextsong = [this.songs[s]];
              break;
            } else { 
              nextsong = [this.songs[randomNum]];
            }
        }
        return nextsong[0]
    }
  }
}
</script>

<style>


</style>
