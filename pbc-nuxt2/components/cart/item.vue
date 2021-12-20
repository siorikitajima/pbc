<template>
        <div class="cartItem" :key="item.songID + '-' + item.songName">
            <div v-if="!summary">
                <h4>{{ item.license.name }}</h4>
                <h4 class="price">${{ item.license.price }}</h4>
            </div>
            <div class="songInfo" :class="{ 'wider' : page }" v-if="!summary">
                <div class="cover">
                    <img :src="'https://pblibrary.s3.us-east-2.amazonaws.com/' + item.CatNum +'/cover-thumb.jpg'" :alt="item.songName">
                </div>
                <div>
                    <p class="songInfoText" :class="{ 'wider' : page }"><i>{{ item.songName }}</i> by {{ item.songBy }}</p>
                </div>
                <div class="right" v-if="page && !summary">
                    <p class="price action" v-if="details" @click="toggleDetails()">Hide Details</p>
                    <p class="price action" v-else @click="toggleDetails()">Details</p>
                    <p class="price action" @click="deleteCart(item.songID)">Delete</p>
                </div>
            </div>
            <div :class="{ 'wider' : page }" v-if="summary">
                <p><b>{{ item.license.name }}</b> // <i>{{ item.songName }}</i> by {{ item.songBy }}</p>
                <p class="price">${{ item.license.price }}</p>
            </div>
            <div class="right" v-if="!page">
                <p class="price action" v-if="details" @click="toggleDetails()">Hide Details</p>
                <p class="price action" v-else @click="toggleDetails()">Details</p>
                <p class="price action" @click="deleteCart(item.songID)">Delete</p>
            </div>
            <div class="detail" v-if="details">
                <p><b>Permitted Content:</b><br/> {{ item.license.permitted }}</p>
                <p><b>Non-Permitted Content:</b><br/> {{ item.license.nonPermitted }}</p>
                <p><b># of Spots:</b><br/> {{ item.license.spots }}</p>
                <p v-if="item.license.usage"><b>Usage:</b><br/> {{ item.license.usage }}</p>
                <p v-if="item.license.lifespan"><b>Lifespan:</b><br/> {{ item.license.lifespan }}</p>
                <p v-if="item.license.notes"><b>Notes:</b><br/> {{ item.license.notes }}</p>
            </div>
        </div>

</template>

<script>

export default {
    name: 'CartItem',
    props: ['item', 'page', 'summary'],
    data() {
        return {
            details: false
        }
    },
    methods: {
        deleteCart(id) {
            this.$store.dispatch('deleteFromCart', id)
        },
        toggleDetails() {
            this.details = !this.details
        }
    }
}
</script>

<style scoped>
.cartItem {
    width: calc(100% - 20px);
    height: fit-content;
    padding: 20px 10px;
    /* display: flex;
    justify-content: space-between; */
    border-bottom: #ccc solid 1px;
}
.cartItem div {
    display: flex;
    justify-content: space-between;
}
.cartItem div.songInfo {
    margin: 5px 0;
}
.cartItem div.songInfo.wider {
    justify-content: left;
    position: relative;
}
.cartItem div.songInfo.wider div.right {
    position: absolute;
    right: 0;
}
.cartItem div.right {
    justify-content: right;
}
.cartItem div.detail {
    display: block;
}
.cartItem div.detail p {
    margin-top: 5px;
}
.cartItem div.right p {
    background: #aaa;
    color: #fff;
    padding: 5px 10px;
    margin: 5px 0 5px 10px;
    border-radius: 5px;
}
.cartItem div.right p:hover {
    background: #666;
    transition-duration: 200ms;
}
.cartItem.total {
    border-top: #666 solid 2px;
    border-bottom: none;
}
.cartItem h4 {
    margin: 0;
}
.cartItem p {
    font-size: 0.9em;
}
.cartItem .price {
    text-align: right;
}
.cartItem .price p {
    font-size: 0.8em;
}
.cartItem .price p:hover {
    color: #0092c5;
}

.cartItem .cover {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    flex-shrink: 0;
}
.cartItem .cover img {
    width: 40px;
    aspect-ratio: 1/1;
    height: 40px;
    width: 100%;
}
.songInfoText {
    width: 210px;
}
.songInfoText.wider {
    width: inherit;
}

</style>