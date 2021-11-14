<template>
<div>
  <div v-if="singleSongPanel" class="singlePanelScreen" @click="closeSingleP"></div> 
    <div v-if="singleSongPanel" class="singlePageCoutainer">
        <SingleSong v-if="singSonData" :song="singSonData" :panel="true" />
        <SingleSongInfoPanel v-if="singSonData" :song="singSonData" />

        <div class="prevIcon panelNav" @click="prevSingle(singSonData.ID)">
            <img :src="require('~/assets/images/global/Prev_Icon_dark.svg')" alt="Close">
        </div>
        <div class="closeIcon panelNav" @click="closeSingleP">
            <img :src="require('~/assets/images/global/Close_Icon_dark.svg')" alt="Close">
        </div>
        <div class="nextIcon panelNav" @click="nextSingle(singSonData.ID)">
            <img :src="require('~/assets/images/global/Next_Icon_dark.svg')" alt="Close">
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'SingleSongPanel',
    computed: {
        ...mapState(['singSonData', 'singlePanels', 'singleSongPanel'])
    },
    methods: {
        closeSingleP() {
            this.$store.commit('CLOSE_SING_SONG')
        },
        addToQueue(songId) {
            this.$store.commit('ADD_QUEUE', songId)
        },
        playThisNow(songId) {
            this.$store.commit('PLAY_THIS', songId)
        },
        prevSingle(id) {
            this.$store.dispatch('PrevSingSonP', id)
        },
        nextSingle(id) {
            this.$store.dispatch('NextSingSonP', id)
        }
    }
}
</script>

<style scoped>
.singlePanelScreen {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: fixed;
    top: 0; left: 0;
    background: #00000033;
}
.singlePageCoutainer {
    width: fit-content;
    height: fit-content;
    max-width: calc(100% - 120px);
    background: #fff;
    position: fixed;
    top: 20px;
    right: 20px;
    border-radius: 10px;
    padding: 40px;
    z-index: 2000;
}
.panelNav {
    width: 30px;
    height: 30px;
    position: fixed;
    top: 40px;
    cursor: pointer;
    }
.panelNav.prevIcon {
    right: 160px;
}
.panelNav.closeIcon {
    right: 100px;
}
.panelNav.nextIcon {
    right: 40px;
}

@media(max-width: 800px) {
    .singlePageCoutainer {
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        max-width: unset;
        padding: 10px;
        top: 0;
        right: 0;
        border-radius: 0;
        overflow-y: auto;
        text-align: center;
    }
    .panelNav {
        top: 10px;
        position: absolute;
    }
    .panelNav.prevIcon {
        right: calc(50% + 45px);
    }
    .panelNav.closeIcon {
        right: calc(50% - 15px);
    }
    .panelNav.nextIcon {
        right: calc(50% - 75px);
    }
}
</style>