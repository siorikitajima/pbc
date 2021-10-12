<template>
<div id="thenav">
  <div id="navRight" class="cornerNavs">
    <router-link to="/">
      <img v-if="sideNavOpen" class="navIcons" :src="require('../../assets/images/header/PatternBased_Icon_white.svg')" alt="PatternBased">
      <img v-else class="navIcons" :src="require('../../assets/images/header/PatternBased_Icon.svg')" alt="PatternBased">
    </router-link>
      <img v-if="sideNavOpen" class="navIcons" :src="require('../../assets/images/header/Menu_Icon_white.svg')" alt="Menu" @click="sideNavHandler">
      <img v-else class="navIcons" :src="require('../../assets/images/header/Menu_Icon.svg')" alt="Menu" @click="sideNavHandler">
  </div>

    <transition name="slideFRRight">
        <div class="sideNav" v-show="sideNavOpen">
            <ul>
                <router-link to="/artists">
                <li>Projects and Artists</li>
                </router-link>
                <router-link to="/albums">
                <li>Albums and Collections</li>
                </router-link>
                <router-link to="/">
                <li>Catalog Search</li>
                </router-link>
                <li>Request Suggestions</li>
                <li>Request Composing</li>
                <li>About PB Catalog</li>
                <li>Contact Us</li>
            </ul>
        </div>
    </transition>
</div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    name: 'SideNav',
    setup() {
        const sideNavOpen = ref(false)
        return { sideNavOpen }
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
</style>