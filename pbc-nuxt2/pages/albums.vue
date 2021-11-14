<template>
<div>
<h2 class="first sectTitle">// Albums and Collections //</h2>
  <div class="albumList" v-if="albums">
      <SingleAAlbum v-for="album in albums || []" :key="album.AlbumID" :album="album"  />
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'AlbumList',
    head() {
        return {
        title: 'Albums and Collections || PatternBased',
        meta: [
        {
            hid: 'og:title',
            name: 'og:title',
            content: 'Albums and Collections || PatternBased'
        },
        {
            hid: 'og:url',
            name: 'og:url',
            content: 'https://dev-catalog.patternbased.com/albums'
        }
        ]
        }
    },
    computed: {
        ...mapState( ['albums'] )
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
@media(max-width:800px) {
    .albumList {
        width: fit-content;
        max-width: 100%;
        margin: 0 auto;
        justify-content: center;
    }
}

@media(max-width:600px) {
    .albumList {
        margin: 30px auto 140px auto;
    }
}
</style>