<template>
  <!-- <div id="navMiddle">
    <router-link to="/">
      <img class="navIcons" :src="require('./assets/images/header/PatternBased_Catalog_logo.svg')" alt="Menu">
    </router-link>
  </div> -->
  <div id="navRight" class="cornerNavs">
    <router-link to="/">
      <img class="navIcons" :src="require('./assets/images/header/PatternBased_Icon.svg')" alt="PatternBased">
    </router-link>
    <router-link to="/">
        <img class="navIcons" :src="require('./assets/images/header/Menu_Icon.svg')" alt="Menu">
    </router-link>
  </div>

  <router-view/>
  
  <thePlayer :song="thesong" />

</template>

<script>
import thePlayer from './components/player/ThePlayer.vue'
export default {
  components: { thePlayer },
  data() {
    return {
     thesong: { CatNum: 'PBXX', Title: 'Song Title', ArtistName: 'Orlando the King'}
    }
  }
}
</script>

<style>
.cornerNavs {
  padding: 20px;
  width: fit-content;
  position: fixed;
  z-index: 1000;
}

#navRight { right: 0; }
#navLeft { left: 0; }
#navMiddle {
  padding: 20px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: -10;
}
#navMiddle img {
  height: auto;
  width: 180px;
}

.cornerNavs a {
  font-weight: bold;
  color: #2c3e50;
}

.cornerNavs a.router-link-exact-active {
  color: #0092c5;
}

.navIcons {
  width: 32px;
  height: 32px;
  margin: 0 10px;
  padding: 5px;
  cursor: pointer;
}

</style>
