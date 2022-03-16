<template>
<div>
    <div class="tutorialPanelWrapper">

        <div class="closeIcon panelNav" @click="closeTutorialP">
            <img :src="require('~/assets/images/global/Close_Icon.svg')" alt="Close">
        </div>

        <div class="tutorialWrapper" v-if="tutorialSlides">
            <div class="tutorial" ref="tutorial">
                <div class="flex">
                    <img class="icon" :src="require(`~/assets/images/${tutorialSlides[slideIndex].icon}.svg`)" alt="Tutorial">
                    <h3>{{tutorialSlides[slideIndex].details}}</h3>
                </div>
                <img :src="require(`~/assets/images/${tutorialSlides[slideIndex].img}`)" alt="Tutorial">
            </div>
        </div>
            <div class="tut-dots">
                <div class="tut-dot" ref="tutdot" v-for="(dot, index) in tutorialSlides.length" 
                :key="dot.id" 
                @click="showThisSlider(index)">
                </div>
            </div>
    </div>
</div>
</template>

<script>
import { tutorialSlides } from '~/assets/about-accd.js'

export default {
    name: 'PanelTutorial',
    data() {
        return {
            slideIndex: 0,
            tutorialSlides: tutorialSlides,
            counter: ''
        }
    },
    methods: {
        closeTutorialP() {
            this.$store.commit('CLOSE_TUTORIAL')
            this.slideIndex = 0
            localStorage.setItem("tutorial", JSON.stringify({initial: 'Done'}))
        },
        showThisSlider(num) {
            this.$refs.tutorial.style.opacity = 0
            this.$refs.tutdot[this.slideIndex].style.background = '#666'
            this.$refs.tutdot[num].style.background = '#ddd'
            setTimeout(() => {
                this.slideIndex = num
                this.$refs.tutorial.style.opacity = 1
            }, 200)
        }
    },
    mounted() {
        this.counter = setInterval(() => {
            this.$refs.tutorial.style.opacity = 0
            this.$refs.tutdot[this.slideIndex].style.background = '#666'
            setTimeout(() => {
                this.slideIndex++
                if (this.slideIndex > (tutorialSlides.length - 1)) {
                    this.$store.commit('CLOSE_TUTORIAL')
                    this.slideIndex = 0
                    localStorage.setItem("tutorial", JSON.stringify({initial: 'Done'}))
                }
                this.$refs.tutorial.style.opacity = 1
                this.$refs.tutdot[this.slideIndex].style.background = '#ddd'
            }, 200)
        }, 5950)
    },
    beforeDestroy() {
        clearInterval(this.counter)
    }
}
</script>

<style scoped>
.tutorialPanelWrapper {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: fixed;
    top: 0; left: 0;
    background: #333;
    z-index: 2000;
    overflow-y: hidden;
}
.tutorialWrapper {
    width: 400px;
    height: 320px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    max-width: calc(100% - 10px);
    display: flex;
    /* overflow: hidden; */
}
.tutorial {
    width: 400px;
    height: 300px;
    transition-duration: 200ms;
}
.tutorial .icon {
    width: 40px;
    margin: -15px 10px 0 0;
    opacity: 0.6;
}
.tutorial h3 {
    margin: 0 0 20px 0;
    color: #ffffff;
    opacity: 0.7;
    text-align: left;
    font-weight: normal;
    font-size: 1em;
}
.tut-dots {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.tut-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #666;
    margin: 10px 7px 0 7px;
    cursor: pointer;
}
.tut-dot:first-of-type {
    background: #ddd;
}
.panelNav {
    width: 30px;
    height: 30px;
    position: fixed;
    top: 20px;
    cursor: pointer;
    }
.panelNav.closeIcon {
    right: 20px;
    opacity: 0.6;
}
@media(hover: hover) {
.panelNav.closeIcon:hover {
    opacity: 1;
    transition-duration: 200ms;
}
}

@media(max-width: 800px) {
    .panelNav {
        top: 10px;
        position: absolute;
    }
    .panelNav.closeIcon {
        right: 10px;
    }
}
</style>