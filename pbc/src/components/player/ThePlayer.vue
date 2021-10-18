<template>
  <div class="thePlayer">
    <div class="controller">
        <img :src="require('../../assets/images/player/Previous_btn.svg')" alt="Previous" @click="prevTrack()">
        <img v-if="isTimerPlaying" :src="require('../../assets/images/player/Pause_btn.svg')" alt="Play" @click="play">
        <img v-else :src="require('../../assets/images/player/Play_btn.svg')" alt="Pause" @click="play">
        <img :src="require('../../assets/images/player/Next_btn.svg')" alt="Next" @click="nextTrack()">
    </div>
    <div class="cover" v-if="song">
        <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/' + song.CatNum +'/cover-thumb.jpg'" :alt="song.AlbumTitle">
    </div>
    <div class="info">
        <p>{{ song.ID }} // {{ song.Title }} <span> by {{ song.ArtistName }}</span></p>
        <div class="progress_bar_flex">
            <!-- <div class="progress__duration">{{ duration }}</div> -->
            <div class="duration progress__bar" ref="progress" @click="clickProgress">
                <div class="progress__current" :style="{ width : barWidth }"></div>
            </div>
            <div class="progress__time">{{ currentTime }} / {{ duration }}</div>
        </div>
    </div>
    <div class="icons">
        <!-- <img :src="require('../../assets/images/actions/playSong_white.svg')" alt="Play"> -->
        <!-- <img :src="require('../../assets/images/actions/addToQueue_white.svg')" alt="Add to Queue"> -->
        <img :src="require('../../assets/images/actions/SimilarSong_Icon_white.svg')" alt="Similar Songs" @click="openPanel('similar', song)">
        <img :src="require('../../assets/images/actions/CustomWork_white.svg')" alt="Custom Work">
        <img :src="require('../../assets/images/actions/Share_Icon_white.svg')" alt="Share">
        <router-link :to="'/song/' + song.ID + '-' + slug">
        <img :src="require('../../assets/images/actions/seeSong_Icon_white.svg')" alt="Track">
        </router-link>
        <router-link :to="'/project/' + artistslug">
        <img :src="require('../../assets/images/actions/seeArtist_Icon_white.svg')" alt="Artist">
        </router-link>
        <img :src="require('../../assets/images/actions/PlayList_Icon.svg')" alt="Playlist" @click="openPanel('queue', null)">
    </div>
  </div>
</template>

<script>
import { ref, computed } from '@vue/reactivity'
// import getSingleSong from '../../composables/getSingleSong'

export default {
    name: 'thePlayer',
    props: [ 'song' ],
    emits: [ 'showPanel', 'playerHandler' ],
    setup(props) {
      const audio = ref(null)
      const circleLeft = ref(null)
      const barWidth = ref(null)
      const duration = ref(null)
      const currentTime = ref(null)
      const isTimerPlaying = ref(false)
      const slug = computed(() => {
            return props.song.Title.toLowerCase().replace(/\s+/g, '-')
        })
      const artistslug = computed(() => {
            return props.song.ArtistName.toLowerCase().replace(/\s+/g, '-')
        })

      return { audio, circleLeft, barWidth, duration, currentTime, isTimerPlaying, slug, artistslug }
    },
    methods: {
        openPanel(panel, data) {
            let da = { type: panel, data: data}
            this.$emit('showPanel', da)
        },
        play() {
            if (this.audio.paused) {
                this.audio.play();
                this.isTimerPlaying = true;
            } else {
                this.audio.pause();
                this.isTimerPlaying = false;
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
            let progress = this.$refs.progress;
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
            this.isTimerPlaying = true;
            this.audio.pause();
            this.updateBar(e.pageX);
        },
        async prevTrack() {
            const data = { type: 'prev' }
            await this.$emit('playerHandler', data)
            setTimeout(() => {
                this.resetPlayer();
            }, 100)
        },
        async nextTrack() {
            const data = { type: 'next' }
            await this.$emit('playerHandler', data)
            setTimeout(() => {
                this.resetPlayer();
            }, 100)
        },
        async playThisTrack(id) {
            const data = { type: 'play', id: id }
            await this.$emit('playerHandler', data)
            setTimeout(() => {
                this.resetPlayer();
                if (this.audio.paused) {
                    this.audio.play();
                    this.isTimerPlaying = true;
                }
            }, 100)
        },
        resetPlayer() {
            this.barWidth = 0;
            this.circleLeft = 0;
            this.audio.currentTime = 0;
            // this.audio.src = 'https://pblibrary.s3.us-east-2.amazonaws.com/' + this.song.CatNum + '/' + this.song.ID  + '.mp3';
            this.audio.src = this.songSrc;
            console.log('Currently Playing: ' + this.songSrc)

            setTimeout(() => {
                if(this.isTimerPlaying) {
                this.audio.play();
                } else {
                this.audio.pause();
                }
            }, 300);
        }
    },
    created() {
        let vm = this;
        this.audio = new Audio();
        this.audio.src = 'https://pblibrary.s3.us-east-2.amazonaws.com/' + this.song.CatNum + '/' + this.song.ID  + '.mp3';
        this.audio.ontimeupdate = function() {
        vm.generateTime();
        };
        this.audio.onloadedmetadata = function() {
        vm.generateTime();
        };
        this.audio.onended = function() {
        vm.nextTrack();
        this.isTimerPlaying = true;
        };
    },
    computed: {
    songSrc: function() { 
        return 'https://pblibrary.s3.us-east-2.amazonaws.com/' + this.song.CatNum + '/' + this.song.ID  + '.mp3';
    }
  },
   watch: { 
      	song: function(newVal, oldVal) { // watch it
        //   console.log('Prop changed: ', newVal, ' | was: ', oldVal)
          this.playThisTrack(newVal);
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
    margin-left: 20px;
    flex-shrink: 0;
}
.thePlayer .cover img {
    width: 40px;
    aspect-ratio: 1/1;
    height: 40px;
    width: 100%;
}
.thePlayer .info {
    margin: 0 20px;
    width: inherit;
    flex-shrink: 2;
}
.thePlayer .info p span {
    font-size: 0.9em;
}
.thePlayer .info .progress_bar_flex {
    display: flex;
    justify-content: left;
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
}
</style>