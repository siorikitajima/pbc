<template>
<div class="songInfoPanel">
    <div class="flex">
        <div class="div400 group">
            <p><b>Instruments</b></p>
            <p v-if="onSearch">
                <span class="underlined" v-for="(instrument, i) in instList || []" :key="i" 
                @click="addInst(instrument)">
                    {{ instrument }}
                </span>
            </p>
            <p v-else>
                <span class="underlined" v-for="(instrument, i) in instList || []" :key="i" 
                @click="addInst(instrument)">
                <NuxtLink :to="'/'">
                    <b style="font-weight: normal;">{{ instrument }}</b> 
                </NuxtLink>
                </span>
            </p>
        </div>
        <div class="div400 group">
            <p><b>Genres/Moods</b></p>
            <p v-if="onSearch">
                <span class="underlined" v-for="(genmood, i) in genreMoodList || []" :key="i" 
                @click="addGenMood(genmood)">
                    {{ genmood.key }}
                </span>
            </p>
            <p v-else>
                <span class="underlined" v-for="(genmood, i) in genreMoodList || []" :key="i" 
                @click="addGenMood(genmood)">
                    <NuxtLink :to="'/'">
                    <b style="font-weight: normal;">{{ genmood.key }}</b> 
                    </NuxtLink>
                </span>
            </p>
        </div>
    </div>
      <div class="flex">
        <div class="div400 group">
            <p><b>Artists</b></p>
            <p> <span class="underlined" v-for="(writer, i) in song.Writers || []" :key="i" @click="$store.commit('CLOSE_SING_SONG')">
                <NuxtLink :to="'/artist/' + writer.slug">
                <b style="font-weight: normal;">{{ writer.name }}</b> 
                </NuxtLink>
            </span> </p>
        </div>
        <div class="div400 group">
            <p><b>Album/Collection</b></p>
                <p @click="$store.commit('CLOSE_SING_SONG')">
                    <NuxtLink :to="'/album/'+ song.CatNum + '-' + slug(song.AlbumTitle)">
                    <span class="underlined">{{ song.AlbumTitle }} ({{ song.Year }})</span>
                    </NuxtLink>
                </p>
            
        </div>
    </div>
  </div>

</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'SongInfoPanel',
    props: ['song'],
    computed: {
        ...mapGetters({
            slug: 'SLUG'
        }),
        ...mapState(['filter']),
        instList() {
            return (this.song.Instruments) ? this.song.Instruments.split(', ') : []
        },
        genreMoodList() {
            let Genre = [{ type: 'genre', key: this.song.Genre}]
            let SubGenreA = [{ type: 'genre', key: this.song.SubGenreA}]
            let SGB = (this.song.SubGenreB) ? this.song.SubGenreB.split(', ') : []
            let SubGenreB = []
            if(SGB !== []) { SGB.forEach(B => { SubGenreB.push({ type: 'genre', key: B}) }) }
            let PrimaryMood = [{ type: 'mood', key: this.song.PrimaryMood}]
            let SecM = (this.song.SecondaryMoods) ? this.song.SecondaryMoods.split(', ') : []
            let SecondaryMoods = []
            if(SecM !== []) { SecM.forEach(B => { SecondaryMoods.push({ type: 'mood', key: B}) }) }
            let genreMoodArray = Genre.concat(SubGenreA, SubGenreB, PrimaryMood, SecondaryMoods);
            return genreMoodArray
        },
        onSearch() {
            if (window.location.href == 'https://' + window.location.hostname + '/' || window.location.href == 'http://localhost:3000/') { 
                console.log('On Search', window.location.href)
                return true
            } else {
                console.log('Not on Search', window.location.href)
                return false
            }
        }
    },
    methods: {
        addInst(inst) {
            if (!localStorage.getItem("searchKeys") || !this.onSearch) {
                this.$store.commit('clearFilter')
            }
            this.$store.commit('addFilterInstrument', { type: 'instrument', key: inst })
            localStorage.setItem("searchKeys", JSON.stringify(this.filter))
            this.$store.commit('CLOSE_SING_SONG')
        },
        addGenMood(genmood) {
            if (!localStorage.getItem("searchKeys") || !this.onSearch) {
                this.$store.commit('clearFilter')
            }
            if (genmood.type == 'genre') {
                this.$store.commit('addFilterGenre', genmood)
            } else if (genmood.type == 'mood') {
                this.$store.commit('addFilterMood', genmood)
            }
            localStorage.setItem("searchKeys", JSON.stringify(this.filter))
            this.$store.commit('CLOSE_SING_SONG')
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
b.underlined, span.underlined {
    font-weight: normal;
    border-bottom: #aaa solid 1px;
    margin-right: 10px;
    cursor: pointer;
}
b.underlined:hover, span.underlined:hover {
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