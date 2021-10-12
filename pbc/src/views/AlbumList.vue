<template>
<div>
<h2 class="first">// Albums and Collections //</h2>
  <div class="albumList" v-if="albums">
      <AAlbum v-for="album in albums || []" :key="album" :album="album"  />
  </div>
</div>
</template>

<script>
import getAlbums from '../composables/getAlbums'
import AAlbum from '../components/singles/AAlbum.vue'

export default {
    name: 'AlbumList',
    components: { AAlbum },
    props: { songs: Array },
    setup() {
        const { albums, albumserror, loadAlbums } = getAlbums()
        loadAlbums()
        return { albums, albumserror }
    }
}
</script>

<style scoped>
.albumList {
    width: 800px;
    height: calc(100% - 100px);
    padding: 0;
    margin: 30px auto 100px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
}
h2 {
    width: fit-content;
    font-size: 1.2em;
    margin: 40px auto 20px auto;
}
h2.first {
    margin: 80px auto 20px auto;
}
</style>