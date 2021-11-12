<template>
    <div class="shelf" v-if="projectsAlbums.length > 3" v-bind:class="{ showAll: expandAlbums }">
        <div class="toggle">
            <img class="toggleIcon" v-if="expandAlbums" :src="require('~/assets/images/global/Fold_Icon.svg')" alt="See More Albums" @click="toggleExpand">
            <img class="toggleIcon" v-else :src="require('~/assets/images/global/Expand_Icon.svg')" alt="See More Albums" @click="toggleExpand">
        </div>
        <div class="projectsAlbums">
            <SingleAAlbum v-for="album in projectsAlbums || []" :key="album.AlbumID" :album="album" />
        </div>
        <div class="screen"></div>
    </div>
    <div class="projectsAlbums" v-else>
        <SingleAAlbum v-for="album in projectsAlbums || []" :key="album.AlbumID" :album="album" />
    </div>
</template>

<script>
export default {
    name: 'projectAlbums',
    props: [ 'projectsAlbums' ],
    data() {
        return {
            expandAlbums: false
        }
    },
    methods: {
        toggleExpand() {
            this.expandAlbums = !this.expandAlbums
        }
    }
}
</script>

<style scoped>
.projectsAlbums {
    width: 800px;
    margin: 0 auto;
    padding: 0 0 20px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.shelf {
    width: 100%;
    height: 280px;
    overflow: hidden;
    margin-bottom: 0;
    position: relative;
}
.shelf.showAll {
    height: fit-content;
    transition-duration: 200ms;
}
.toggle {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 10px;
    right: calc( 50% - 400px - 50px );
}
.toggle img.toggleIcon {
    width: 30px;
    height: 30px;
}
.screen {
    width: 100%;
    height: 60px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(0deg, rgba(221,221,221,1) 0%, rgba(221,221,221,1) 10%, rgba(221,221,221,0) 100%);
}

</style>