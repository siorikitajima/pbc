<template>
<div>
  <div class="thePlayer" v-if="sqPData">
    <div class="controller">
        <img :src="require('~/assets/images/player/Previous_btn.svg')" alt="Previous" @click="prevTrack">
        <img v-if="isTimerPlaying" :src="require('~/assets/images/player/Pause_btn.svg')" alt="Play" @click="play">
        <img v-else :src="require('~/assets/images/player/Play_btn.svg')" alt="Pause" @click="play">
        <img :src="require('~/assets/images/player/Next_btn.svg')" alt="Next" @click="nextTrack">
    </div>
    <div class="cover">
        <img :src="coverImg(sqPData.CatNum, sqPData.ID)" :alt="sqPData.AlbumTitle">
    </div>
    <div class="info">
        <p>{{ sqPData.ID }} // <NuxtLink :to="'/song/' + sqPData.ID + '-' + slug(sqPData.Title)">{{ sqPData.Title }}</NuxtLink> <span> by <NuxtLink :to="'/project/' + slug(sqPData.ArtistName)">{{ sqPData.ArtistName }}</NuxtLink></span><span v-if="sqPData.FeatArtist" v-html="featArtURL(sqPData.FeatArtist)"></span></p>
        <div class="progress_bar_flex">
            <div class="duration progress__bar" ref="progressBar" @click="clickProgress">
                <div class="progress__current" :style="{ width : barWidth }"></div>
            </div>
            <div class="progress__time">{{ currentTime }} / {{ duration }}</div>
        </div>
    </div>
    <client-only>
    <div class="icons" v-if="sqPData">
        <div class="oneIcon">
            <img :src="require('~/assets/images/actions/SimilarSong_Icon_white.svg')" 
            alt="Similar Songs" @click="$store.dispatch('OpenSimSong', sqPData.ID)"
            @mouseover="showInfo['act1'] = true" @mouseleave="showInfo['act1'] = false">
            <transition name="bounce">
                <div class="ttinfo" v-if="showInfo['act1']"><p>Similar Songs</p></div>
            </transition>
        </div>
        <div class="oneIcon">
            <NuxtLink :to="'/song/' + sqPData.ID + '-' + slug(sqPData.Title)">
            <img :src="require('~/assets/images/actions/seeSong_Icon_white.svg')" alt="Track"
            @mouseover="showInfo['act2'] = true" @mouseleave="showInfo['act2'] = false">
            </NuxtLink>
            <transition name="bounce">
                    <div class="ttinfo" v-if="showInfo['act2']"><p>See Song Page</p></div>
                </transition>
        </div>
        <div class="oneIcon">
            <NuxtLink :to="'/project/' + slug(sqPData.ArtistName)">
            <img :src="require('~/assets/images/actions/seeArtist_Icon_white.svg')" alt="Artist"
            @mouseover="showInfo['act3'] = true" @mouseleave="showInfo['act3'] = false">
            </NuxtLink>
            <transition name="bounce">
                <div class="ttinfo" v-if="showInfo['act3']"><p>See Artist Page</p></div>
            </transition>
        </div>
        <div class="oneIcon">
            <img :src="require('~/assets/images/actions/Share_Icon_white.svg')" 
            alt="Share" @click="shareURL()"
            @mouseover="showInfo['act4'] = true" @mouseleave="showInfo['act4'] = false">
            <transition name="bounce">
                <div class="ttinfo" v-if="showInfo['act4']"><p>Share</p></div>
            </transition>
        </div>
        <div class="oneIcon">
            <NuxtLink :to="{ path: '/requests', query: { song: sqPData.ID }}">
            <img :src="require('~/assets/images/actions/inquiry_white.svg')" alt="Inquiry"
            @mouseover="showInfo['act5'] = true" @mouseleave="showInfo['act5'] = false">
            </NuxtLink>
            <transition name="bounce">
                <div class="ttinfo" v-if="showInfo['act5']"><p>Inquiry</p></div>
            </transition>
        </div>
        <div class="oneIcon">
            <img :src="require('~/assets/images/actions/License_icon_white.svg')" 
            alt="License" @click="licenseThis(sqPData.ID)"
            @mouseover="showInfo['act6'] = true" @mouseleave="showInfo['act6'] = false">
            <transition name="bounce">
                <div class="ttinfo" v-if="showInfo['act6']"><p>License</p></div>
            </transition>
        </div>
        <img class="actionBtn" :src="require('~/assets/images/actions/Actions_Icon_white.svg')" alt="Actions" @click="toggleAction()">
        <div class="oneIcon">
            <img :src="require('~/assets/images/actions/PlayList_Icon.svg')" class="queueBtn" 
            alt="Playlist" @click="$store.commit('TOGGLE_QUEUE')"
            @mouseover="showInfo['act7'] = true" @mouseleave="showInfo['act7'] = false">
            <transition name="bounce">
                <div class="ttinfo" v-if="showInfo['act7']"><p>Queue</p></div>
            </transition>
        </div>
    </div>
    </client-only>
</div>

<div class="thePlayer mobilePlayer" v-if="sqPData">
    <div class="mobileController">
        <div class="controller">
            <img :src="require('~/assets/images/player/Previous_btn.svg')" alt="Previous" @click="prevTrack">
            <img v-if="isTimerPlaying" :src="require('~/assets/images/player/Pause_btn.svg')" alt="Play" @click="play">
            <img v-else :src="require('~/assets/images/player/Play_btn.svg')" alt="Pause" @click="play">
            <img :src="require('~/assets/images/player/Next_btn.svg')" alt="Next" @click="nextTrack">
        </div>
        <div class="icons" v-if="sqPData">
            <img class="actionBtn" :src="require('~/assets/images/actions/Actions_Icon_white.svg')" alt="Actions" @click="toggleAction()">
            <img :src="require('~/assets/images/actions/PlayList_Icon.svg')" class="queueBtn" alt="Playlist" @click="$store.commit('TOGGLE_QUEUE')">
        </div>
    </div>

    <div class="info">
        <div class="cover">
            <img :src="coverImg(sqPData.CatNum, sqPData.ID)" :alt="sqPData.AlbumTitle">
        </div>
        <div class="mobilecontent">
            <div class="mobilesonginfo">
                <p>{{ sqPData.Title }} <span> by {{ sqPData.ArtistName }}</span></p>
                <div class="progress__time">{{ currentTime }} / {{ duration }}</div>
            </div>
            <div class="progress_bar_flex">
                <div class="duration progress__bar" ref="progressBarMobile" @click="clickProgressMobile">
                    <div class="progress__current" :style="{ width : barWidth }"></div>
                </div>
            </div>
        </div>
    </div>
</div>
        <div class="panelScreen" v-show="mobileAction" @click="closeAction()"></div>
        <ul class="mobileActions" v-show="mobileAction" @click="closeAction()">
            <li class="actionHead">
                <img :src="coverImg(sqPData.CatNum, sqPData.ID)" :alt="sqPData.AlbumTitle">
                <p>{{sqPData.Title}}</p>
            </li>
            <li @click="$store.dispatch('OpenSimSong', sqPData.ID)">
                <img :src="require('~/assets/images/actions/SimilarSong_Icon_dark.svg')" alt="Similar Songs">
                <p>Similar Songs</p>
            </li>
            <NuxtLink :to="'/song/' + sqPData.ID + '-' + slug(sqPData.Title)">
            <li>
                <img :src="require('~/assets/images/actions/seeSong_Icon_dark.svg')" alt="Track Page">
                <p>See Song Page</p>
            </li>
            </NuxtLink>
            <NuxtLink :to="'/project/' + slug(sqPData.ArtistName)">
            <li @click="$store.commit('PLAY_THIS', sqPData.ID)">
                <img :src="require('~/assets/images/actions/seeArtist_Icon_dark.svg')" alt="Artist Page">
                <p>See Artist Page</p>
            </li>
            </NuxtLink>
            <li  @click="shareURL()">
                <img :src="require('~/assets/images/actions/Share_Icon_dark.svg')" alt="Share">
                <p>Share</p>
            </li>
            <NuxtLink :to="{ path: '/requests', query: { song: sqPData.ID }}">
            <li>
                <img :src="require('~/assets/images/actions/inquiry_dark.svg')" alt="Inquiry">
                <p>Custom Work</p>
            </li>
            </NuxtLink>
            <li @click="licenseThis(sqPData.ID)">
                <img :src="require('~/assets/images/actions/License_icon_dark.svg')" alt="License">
                <p>License</p>
            </li>
        </ul>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'PlayerBar',
    emits: [ 'showPanel', 'playerHandler' ],
    data() {
        return {
            audio: null,
            circleLeft: null,
            barWidth: null,
            duration: null,
            currentTime: null,
            mobileAction: false,
            showInfo:
            {
            'act1': false,
            'act2': false,
            'act3': false,
            'act4': false,
            'act5': false,
            'act6': false,
            'act7': false
            }
        }
    },
    computed: {
        ...mapState(['songs', 'sqQueue', 'sqPlaying', 'sqEnded', 'alsoPlay', 'isTimerPlaying', 'playerBar' ]),
        ...mapGetters({
            sqPData: 'PLAYING_DATA',
            sqQData: 'QUEUE_DATA',
            sqEData: 'ENDED_DATA',
            slug: 'SLUG',
            coverImg: 'COVER_IMG',
            songSrc: 'AUDIO_SRC',
            featArtURL: 'FEATART_LINK'
        })
    },
    methods: {
        play() {
            if (this.audio.paused) {
                this.resetPlayer()
                this.$store.commit('IS_PLAYING_ON')
            } else {
                this.audio.pause();
                this.$store.commit('IS_PLAYING_OFF')
            }
        },
        generateTime() {
            let width = (100 / this.audio.duration) * this.audio.currentTime;
            this.barWidth = width + "%";
            this.circleLeft = width + "%";
            let durmin = Math.floor(this.audio.duration / 60);
            let dursec = Math.floor(this.audio.duration - durmin * 60);
            let curmin = Math.floor(this.audio.currentTime / 60);
            let cursec = Math.floor(this.audio.currentTime - curmin * 60);
            if (durmin < 10) {
                durmin = "0" + durmin;
            }
            if (dursec < 10) {
                dursec = "0" + dursec;
            }
            if (curmin < 10) {
                curmin = "0" + curmin;
            }
            if (cursec < 10) {
                cursec = "0" + cursec;
            }
            this.duration = durmin + ":" + dursec;
            this.currentTime = curmin + ":" + cursec;
        },
        updateBar(x) {
            let progress = this.$refs.progressBar;
            let maxduration = this.audio.duration;
            let position = x - progress.offsetLeft;
            let percentage = (100 * position) / progress.offsetWidth;
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }
            this.barWidth = percentage + "%";
            this.circleLeft = percentage + "%";
            this.audio.currentTime = (maxduration * percentage) / 100;
            this.audio.play();
        },
        clickProgress(e) {
            this.audio.pause();
            this.updateBar(e.pageX);
        },
        updateBarMobile(x) {
            let progressM = this.$refs.progressBarMobile;
            let maxdurationM = this.audio.duration;
            let positionM = x - progressM.offsetLeft;
            let percentageM = (100 * positionM) / progressM.offsetWidth;
            if (percentageM > 100) {
                percentageM = 100;
            }
            if (percentageM < 0) {
                percentageM = 0;
            }
            this.barWidth = percentageM + "%";
            this.circleLeft = percentageM + "%";
            this.audio.currentTime = (maxdurationM * percentageM) / 100;
            this.audio.play();
        },
        clickProgressMobile(e) {
            if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            this.audio.pause();
            this.updateBar(touch.pageX);
            }
        },
        prevTrack() {
            this.$store.commit('PLAY_PREV')
        },
        nextTrack() {
            this.$store.dispatch('PlayNext')
        },
        resetPlayer() {
            this.barWidth = 0;
            this.circleLeft = 0;
            this.audio.currentTime = 0;
            this.audio.src = this.songSrc;
            setTimeout(() => {
                if(!this.isTimerPlaying) {
                this.audio.play();
                this.$store.commit('IS_PLAYING_ON')
                } else {
                this.audio.pause();
                this.audio.play();
                }
            }, 300);
        },
        setQueue(data) {
            this.$store.commit('SET_QUEUE', data)
        },
        setPlaying(data) {
            this.$store.commit('SET_PLAYING', data)
        },
        setEnded(data) {
            this.$store.commit('SET_ENDED', data)
        },
        setLocalStorage() {
            localStorage.setItem("sqQueue", JSON.stringify(this.sqQueue))
            localStorage.setItem("sqPlaying", JSON.stringify(this.sqPlaying))
            localStorage.setItem("sqEnded", JSON.stringify(this.sqEnded))
        },
        shareURL() {
            let url = 'https://' + window.location.hostname + '/song/' + this.sqPData.ID + '-' + this.slug(this.sqPData.Title)
                this.$store.dispatch('CopyURL', url)
            },
        openAction() {
            this.mobileAction = true
            },
        closeAction() {
            this.mobileAction = false
            },
        toggleAction() {
            this.mobileAction = !this.mobileAction
        },
        licenseThis(id) {
        this.$store.dispatch('OpenLicenseP', id)
        }
    },
    mounted() {
        this.audio = new Audio();
        this.audio.src = this.songSrc
        this.audio.ontimeupdate = ()=> {
            this.generateTime()
        };
        this.audio.onloadedmetadata = ()=> {
            this.generateTime()
        };
        this.audio.onended = ()=> {
            this.nextTrack()
        };

        if(this.sqQueue.length == 0 && !localStorage.getItem("sqQueue") && !localStorage.getItem("sqPlaying")) { 
            this.setQueue([])
            this.setPlaying(['PBS2002'])
            this.setEnded([])
        } else {
          if(this.sqQueue.length == 0) {
              let qData = JSON.parse(localStorage.getItem("sqQueue"))
              let pData = JSON.parse(localStorage.getItem("sqPlaying"))
              let eData = JSON.parse(localStorage.getItem("sqEnded"))
              this.setQueue(qData)
              this.setPlaying(pData)
              this.setEnded(eData)
          }
        }
        this.setLocalStorage()
    },
   watch: { 
      	sqPData(newV, oldV) { 
            this.setLocalStorage()
        },
        sqQData(newV, oldV) { 
            this.setLocalStorage()
        },
        alsoPlay(newV, oldV) {
            this.resetPlayer()
        }
      }
}

</script>

<style scoped>
.thePlayer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: calc(100% - 40px);
    height: 40px;
    padding: 10px 20px;
    background: #333;
    display: flex;
    justify-content:space-between;
    color: #ffffff88;
    font-size: 0.9em;
    z-index: 5000;
    flex-shrink: 0;
}
.thePlayer .controller {
    width: 160px;
    border-right: #666 1px solid;
    flex-shrink: 0;
}
.thePlayer .controller img, .thePlayer .icons img {
    height: 32px;
    margin: 4px 10px;
    cursor: pointer;
    opacity: 0.5;
}
.thePlayer .controller img:hover, .thePlayer .icons img:hover {
    opacity: 1;
    transition-duration: 200ms;
}
.thePlayer .cover {
    width: 40px;
    height: 40px;
    margin-left: 10px;
    flex-shrink: 0;
}
.thePlayer .cover img {
    width: 40px;
    aspect-ratio: 1/1;
    height: 40px;
    width: 100%;
}
.thePlayer .info {
    margin: 0 10px;
    width: inherit;
    flex-shrink: 2;
}
.thePlayer .info p {
    height: 20px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.thePlayer .info p span {
    font-size: 0.9em;
}
.thePlayer .info .progress_bar_flex {
    display: flex;
    justify-content: left;
    overflow-x: visible;
}
.duration {
    height: 14px;
    margin-top: 6px;
    margin-right: 10px;
    width: calc(100% - 100px);
    background: #666;
}
.progress__current {
    background: #999;
    height: inherit;
    width: 0%;
}
.progress__time {
    margin-top: 4px;
}
.thePlayer .icons{
    width: fit-content;
    flex-shrink: 0;
    display: flex;
}
.thePlayer .icons .oneIcon {
    position: relative;
}
.ttinfo{
    background: #333333cc;
    color: #ccc !important;
    border: #ccc 1px solid;
  }
  .ttinfo p {
      color: #ccc;
  }

img.actionBtn {
    display: none;
}
.mobilePlayer {
        display: none;
    }
.mobilePlayer .info .mobilecontent {
    width: 100%;
    padding-left: 10px;
}

@media (hover: none) {
    .thePlayer .icons img {
        display: none;
    }
    .thePlayer .icons img.actionBtn, .thePlayer .icons img.queueBtn {
    display: inline-block;
    }
}

@media (max-width: 1024px) {
    .thePlayer .icons img {
        display: none;
    }
    .thePlayer .icons img.actionBtn, .thePlayer .icons img.queueBtn {
    display: inline-block;
    }
}

@media (max-width: 960px) {
    .thePlayer .cover {
        display: none;
    }
    .thePlayer.mobilePlayer .cover {
        display: block;
    }
    .thePlayer {
        display: none;
    }
    .mobilePlayer {
        display: block;
        height: 80px;
    }
    .mobilePlayer .info {
        margin: 0;
        width: 100%;
        max-width: calc(100% - 10px);
        display: flex;
        justify-content: space-between;
    }
    .mobileController, .mobilesonginfo {
        display: flex;
        justify-content: space-between;
    }
    .duration {
        width: 100%;
        margin: 5px 0 0 0;
    }
    ul.mobileActions {
        bottom: 83px;
    }
    .thePlayer .controller {
        border-right: none;
    }
    .progress__time {
        display: none;
    }
}

@media (max-width: 500px) {
    .thePlayer.mobilePlayer .cover {
        display: none;
    }
}
</style>