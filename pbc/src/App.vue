<template>
<div>
  <div id="navRight" class="cornerNavs">
    <router-link to="/">
      <img class="navIcons" :src="require('./assets/images/header/PatternBased_Icon.svg')" alt="PatternBased">
    </router-link>
    <router-link to="/">
        <img class="navIcons" :src="require('./assets/images/header/Menu_Icon.svg')" alt="Menu">
    </router-link>
  </div>

  <router-view @panelReq="openPanel($event)"/>

  <transition name="slideFRBottom">
      <PlayerQueue v-show="queuePanel" @closeThis="closeQueue" />
  </transition>
  <transition name="slideFRBottom">
      <SimilarSongs v-show="similarPanel" :similarList="similarSongList" :ogSong="ogSongData" @closeThis="closeSimilar" />
  </transition>

  <div v-if="theSongID">
  <ThePlayer :songID="theSongID" @showPanel="openPanel($event)" />
  </div>
</div>
</template>

<script>
import getSongs from './composables/getSongs'
import getSong from './composables/getSong'
import { ref, computed } from '@vue/reactivity'
import ThePlayer from './components/player/ThePlayer.vue'
import SimilarSongs from './components/similar/SimilarSongs.vue'
import PlayerQueue from './components/player/PlayerQueue.vue'

export default {
  components: { ThePlayer, SimilarSongs, PlayerQueue },
  setup() {
    const { songs, error, load } = getSongs()
    
    const theSongID = ref('PBC0105')
    const ogSongData = ref('')
    const queueMaster = ref([])

    const similarPanel = ref(false)
    const queuePanel = ref(false)

    load()

    const { song, songerror, songload } = getSong(theSongID.value)
    songload()

    return { songs, error, song, songerror,
    theSongID, ogSongData, queueMaster,
    similarPanel, queuePanel }
  },
  computed: {
    // findASong: function() {
    //   // console.log(this.songs[10])
    //   return this.song
    // },
    similarSongList: function() {
        let gap = 1.5
        let theOG = this.ogSongData
        // if(theOG === undefined) { return console.log('undefined')} ////
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
    }
  },
  methods: {
    openPanel(da) {
      if (da.type == 'similar') {
        if (!this.similarPanel) {
          this.ogSongData = da.data
          this.similarPanel = !this.similarPanel
        } else if (this.ogSongData.ID !== da.data.ID && this.similarPanel) {
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
    }
  }
}
</script>

<style>
.cornerNavs {
  padding: 20px;
  width: fit-content;
  position: fixed;
  z-index: 1000;
}

#navRight { right: 0; }
#navLeft { left: 0; }
#navMiddle {
  padding: 20px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: -10;
}
#navMiddle img {
  height: auto;
  width: 180px;
}

.cornerNavs a {
  font-weight: bold;
  color: #2c3e50;
}

.cornerNavs a.router-link-exact-active {
  color: #0092c5;
}

.navIcons {
  width: 32px;
  height: 32px;
  margin: 0 10px;
  padding: 5px;
  cursor: pointer;
}

</style>
