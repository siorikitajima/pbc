<template>
<div class="wrapper">
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
            content: 'https://catalog.patternbased.com/albums'
        }
        ]
        }
    },
    computed: {
        ...mapState( ['albums'] )
    },
    mounted() {
        this.$store.commit('HIDE_LOADING')
    }
}
</script>

<style scoped>
.wrapper {
    width: 100%;
    height: fit-content;
    padding-bottom: 20px;
}
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
        height: calc(100% - 220px);
        padding: 0 0 120px 0;
    }
}
</style>