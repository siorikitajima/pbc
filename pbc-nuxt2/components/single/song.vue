<template>
  <div class="wrapper">
    <div class="flex">
        <div class="div260">
        <img :src="coverImg(song.CatNum, song.ID)" :alt="song.AlbumTitle">
        </div>
        <div class="div520">
          <p>// PB Track //</p>
          <h2>{{ song.Title }}</h2>

          <p>by 
                <NuxtLink :to="'/project/' + slug(song.ArtistName)">
                    <span @click="openLink('project')">{{ song.ArtistName }}</span>
                </NuxtLink>
                    <span v-if="song.FeatArtist" v-html="featArtURL(song.FeatArtist)"></span></p>
          
          <div class="actions">
            <div class="oneIcon">
                <img :src="require('../../assets/images/actions/playSong_dark.svg')" 
                alt="Play Track" @click="$store.commit('PLAY_THIS', song.ID)"
                @mouseover="showInfo['act1'] = true" @mouseleave="showInfo['act1'] = false">
                <transition name="bounce">
                    <div class="ttinfo" v-if="showInfo['act1']"><p>Play Track</p></div>
                </transition>
            </div>
            <div class="oneIcon">
                <img :src="require('../../assets/images/actions/addToQueue_dark.svg')" 
                alt="Add to Queue" @click="$store.commit('ADD_QUEUE', song.ID)"
                @mouseover="showInfo['act2'] = true" @mouseleave="showInfo['act2'] = false">
                <transition name="bounce">
                    <div class="ttinfo" v-if="showInfo['act2']"><p>Add to Queue</p></div>
                </transition>
            </div>
            <div class="oneIcon">
                <img :src="require('../../assets/images/actions/SimilarSong_Icon_dark.svg')" 
                alt="Similar Songs" @click="$store.dispatch('OpenSimSong', song.ID)"
                @mouseover="showInfo['act3'] = true" @mouseleave="showInfo['act3'] = false">
                <transition name="bounce">
                    <div class="ttinfo" v-if="showInfo['act3']"><p>Similar Songs</p></div>
                </transition>
            </div>
            <div class="oneIcon">
                <NuxtLink v-if="panel" :to="'/song/' + song.ID + '-' + slug(song.Title)">
                    <img :src="require('../../assets/images/actions/seeSong_Icon_dark.svg')" 
                    alt="Track Page" @click="openLink('song')"
                    @mouseover="showInfo['act4'] = true" @mouseleave="showInfo['act4'] = false">
                </NuxtLink>
                <transition name="bounce">
                    <div class="ttinfo" v-if="showInfo['act4']"><p>See Song Page</p></div>
                </transition>
            </div>
            <div class="oneIcon">
                <NuxtLink :to="'/project/' + slug(song.ArtistName)">
                <img :src="require('../../assets/images/actions/seeArtist_Icon_dark.svg')" 
                alt="Artist Page" @click="openLink('project')"
                @mouseover="showInfo['act5'] = true" @mouseleave="showInfo['act5'] = false">  
                </NuxtLink>
                <transition name="bounce">
                    <div class="ttinfo" v-if="showInfo['act5']"><p>See Artist Page</p></div>
                </transition>
            </div>
            <div class="oneIcon">
                <img :src="require('../../assets/images/actions/Share_Icon_dark.svg')" 
                alt="Share" @click="shareURL()"
                @mouseover="showInfo['act6'] = true" @mouseleave="showInfo['act6'] = false">
                <transition name="bounce">
                    <div class="ttinfo" v-if="showInfo['act6']"><p>Share</p></div>
                </transition>
            </div>
            <div class="oneIcon">
                <NuxtLink :to="{ path: '/requests', query: { song: song.ID }}">
                <img :src="require('../../assets/images/actions/inquiry_dark.svg')" 
                alt="Inquiry" @click="openLink('song')"
                @mouseover="showInfo['act7'] = true" @mouseleave="showInfo['act7'] = false">
                </NuxtLink>
                <transition name="bounce">
                    <div class="ttinfo" v-if="showInfo['act7']"><p>Inquiry</p></div>
                </transition>
            </div>
            <div class="oneIcon">
                <img :src="require('~/assets/images/actions/License_icon_dark.svg')" 
                alt="License" @click="licenseThis(song.ID)"
                @mouseover="showInfo['act8'] = true" @mouseleave="showInfo['act8'] = false">
                <transition name="bounce">
                    <div class="ttinfo" v-if="showInfo['act8']"><p>License</p></div>
                </transition>
            </div>
            <!-- <button class="small" @click="licenseThis(song.ID)">LICENSE</button>  -->
          </div>
          <p>{{ song.Description }}</p>

        </div>
    </div>
    <div class="flex singleScreen">
        <client-only>
        <ul class="div260">
            <li><b>Rhythm</b>{{ song.PBRhythm }}<span>/10</span></li>
            <li><b>Speed</b>{{ song.PBSpeed }}<span>/10</span></li>
            <li><b>Flow</b>{{ song.ShapeArc }}</li>
            <li><b>Duration</b>{{ length }}</li>
        </ul>
        <ul class="div260">
            <li><b>Experimental</b>{{ song.PBExperimental }}<span>/10</span></li>
            <li><b>Mood</b>{{ song.PBMood }}<span>/10</span></li>
            <li><b>Key</b>{{ song.MusicKey }}</li>
            <li><b>BPM</b>{{ song.BPM }}</li>
        </ul>
        <ul class="div260">
            <li><b>Organic</b>{{ song.PBOrganic }}<span>/10</span></li>
            <li><b>Density</b>{{ song.PBDensity }}<span>/10</span></li>
            <li><b>Stems</b>{{ song.Stems }}</li>
            <li><b>ISRC</b>{{ song.ISRCCode }}</li>
        </ul>
        </client-only>
    </div>
    <div class="flex singleMobile">
        <client-only>
        <ul class="div260 left">
            <li><b>Rhythm</b>{{ song.PBRhythm }}<span>/10</span></li>
            <li><b>Speed</b>{{ song.PBSpeed }}<span>/10</span></li>
            <li><b>Experimental</b>{{ song.PBExperimental }}<span>/10</span></li>
            <li><b>Mood</b>{{ song.PBMood }}<span>/10</span></li>
            <li><b>Organic</b>{{ song.PBOrganic }}<span>/10</span></li>
            <li><b>Density</b>{{ song.PBDensity }}<span>/10</span></li>
        </ul>
        <ul class="div260 right">
            <li><b>Flow</b>{{ song.ShapeArc }}</li>
            <li><b>Duration</b>{{ length }}</li>
            <li><b>Key</b>{{ song.MusicKey }}</li>
            <li><b>BPM</b>{{ song.BPM }}</li>
            <li><b>Stems</b>{{ song.Stems }}</li>
            <li><b>ISRC</b>{{ song.ISRCCode }}</li>
        </ul>
        </client-only>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'SingleSong',
    data() {
        return {
            showInfo:
            {
            'act1': false,
            'act2': false,
            'act3': false,
            'act4': false,
            'act5': false,
            'act6': false,
            'act7': false,
            'act8': false
            }
        }
    },
    props: ['song', 'panel'],
    computed: {
        length() { return this.song.Length ? this.song.Length.slice(2) : '' },
        ...mapGetters({
            slug: 'SLUG',
            coverImg: 'COVER_IMG_L',
            featArtURL: 'FEATART_LINK'
        })
    },
    methods: {
    shareURL() {
        let url = 'https://' + window.location.hostname + '/song/' + this.song.ID + '-' + this.slug(this.song.Title)
            this.$store.dispatch('CopyURL', url)
        },
    licenseThis(id) {
        this.$store.dispatch('OpenLicenseP', id)
        },
    openLink(type) {
        let slugName
        let urlName
        let thisName = window.location.pathname.split('/')
        let leng = thisName.length
        console.log(thisName[leng -1])
        if( type == 'project') {
            slugName = this.slug(this.song.ArtistName)
            urlName = thisName[leng -1]
        } else if ( type == 'song') {
            slugName = this.song.ID
            let thisID = thisName[leng-1].split('-')
            urlName = thisID[0]
        }
        if (slugName !== urlName) {
            this.$store.commit('SHOW_LOADING')
        } 
        this.$store.commit('CLOSE_SING_SONG') 
    }
    }
}
</script>

<style scoped>
h2 {
    margin: 7px 0;
}
.wrapper {
    width: 800px;
    height: fit-content;
    max-width: 100%;
    margin: 0 auto;
}
.flex {
    display: flex;
    justify-content:center
}
.div400 {
    display: block;
    width: 380px;
    margin: 0 10px 20px 10px;
}
.div260 {
    display: block;
    width: 250px;
    margin: 0 5px;
}
.div520 {
    display: block;
    width: 500px;
    margin: 0 0 10px 20px;
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
.div260 img {
    width: 100%;
}
ul.div260 {
    list-style: none;
    padding: 5px 0;
}
ul li {
    height: fit-content;
    padding: 5px;
    margin-bottom: 5px;
    background: #ddd;
}
ul li:nth-of-type(3), ul li:nth-of-type(4) {
    background: #f2f2f2;
}
ul li b {
    padding-left: 10px;
    padding-right: 10px;
}
ul li span {
    font-size: 0.8em;
}
.channels {
    text-align: center;
    padding: 10px 50px 0 50px;
    border-top: #ddd 1px solid;
    border-bottom: #ddd 1px solid;
    margin: 10px 0 0 0;
}
.actions {
    border-top: #ddd 1px solid;
    border-bottom: #ddd 1px solid;
    display: flex;
}
.actions .oneIcon {
    position: relative;
}
.ttinfo{
    background: #ffffffcc;
    color: #888 !important;
    border: #888 1px solid;
  }
  .ttinfo p {
      color: #666;
      /* font-size: 0.8em; */
  }
.flowWrapper {
    display: flex;
    justify-content: left;
    margin-top: 20px;
    gap: 20px;
}
img.flow {
    height: 40px;
    width: 160px;
}
.flex.singleMobile {
        display: none;
    }
@media(max-width: 800px) {
    .flex {
    display: block;
    justify-content:center
}
.wrapper {
    width: 100%;
    max-width: 100%;
    height: fit-content;
    margin-top: 50px;
}
    .div260 {
        margin: 0 auto 20px auto;
        max-width: calc(50% - 15px);
    }
    .div520 {
    width: calc(100% - 20px);
    margin: 0 10px;
    text-align: center;
    }
    .flex.singleMobile {
        display: flex;
        justify-content: center;
        width: fit-content;
        max-width: calc(100% - 20px);
        margin: 10px auto;
        text-align: left;
    }

    .flex.singleScreen {
        display: none;
    }
    .flex.singleMobile .div260.left li {
        background: #DDD;
    }
    .flex.singleMobile .div260.right li {
        background: #f2f2f2;
    }
    .actions {
        justify-content: center;
    }
}
@media(max-width: 560px) {
    .div260 {
        margin: 0 auto 20px auto;
        max-width: calc(100% - 20px);
        width: calc(100% - 20px);
    }
    .flex.singleMobile {
        display: block;
        max-width: unset;
        width: 100%;
    }
    .flex.singleMobile .div260 {
        max-width: unset;
        width: calc(100% - 20px);
    }    
}
</style>