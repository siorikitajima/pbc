<template>
  <div class="pagewrapper" v-if="singlesong">
        <SingleSong :song="singlesong" @passPanel="passPanel($event)" />
        <SongInfoPage :song="singlesong" />

        <h2>// SIMILAR SONGS //</h2>
        <div v-if="similarSongList.length">
            <SongList :songs="similarSongList" @passThis="openSingle($event)" @openPanel="passPanel($event)" />
        </div>
        <div v-else> Loading... </div>
  </div>
</template>

<script>
import SingleSong from '../components/singles/SingleSong.vue'
import SongInfoPage from '../components/singles/SongInfoPage.vue'
import getSingleSong from '../composables/getSingleSong'
import getSongs from '../composables/getSongs'
import SongList from '../components/songtable/SongList.vue'

import { ref } from '@vue/reactivity'

export default {
    name: 'SingleSongPage',
    components: { SingleSong, SongInfoPage, SongList },
    emits: ['panelReq'],
    props: [ 'id', 'title' ],
    setup(props) {
        const theID = ref(props.id)
        
        const { singlesong, singlesongerror, singlesongload } = getSingleSong(theID.value)
        singlesongload()

        const { songs, error, load } = getSongs()
        load()

        return { singlesong, singlesongerror, songs, error }
    },
    methods: {
        passPanel(data) {
            this.$emit('panelReq', data)
        },
    },
    computed: {
    similarSongList: function() {
        let gap = 1.5
        let theOG = this.singlesong
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
    }
}
</script>

<style scoped>
.pagewrapper {
    padding: 100px 0 50px 0;
}
h2 {
    width: fit-content;
    font-size: 1.2em;
    margin: 40px auto 20px auto;
}

</style>