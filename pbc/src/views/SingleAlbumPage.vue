<template>
  <div class="pagewrapper" v-if="album">
      <SingleAlbum :album="album" @queueAction="updateQueue($event)" />
      <AlbumInfoPage :album="album" />

        <div v-if="albumSongList.length">
            <SongList :fltdsongs="albumSongList" :song="song" :dist="'song'" @passThis="passSingle($event)" @openPanel="passPanel($event)" @closeSingle="closeSinglePanel" @queueAction="updateQueue($event)" />
        </div>
        <div v-else><Loading /></div>
  </div>
</template>

<script>

import getAlbum from '../composables/getAlbum'
import SongList from '../components/songtable/SongList.vue'
import Loading from '../components/songtable/Loading.vue'
import SingleAlbum from '../components/singles/SingleAlbum.vue'
import AlbumInfoPage from '../components/singles/AlbumInfoPage.vue'

import { ref } from '@vue/reactivity'

export default {
    name: 'SingleAlbumPage',
    components: { SongList, Loading, SingleAlbum, AlbumInfoPage },
    emits: ['panelReq', 'singlePanel', 'closeSingle', 'queueAction'],
    props: { id: String, title: String, songs: Array,  song: Object },
    setup(props) {
        const theID = ref(props.id)

        const { album, albumerror, loadAlbum } = getAlbum(theID.value)
        loadAlbum()

        // const artistslug = computed(() => {
        //     return album.Project.toLowerCase().replace(/\s+/g, '-')
        // })

            return { theID, album, albumerror}
    },
    methods: {
        passPanel(data) {
            this.$emit('panelReq', data)
        },
        passSingle(data) {
            this.$emit('singlePanel', data)
        },
        closeSinglePanel() {
            this.$emit('closeSingle')
        },
        updateQueue(data) {
            this.$emit('queueAction', data)
        }
    },
    computed: {
    albumSongList: function() {
        let albumID = this.theID
        return this.songs.filter((song) => {
            return song.CatNum == albumID
        }).sort((a,b) => {return a.Seq - b.Seq;})
    },
    // artistslug: function() {
    //     return this.album.Project.toLowerCase().replace(/\s+/g, '-')
    // }
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