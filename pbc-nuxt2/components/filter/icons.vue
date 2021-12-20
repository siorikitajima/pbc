<template>
<div>
    <div id="navLeft" class="cornerNavs">
        <a @click="toggleSliderPanel">
            <img v-if="sliderPanel" class="navIcons active filters" :src="require('~/assets/images/header/Filter_Icon_white.svg')" alt="Filter">
            <img v-else class="navIcons filters" :src="require('~/assets/images/header/Filter_Icon.svg')" alt="Filter">
        </a>
        <a @click="togglePresetPanel">
            <img v-if="presetPanel" class="navIcons active filters" :src="require('~/assets/images/header/Preset_Icon_white.svg')" alt="Filter">
            <img v-else class="navIcons filters" :src="require('~/assets/images/header/Preset_Icon.svg')" alt="Filter">
        </a>
        <a @click="toggleSearchPanel">
            <img v-if="searchPanel" class="navIcons active filters" :src="require('~/assets/images/header/Search_Icon_white.svg')" alt="Filter">
            <img v-else class="navIcons filters" :src="require('~/assets/images/header/Search_Icon.svg')" alt="Filter">
        </a>
    </div>
</div>
</template>

<script>
export default {
    name: 'filterIcons',
    props: ['sliderPanel', 'presetPanel', 'searchPanel'],
    emits: ['leftPanel'],
    methods: {
        toggleSliderPanel() {
            if(!this.sliderPanel && window.innerWidth <= 600) {
                this.$store.commit('HIDE_PLAYER')
            } else {
                this.$store.commit('SHOW_PLAYER')
            }
            this.$emit('leftPanel', { type: 'filter'})
        },
        togglePresetPanel() {
            if(!this.presetPanel && window.innerWidth <= 600) {
                this.$store.commit('HIDE_PLAYER')
            } else {
                this.$store.commit('SHOW_PLAYER')
            }
            this.$emit('leftPanel', { type: 'preset'})
        },
        toggleSearchPanel() {
            if(!this.searchPanel && window.innerWidth <= 600) {
                this.$store.commit('HIDE_PLAYER')
            } else {
                this.$store.commit('SHOW_PLAYER')
            }
            this.$emit('leftPanel', { type: 'search'})
        }
    }
}
</script>

<style scoped>
.navIcons.filters {
  width: 20px;
  height: 20px;
  margin: 0 8px;
  padding: 10px;
  border: #666 1px solid;
  border-radius: 50%;
  background: #fff;
  z-index: 9000;
}

.navIcons.active {
    background: #666;
    border-radius: 50%;
}
@media (hover: hover) {
    .navIcons:hover {
        background: #ddd;
        transition-duration: 200ms;
    }
    .navIcons.active:hover {
        background: #444;
        transition-duration: 200ms;
    }
}
</style>