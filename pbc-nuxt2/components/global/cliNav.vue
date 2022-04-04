<template>
<div id="thenav">
  <div id="navRight" class="cornerNavs">

      <img v-if="cart.length > 0 && sideNavOpen" class="navIcons" :src="require('~/assets/images/header/Cart_Icon_white.svg')" alt="Cart" @click="$store.commit('TOGGLE_CART')">
      
      <img v-if="cart.length > 0 && !sideNavOpen" class="navIcons" :src="require('~/assets/images/header/Cart_Icon.svg')" alt="Cart" @click="$store.commit('TOGGLE_CART')">
    
      <div v-if="cart.length > 0" class="num" :class="{ 'blue': sideNavOpen }" @click="$store.commit('TOGGLE_CART')">{{cart.length}}</div>

      <img v-if="sideNavOpen" class="navIcons" :src="require('~/assets/images/header/Menu_Icon_white.svg')" alt="Menu" @click="toggleMenu">
      <img v-else class="navIcons" :src="require('~/assets/images/header/Menu_Icon.svg')" alt="Menu" @click="toggleMenu">
  </div>

    <transition name="slideFRRight">
        <div class="sideNav" v-show="sideNavOpen">
            <client-only>
            <ul>
                <NuxtLink to="/">
                    <li @click="$store.commit('SHOW_LOADING')">Catalog Search</li>
                </NuxtLink>
                <NuxtLink to="/artists">
                    <li @click="$store.commit('SHOW_LOADING')">Projects and Artists</li>
                </NuxtLink>
                <NuxtLink to="/albums">
                    <li @click="$store.commit('SHOW_LOADING')">Albums and Collections</li>
                </NuxtLink>
                <NuxtLink to="/about">
                    <li @click="$store.commit('SHOW_LOADING')">About</li>
                </NuxtLink>
                <NuxtLink to="/requests">
                    <li @click="$store.commit('SHOW_LOADING')">Requests</li>
                </NuxtLink>
                <NuxtLink to="/" @click.native="openTut">
                    <li>Tutorial</li>
                </NuxtLink>
            </ul>
            </client-only>
            <div class="footer">
            <GlobalCopyright/>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
import GlobalCopyright from '../../components/global/Copyright.vue'
import { mapState } from 'vuex'

export default {
    name: 'CliNav',
    components: { GlobalCopyright },
    props: ['cart'],
    computed: {
        ...mapState(['sideNavOpen']),
    },
    methods: {
        setLocalStorage() {
            localStorage.setItem("cart", JSON.stringify(this.cart))
        },
        openTut() {
            this.$store.commit('SHOW_LOADING')
            this.$store.commit('MENU_CLOSE')
            this.$store.commit('OPEN_TUTORIAL')
        },
        toggleMenu() {
            if(!this.sideNavOpen && window.innerWidth <= 600) {
                this.$store.commit('HIDE_PLAYER')
            } else {
                this.$store.commit('SHOW_PLAYER')
            }
            this.$store.commit('MENU_TOGGLE')
        }
    },
    watch:{
    $route (to, from){
        this.$store.commit('MENU_CLOSE')
        if(window.innerWidth <= 600) {
            this.$store.commit('SHOW_PLAYER')
        }
    },
    cart(newV, oldV) { 
            this.setLocalStorage()
        }
    },
    mounted() {
        if(localStorage.getItem("cart")) {
            let cData = JSON.parse(localStorage.getItem("cart"))
            this.$store.commit('SET_CART', cData)
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
.num {
    cursor: pointer;
}
.footer {
    width: calc(100% - 40px);
    padding: 50px 20px;
    background: #eee;
    margin: 50px auto 0 -20px;
    text-align: center;
    vertical-align: bottom;
    position: absolute;
    bottom: 50px;
}
@media (max-width: 600px) {
    .sideNav {
    width: calc(100% - 40px);
    max-width: none;
    overflow: auto;
    }
    .footer {
        position: static;
        bottom: unset;
        vertical-align: unset;
        width: 100%;
        margin: 70px -20px 50px -20px;
    }
}
@media (max-height: 800px) {
    .sideNav {
    overflow: auto;
    }
    .footer {
        position: static;
        bottom: unset;
        vertical-align: unset;
        width: 100%;
        margin: 70px -20px 0 -20px;
    }
}

</style>