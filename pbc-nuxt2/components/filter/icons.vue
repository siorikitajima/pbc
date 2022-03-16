<template>
<div>
    <div id="navLeft" class="cornerNavs">
        <div class="oneIcon">
            <a @click="toggleSliderPanel">
                <img v-if="sliderPanel" class="navIcons active filters" :src="require('~/assets/images/header/Filter_Icon_white.svg')"
                alt="Filter" @mouseleave="showInfo['act1'] = false">
                <img v-else class="navIcons filters" :src="require('~/assets/images/header/Filter_Icon.svg')" 
                alt="Filter" @mouseover="showInfo['act1'] = true" @mouseleave="showInfo['act1'] = false">
            </a>
            <transition name="bounce">
                <div class="ttinfo" v-if="showInfo['act1']"><p>Filters</p></div>
            </transition>
        </div>
        <div class="oneIcon">
            <a @click="togglePresetPanel">
                <img v-if="presetPanel" class="navIcons active filters" :src="require('~/assets/images/header/Preset_Icon_white.svg')" 
                alt="Presets" @mouseleave="showInfo['act2'] = false">
                <img v-else class="navIcons filters" :src="require('~/assets/images/header/Preset_Icon.svg')" 
                alt="Presets" @mouseover="showInfo['act2'] = true" @mouseleave="showInfo['act2'] = false">
            </a>
            <transition name="bounce">
                <div class="ttinfo" v-if="showInfo['act2']"><p>Presets</p></div>
            </transition>
        </div>
        <div class="oneIcon">
            <a @click="toggleSearchPanel">
                <img v-if="searchPanel" class="navIcons active filters" :src="require('~/assets/images/header/Search_Icon_white.svg')"
                 alt="Search" @mouseleave="showInfo['act3'] = false">
                <img v-else class="navIcons filters" :src="require('~/assets/images/header/Search_Icon.svg')" 
                alt="Search" @mouseover="showInfo['act3'] = true" @mouseleave="showInfo['act3'] = false">
            </a>
            <transition name="bounce">
                <div class="ttinfo" v-if="showInfo['act3']"><p>Search</p></div>
            </transition>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'filterIcons',
    props: ['sliderPanel', 'presetPanel', 'searchPanel'],
    emits: ['leftPanel'],
    data() {
        return {
        showInfo:
            {
            'act1': false,
            'act2': false,
            'act3': false
            }
        }
    },
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
#navLeft.cornerNavs {
    display: flex;
    justify-content: left;
}
#navLeft.cornerNavs .oneIcon {
    position: relative;
}
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
.ttinfo{
    background: #ddddddcc;
    color: #666 !important;
    border: #666 1px solid;
    bottom: unset;
    top: 50px;
    left: 0;
  }
  .ttinfo p {
      color: #666;
  }
</style>