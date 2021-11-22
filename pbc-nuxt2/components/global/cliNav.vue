<template>
<div id="thenav">
  <div id="navRight" class="cornerNavs">
    <!-- <NuxtLink to="/">
      <img v-if="sideNavOpen" class="navIcons" :src="require('~/assets/images/header/PatternBased_Icon_white.svg')" alt="PatternBased">
      <img v-else class="navIcons" :src="require('~/assets/images/header/PatternBased_Icon.svg')" alt="PatternBased">
    </NuxtLink> -->
      <img v-if="sideNavOpen" class="navIcons" :src="require('~/assets/images/header/Menu_Icon_white.svg')" alt="Menu" @click="sideNavHandler">
      <img v-else class="navIcons" :src="require('~/assets/images/header/Menu_Icon.svg')" alt="Menu" @click="sideNavHandler">
  </div>

    <transition name="slideFRRight">
        <div class="sideNav" v-show="sideNavOpen">
            <client-only>
            <ul>
                <NuxtLink to="/">
                    <li>Catalog Search</li>
                </NuxtLink>
                <NuxtLink to="/artists">
                    <li>Projects and Artists</li>
                </NuxtLink>
                <NuxtLink to="/albums">
                    <li>Albums and Collections</li>
                </NuxtLink>
                <li>About PB Catalog</li>
                <NuxtLink to="/requests">
                    <li>Request Work</li>
                </NuxtLink>
            </ul>
            </client-only>
        </div>
    </transition>
</div>
</template>

<script>
export default {
    name: 'CliNav',
    data() {
        return {
            sideNavOpen: false
        }
    },
    methods: {
        sideNavHandler() {
            this.sideNavOpen = !this.sideNavOpen
        }
    },
    watch:{
    $route (to, from){
        this.sideNavOpen = false;
    }
} 
}
</script>

<style scoped>
.sideNav {
    width: 280px;
    height: calc(100% - 100px);
    padding: 50px 20px;
    background: #333;
    border-left: #555 solid 1px;
    position: fixed;
    top: 0;
    right: 0;
    z-index: -1;
}
.sideNav ul {
    width: 100%;
    padding: 0;
    text-align: center;
    list-style: none;
    margin: 50px 0 20px 0;
    color: #ddd;
}
.sideNav ul li {
    padding: 16px 0;
}
.sideNav ul li:hover {
    background: linear-gradient(90deg, rgba(51,51,51,1) 0%, rgba(68,68,68,1) 50%, rgba(51,51,51,1) 100%);
    transition-duration: 200ms;
}
@media (max-width: 600px) {
    .sideNav {
    width: calc(100% - 40px);
    max-width: none;
    }
}
</style>