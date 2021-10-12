<template>
<div>
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
            <p> <span v-for="writer in song.Writers || []" :key="writer">
                <router-link :to="'/artist/' + writer.slug" @click.native="closeSinglePanel()">
                {{ writer.name }}, 
                </router-link>
                </span> </p>
        </div>
        <div class="div400 group">
            <p><b>Album</b></p>
            <router-link :to="'/album/' + song.CatNum + '-' + albumslug" @click.native="closeSinglePanel()">
                <p>{{ song.AlbumTitle }} ({{ song.Year }})</p>
            </router-link>
        </div>
    </div>
  </div>

</template>

<script>
import { computed } from '@vue/reactivity'

export default {
    name: 'SongInfoPanel',
    props: ['song'],
    emits: ['closeSingle'],
    setup(props) {
        const albumslug = computed(() => {
            return props.song.AlbumTitle.toLowerCase().replace(/\s+/g, '-')
        })
        return { albumslug }
    },
    methods: {
        closeSinglePanel() {
            this.$emit('closeSingle')
        }
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
    margin: 0 10px 20px 10px;
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
</style>