<template>
      <div class="relatedArtists" v-if="artist">
        <SingleAArtist v-for="relartist in artist.RelatedEntities || []" :key="relartist.ArtistSlug" :artist="relartist" :location="'related'" />
    </div>
</template>

<script>
export default {
    name: 'RelatedArtists',
    props: [ 'artist' ]
}
</script>

<style scoped>
.relatedArtists {
    width: 100%;
    padding: 0 0 20px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>