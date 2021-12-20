<template>
<div id="thenav">
  <div id="navRight" class="cornerNavs">

      <img v-if="cart.length > 0 && sideNavOpen" class="navIcons" :src="require('~/assets/images/header/Cart_Icon_white.svg')" alt="Cart" @click="$store.commit('TOGGLE_CART')">
      
      <img v-if="cart.length > 0 && !sideNavOpen" class="navIcons" :src="require('~/assets/images/header/Cart_Icon.svg')" alt="Cart" @click="$store.commit('TOGGLE_CART')">
    
      <div v-if="cart.length > 0" class="num" :class="{ 'blue': sideNavOpen }" @click="$store.commit('TOGGLE_CART')">{{cart.length}}</div>

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
    props: ['cart'],
    data() {
        return {
            sideNavOpen: false
        }
    },
    methods: {
        sideNavHandler() {
            this.sideNavOpen = !this.sideNavOpen
        },
        setLocalStorage() {
            localStorage.setItem("cart", JSON.stringify(this.cart))
        },
    },
    watch:{
    $route (to, from){
        this.sideNavOpen = false;
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
@media (max-width: 600px) {
    .sideNav {
    width: calc(100% - 40px);
    max-width: none;
    }
}
</style>