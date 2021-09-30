<template>
  <div class="wrapper">
        <SingleSong :song="song" :album="tempAlbumData" @passPanel="passPanel($event)" />
  </div>
</template>

<script>
import SingleSong from '../components/singles/SingleSong.vue'
import getSong from '../composables/getSong'
import getAlbum from '../composables/getAlbum'
import { ref } from '@vue/reactivity'

export default {
    name: 'SingleSongPage',
    components: { SingleSong },
    emits: ['panelReq'],
    props: [ 'id', 'title' ],
    setup(props) {
        const { song, songerror, songload } = getSong(props.id)
        songload()

        const albumId = ref(song.CatNum)
        const { album, albumerror, loadAlbum } = getAlbum(albumId.value)
        loadAlbum()

        ///// Paused here. It is not reading Album data
        console.log(albumId.value, album, song, song.CatNum)
        const tempAlbumData = ref(album.Year)

        return { song, songerror, album, albumerror, tempAlbumData }
    },
    methods: {
        passPanel(data) {
            this.$emit('panelReq', data)
        },
    }
}
</script>

<style scoped>
.wrapper {
    padding: 50px 0;
}

</style>