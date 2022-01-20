<template>
<div class="cartPanel">
    <div class="actions">
        <img :src="require('~/assets/images/global/Close_Icon_dark.svg')" alt="Close" @click="closeCart()">
        <p>Cart</p>
        <div style="width:32px; height:32px;"></div>
    </div>
    <div v-if="cart.length > 0" class="cartItems">
        <CartItem v-for="item in cart" :key="item.songID + '-' + item.songName" :item="item" :page="false" />
        
        <div class="cartItem total">
            <div>
                <p>Subtotal</p>
                <p class="price">${{ subtotal }}</p>
            </div>
            <div>
                <h4>Total</h4>
                <h4 class="price">${{ total }}</h4>
            </div>
        </div>

        <NuxtLink to="/checkout">
            <button class="large blue" @click="closeCart()">CHECKOUT</button>
        </NuxtLink>
        <NuxtLink to="/">
            <button class="large" @click="closeCart()">Continue Searching</button>
        </NuxtLink>
    </div>
    <div v-else class="empty">
        <div>
            <h4>Cart is empty</h4>
            <img src="~/assets/images/header/Cart_empty.svg" alt="Cart is empty">
        </div>
    </div>

</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Cart',
    data() {
        return {
            details: false
        }
    },
    computed: {
        ...mapState(['cart']),
        subtotal() {
            let subtotal = 0;
            for(let c = 0; c < this.cart.length; c++) {
                subtotal = subtotal + Number(this.cart[c].license.price)
            }
            return subtotal
        },
        total() {
            return this.subtotal
        }
    },
    methods: {
        deleteCart(id) {
            this.$store.commit('DELETE_FROM_CART', id)
        },
        closeCart() {
            this.$store.commit('CLOSE_CART')
        },
        toggleDetails() {
            this.details = !this.details
        },
    }
}
</script>

<style scoped>
.actions {
    display: flex;
    padding: 0 10px 10px 10px;
    justify-content: space-between;
    position: relative;
    z-index: 100;
    margin: 0;
}
.actions p {
    padding-top: 7px;
}
.actions img {
    width: 30px;
    opacity: 0.5;
    cursor: pointer;
    margin: 0;
}
.cartPanel {
    width: 280px;
    height: calc(100% - 130px);
    margin: 0;
    padding: 10px 20px 60px 20px;
    overflow: auto;
    position: fixed;
    bottom: 0;
    right: 0;
    background: #efefef;
    border-radius: 5px;
}
/* .cartItems {
    width: 100%;
    margin: 0 auto;
    border-top: #ccc solid 1px;
} */
.empty {
    width: 100%;
    height: 100%;
    position: relative;
}
.empty div {
    position: absolute;
    top: calc(50% - 40px);
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.5;
}
.cartItem.total {
    padding: 15px 0;
    border-top: #666 solid 2px;
    border-bottom: none;
}
.cartItem.total div {
    display: flex;
    justify-content: space-between;
}
/* .cartItems .cartItem {
    width: calc(100% - 20px);
    height: fit-content;
    padding: 20px 10px;
    /* display: flex;
    justify-content: space-between; 
    border-bottom: #ccc solid 1px;
}
.cartItems .cartItem div {
    display: flex;
    justify-content: space-between;
}

.cartItems .cartItem.total {
    border-top: #666 solid 2px;
    border-bottom: none;
}
.cartItems .cartItem h4 {
    margin: 5px 0;
}
.cartItems .cartItem p {
    font-size: 0.9em;
}
.cartItems .cartItem .price {
    text-align: right;
}
.cartItems .cartItem .price p {
    font-size: 0.8em;
}
.cartItems .cartItem .price p:hover {
    color: #0092c5;
} */

.cartPanel button {
    width: 100%;
    margin: 10px auto 30px auto;
    font-size: 0.9em;
    cursor: pointer;
}
.cartPanel button.blue {
    background: #0092c5;
    margin: 10px auto;
}

@media(max-width: 960px) {
    .cartPanel {
        z-index: 2000;
        height: calc(100% - 120px);
    }
}
@media(max-width: 800px) {
    .cartPanel {
        width: 400px;
        padding: 30px calc(50% - 200px) 100px calc(50% - 200px);
        max-width: calc(100% - 40px);
        height: calc(100% - 120px);
    }
}
@media(max-width: 440px) {
    .cartPanel {
        width: calc(100% - 40px);
        padding: 30px 20px 100px 20px;
    }
}
</style>