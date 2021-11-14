<template>
<div class="songInfoPanel">
    <div class="flex">
        <div class="div400 group">
            <p><b>Instruments</b></p>
            <p>{{ song.Instruments }}</p>
        </div>
        <div class="div400 group">
            <p><b>Genres/Mood</b></p>
            <p>{{ song.Genre }}, {{ song.SubGenreA }}</p>
        </div>
    </div>
      <div class="flex">
        <div class="div400 group">
            <p><b>Artists</b></p>
            <p> <span v-for="(writer, i) in song.Writers || []" :key="i" @click="$store.commit('CLOSE_SING_SONG')">
                <NuxtLink :to="'/artist/' + writer.slug">
                <b class="underlined">{{ writer.name }}</b>, 
                </NuxtLink>
                </span> </p>
        </div>
        <div class="div400 group">
            <p><b>Album</b></p>
            <NuxtLink :to="'/album/'+ song.CatNum + '-' + slug(song.AlbumTitle)">
                <p @click="$store.commit('CLOSE_SING_SONG')"><b class="underlined">{{ song.AlbumTitle }}</b> ({{ song.Year }})</p>
            </NuxtLink>
        </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'SongInfoPanel',
    props: ['song'],
    computed: {
    ...mapGetters({
        slug: 'SLUG'
    })
    }
}
</script>

<style>
.flex {
    display: flex;
    justify-content:center
}
.div400 {
    display: block;
    width: 380px;
    margin: 0 10px 10px 10px;
}
.div400.group {
    width: 354px;
    padding-left: 20px;
    position: relative;
}
.div400.group::before {
    content: '';
    width: 10px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #666;
    border-radius: 5px;
}
.div800 {
    width: 780px;
    margin: 0 10px 20px 10px; 
    text-align: center;
}
.headerbg {
    width: 100%;
    padding: 3px;
    margin-top: 5px;
    background: #eee;
    border-radius: 5px;
}
b.underlined {
    font-weight: normal;
    border-bottom: #aaa solid 1px;
}
b.underlined:hover {
    color: #0092c5;
    border-bottom: #0092c5 solid 1px;
    transition-duration: 200ms;
}
@media(max-width: 800px) {
    .flex {
    display: block;
    }
    .songInfoPanel {
        display: block;
        width: 500px;
        margin: 10px auto;
        text-align: left;
        max-width: calc(100% - 20px);
    }
    .div400.group {
        max-width: calc(100% - 40px);
    }
}
</style>