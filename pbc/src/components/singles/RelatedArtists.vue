<template>
      <div class="relatedArtists" v-if="artist">
        <AArtist v-for="relartist in artist.RelatedEntities || []" :key="relartist" :artist="relartist" :location="'related'" />
    </div>
</template>

<script>
import AArtist from './AArtist.vue'

export default {
    name: 'RelatedArtists',
    props: [ 'artist' ],
    components: { AArtist }
}
</script>

<style scoped>
.relatedArtists {
    width: 100%;
    padding: 0 0 50px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>