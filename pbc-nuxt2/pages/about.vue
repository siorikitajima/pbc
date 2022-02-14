<template>
<div class="wrapper">
    <div class="about">
    <div class="fullwidth">
        <img src="~/assets/images/about/jr-korpa-cJljbGYLTAI-unsplash.jpg" alt="">
        <h1>// ?? //</h1>
    </div>
    <div class="bodytext">
        <h2 class="first sectTitle">// The PatternBased Catalog //</h2>
        <p>The PatternBased Catalog is an ever expanding collection of textural/emotive sound & music that ranges from sparse tones and drones to rhythmic works over a variety of styles and moods. catalog.patternbased.com provides you an interface for searching/listening/sharing/licensing our music. Common users of the interface would be directors/editors/artists looking for pieces of music to license for their projects or music patrons/listeners looking to enjoy a selection of sounds outside the mainstream(ing) services. It is also a privacy focused system where the user can browse and listen, create playlists, and share searches/playlists/albums/songs without logging in or sharing their information.</p>

        <AccordionBox :content="aboutPBC"></AccordionBox>

        <h2 class="sectTitle">// Our Music //</h2>
        <p>At PatternBased, we have been creating music for the sake of creation and also for films and other projects for over two decades with clients including Netflix, Showtime, Amazon, Google, Lucasfilm, The United Nations and so much more. From the cinematic rhythms of <NuxtLink to="/project/low-in-the-sky">Low in the Sky</NuxtLink> to the sparse and beautiful tones of <NuxtLink to="/artist/michael-tolan">Michael Tolan</NuxtLink> and <NuxtLink to="/artist/ron-tucker">Ron Tucker</NuxtLink>. From upbeat whimsical pieces to the sounds of an apocalyptic hellscape and from highly electronic to highly organic. The catalog as a whole covers a lot of sonic ground and could be used for an endless variety of projects.</p>

        <AccordionBox :content="aboutMusic"></AccordionBox>

        <h2 class="sectTitle">// Love and Support //</h2>
        <p>PatternBased supports progress-focused artists such as indie filmmakers, indie game devs, non-profits and other grassroots and forward thinking entities through multiple means including discounted rates on licensing for creations focused on the environment, animal and human rights and similar projects. We work to balance these notions with our best attempts to support our recording artists and the creatives that have contributed to building our label by getting them paid via studio fees, licensing/placement fees and royalties.</p>

        <AccordionBox :content="aboutLove"></AccordionBox>

    </div>  
    <div class="credit">
        <GlobalCopyright></GlobalCopyright>

        <p class="smallFont">Created by <a href="https://patternbased.com" target="_blank">PatternBased</a></p>
        <p class="smallFont">Beautiful photos by amazing photographers from <a href="https://unsplash.com/" target="_blank">Unsplash.com</a> 
        </p>
    </div>
    </div>  
</div>
</template>

<script>
import { aboutPBC, aboutMusic, aboutLove } from '~/assets/about-accd.js'
import GlobalCopyright from '../components/global/Copyright.vue'

export default {
    components: { GlobalCopyright },
    data() {
        return {
            aboutPBC: aboutPBC,
            aboutMusic: aboutMusic,
            aboutLove: aboutLove
        }
    },
    head() {
        return {
        title: 'About || PatternBased',
        meta: [
        {
            hid: 'og:title',
            name: 'og:title',
            content: 'About || PatternBased'
        },
        {
            hid: 'og:url',
            name: 'og:url',
            content: 'https://catalog.patternbased.com/about'
        }
        ]
        }
    },
    methods: {
        dimSong() {
            if(this.inquery == 'suggestion' || this.inquery == 'compose' || this.inquery == 'fullcatalog' || this.inquery == 'customlicense' || this.inquery == 'other') {
                this.inquery4Song = true
            } else {
                this.inquery4Song = false
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
.smallFont {
    font-size: 0.9em;
}
.about {
    width: 100%;
    height: calc(100% - 100px);
    padding: 0;
    margin: 30px 0 60px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
}
.fullwidth {
    margin: 20px 0 0 0;
    height: 200px;
    width: 100%;
    overflow: hidden;
    position: relative;
}
.fullwidth img {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
}
.fullwidth h1 {
    color: #fff;
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
}
.feat {
    width: calc(800px - 30px);
    margin: 10px auto;
    padding: 10px 0 10px 30px;
    border-bottom: #ccc solid 1px;
    position: relative;
}
.feat::before {
    content: '';
    width: 20px;
    height: 20px;
    position: absolute;
    top: 10px;
    left: 0;
    background: #ccc;
}
.credit {
    width: 800px;
    margin: 30px 0 0 0;
    padding: 50px calc((100% - 800px)/2);
    background: #eee;
}
@media(max-width: 840px) {
    .credit {
        width: 90vw;
        padding: 50px 5vw;
    }
}
</style>