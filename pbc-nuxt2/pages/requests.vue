<template>
<div class="wrapper">
    <div v-if="shownNames.length > 0 && searchPanel" class="fullScreen" @click="searchPanel = false">
    </div>
    <div class="bodytext">
        <h2 class="first sectTitle">// Request Work //</h2>
        <p>Feel free to contact us at any point in your searching and listening if you would like to talk about your project and have us help you find or create exactly what you are looking for. We know our catalog inside and out (and we always have a mountain of unreleased material). <br/>Additionally, we are always composing custom music from complete scores to short beats to remixes. Anything in the catalog can be thought of as a starting point for something new. Stems for all songs are readily available.</p>
        <hr>
    </div>

    <div class="theforms">
        <label for="type">How can we help?</label>
        <select ref="type" name="type" id="type" v-model="inquiry" @change="dimSong()">
            <option style="font-family: 'Raleway', sans-serif;" disabled selected>--- Select Request Type ---</option>
            <option style="font-family: 'Raleway', sans-serif;" value="suggestion">Suggestions</option>
            <option style="font-family: 'Raleway', sans-serif;" value="stems">Stems</option>
            <option style="font-family: 'Raleway', sans-serif;" value="compose">Composing</option>
            <option style="font-family: 'Raleway', sans-serif;" value="length">Custom work - Length/Timing</option>
            <option style="font-family: 'Raleway', sans-serif;" value="remix">Custom work - Remix/Alter</option>
            <option style="font-family: 'Raleway', sans-serif;" value="fullcatalog">Full Catalog License</option>
            <option style="font-family: 'Raleway', sans-serif;" value="customlicense">Custom License</option>
            <option style="font-family: 'Raleway', sans-serif;" value="other">Other</option>
        </select>
    </div>

    <div class="theforms songName" v-bind:class="{ dimmed: inquiry4Song }">
        <label for="song">Specific song in your mind?</label>
        <input type="text" id="song" name="song" autocomplete="off" :value="songName" @focus="searchPanel = true" @input="e => songName = e.target.value" >
        <div class="dropdown" v-if="shownNames.length > 0 && searchPanel">
            <ul class="searchKeys">
                <li class="searchKey" 
                v-for="song in shownNames" 
                @click="setKey(song.Title)" :key="song.ID">
                <span class="cover" @click="$store.commit('PLAY_THIS', song.ID)"><img :src="coverImg(song.CatNum, song.ID)" :alt="song.ID"></span><span><b>{{song.Title}}</b> by {{song.ArtistName}}</span>
                </li>
            </ul>
        </div>
    </div>

    <div class="main">
        <FormsSuggestion v-if="inquiry == 'suggestion'"/>
        <FormsStems v-if="inquiry == 'stems'" :song="songName" :orderNum="orderNum" />
        <FormsComposing v-if="inquiry == 'compose'"/>
        <FormsLength v-if="inquiry == 'length'" :song="songName" />
        <FormsRemix v-if="inquiry == 'remix'" :song="songName" />
        <FormsFullcatalog v-if="inquiry == 'fullcatalog'" />
        <FormsCustomLicense v-if="inquiry == 'customlicense'" />
        <FormsOthers v-if="inquiry == 'other'" :orderNum="orderNum" />
    </div>
    
</div>
</template>

<script>
import axios from 'axios';
import baseURL from '~/assets/api-url.js'
import { mapGetters } from 'vuex'

export default {
    name: 'Requests',
    head() {
        return {
        title: 'Request Work || PatternBased',
        meta: [
        {
            hid: 'og:title',
            name: 'og:title',
            content: 'Requests || PatternBased'
        },
        {
            hid: 'og:url',
            name: 'og:url',
            content: 'https://catalog.patternbased.com/requests'
        }
        ]
        }
    },
    async asyncData() {
        let songNameUrl = baseURL + '/songnames'
        let songNamedata = await axios.get(songNameUrl)
        let songNames = await songNamedata.data
        return { songNames }
    },
    data() {
        return {
            inquiry: '',
            songName: '',
            orderNum: '',
            shownNames: [],
            inquiry4Song: true,
            searchPanel: false
        }
    },
    methods: {
        dimSong() {
            if(this.inquiry == 'suggestion' || this.inquiry == 'compose' || this.inquiry == 'fullcatalog' || this.inquiry == 'customlicense' || this.inquiry == 'other') {
                this.inquiry4Song = true
            } else {
                this.inquiry4Song = false
            }
        },
      filterKeys() {
        if (this.songName == '') {
          this.shownNames = this.songNames
        }
        this.shownNames = this.songNames.filter(song => {
          return song.Title.toLowerCase().match(this.songName.toLowerCase())
        })
      },
      setKey(title) {
          this.songName = title
          this.searchPanel = false
      }
    },
    watch: {
      songName() {
        this.filterKeys()
      }
    },
    mounted() {
        if(this.$route.query.song) {
            let ID = this.$route.query.song
            const thesong = this.songNames.filter(song => { return song.ID == ID})
            const thetitle = thesong[0].Title
            this.songName = thetitle
            this.inquiry4Song = false
        }
        if(this.$route.query.type) {
            this.inquiry = this.$route.query.type
            for ( var i = 0, len = this.$refs.type.options.length; i < len; i++ ) {
            let opt = this.$refs.type.options[i];
            if ( opt.value === this.$route.query.type ) {
                opt.setAttribute('selected', 'selected'); 
                break;
            }}
        }
        if(this.$route.query.order) {
            this.orderNum = this.$route.query.order
        }
    },
    computed: {
        ...mapGetters({
            coverImg: 'COVER_IMG',
        })
    }
}
</script>

<style scoped>
h2 {
    width: fit-content;
    font-size: 1.2em;
    margin: 40px auto 20px auto;
    color: #666;
}
h2.first {
    margin: 80px auto 20px auto;
}
.wrapper {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: auto;
}
.main {
    margin: 50px auto 100px auto;
    height: auto;
    width: 800px;
    max-width: 90vw;
}
.dimmed {
    opacity: 0.3;
    pointer-events: none;
}

.theforms.songName {
    position: relative;
    z-index: 700;
}
.theforms.songName input {
    z-index: 800;
}
.theforms.songName .dropdown {
    position: absolute;
    top: 30px;
    left: 0;
    width: 100%;
    height: fit-content;
    max-height: 300px;
    background: #fff;
    border: #444 1px solid;
    overflow: scroll;
    z-index: 800;
}
.theforms.songName .dropdown ul {
    list-style: none;
    padding: 0;
}
.theforms.songName .dropdown ul li {
    padding: 5px 20px;
    display: flex;
    justify-content: left;
    cursor: pointer;
}
.theforms.songName .dropdown ul li span {
    display: block;
    color: #888;
}
.theforms.songName .dropdown ul li span b {
    font-weight: normal;
    color: #222;
}
.theforms.songName .dropdown ul li .cover {
    width: 30px;
    height: 30px;
    margin: 0 10px 0 0;
}
.theforms.songName .dropdown ul li .cover img {
    width: 30px;
    height: 30px;
}
.theforms.songName .dropdown ul li .cover:hover {
    background: #222 url('~/assets/images/player/Play_btn.svg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 80% 80%;
}
.theforms.songName .dropdown ul li .cover:hover img {
    display: none;
}
.fullScreen {
  background: #00000000;
  position: absolute;
  top: 0; bottom: 0; left: 0; right: 0;
  z-index: 600;
}
@media (max-width: 600px) {
    .theforms.songName .dropdown {
    top: 64px;
    }
}
</style>