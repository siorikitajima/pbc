<template>
<div>
    <a href="https://patternbased.com" target="_blank">
        <img class="PBlogo" src="~/assets/images/about/PatternBased_Logo_972041.svg" >
    </a>
    <div class="channels">
        <a href="https://albums.patternbased.com" target="_blank">
        <img :src="require('~/assets/images/about/SM_Bandcamp.svg')" alt="Bandcamp">
        </a>
        <a href="https://www.instagram.com/patternbased/" target="_blank">
        <img :src="require('~/assets/images/about/SM_Instagram.svg')" alt="Instagram">
        </a>
        <a href="https://github.com/patternbased" target="_blank">
        <img :src="require('~/assets/images/about/SM_Github.svg')" alt="Github">
        </a>
        <a href="https://ello.co/patternbased" target="_blank">
        <img :src="require('~/assets/images/about/SM_Ello.svg')" alt="Ello">
        </a>
        <a href="https://www.facebook.com/patternbased" target="_blank">
        <img :src="require('~/assets/images/about/SM_Facebook.svg')" alt="Facebook">
        </a>
        <a href="https://soundcloud.com/patternbased" target="_blank">
        <img :src="require('~/assets/images/about/SM_SoundCloud.svg')" alt="SoundCloud">   
        </a>
        <a href="https://patternbased.tumblr.com/" target="_blank">
        <img :src="require('~/assets/images/about/SM_Tumblr.svg')" alt="Tumblr">   
        </a>
        <a href="https://www.youtube.com/user/patternbased/" target="_blank">
        <img :src="require('~/assets/images/about/SM_Youtube.svg')" alt="Youtube">   
        </a>
        <a href="https://vimeo.com/patternbased" target="_blank">
        <img :src="require('~/assets/images/about/SM_Vimeo.svg')" alt="Vimeo">   
        </a>
        <a href="https://www.linkedin.com/company/435813/" target="_blank">
        <img :src="require('~/assets/images/about/SM_LinkedIn.svg')" alt="SM_LinkedIn">   
        </a>
        <a href="https://www.tiktok.com/@patternbased" target="_blank">
        <img :src="require('~/assets/images/about/SM_TikTok.svg')" alt="TikTok">   
        </a>
    </div>

    <p>
        <a href="https://legal.patternbased.com/privacy-policy/" target="_blank">Privacy Policy</a>
        <a href="https://legal.patternbased.com/license-agreement/" target="_blank">License Agreement</a>
        <br/>
        © Copyright 2022 PatternBased Corp
    </p>
</div>
</template>

<script>
export default {
    name: 'GlobalCopyright',
}

</script>

<style scoped>
.channels {
    margin: 0 0 20px 0;
}
p {
    font-size: 0.9em;
}
p a {
    margin: 0 20px 0 0;
}
p a:last-of-type {
    margin: 0;
}
.PBlogo {
    width: 200px;
    height: auto;
    margin: auto auto 10px -5px;
}
</style>