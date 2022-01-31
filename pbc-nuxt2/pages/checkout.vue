<template>
<div class="wrapper">
    <div class="bodytext" v-if="!paidFor">
        <h2 class="first sectTitle">// Checkout //</h2>

        <CartItem v-for="item in cart" :key="item.songID + '-' + item.songName" :item="item" :page="false" />

        <div class="cartItem total">
            <div>
                <p>Subtotal</p>
                <p class="price">${{ subtotal }}</p>
            </div>
            <div class="promoHeight" v-if="coupon && !applied">
                <input type="text" v-model="promoCode" @change="expired = false">
                <p class="warning" v-if="expired">This code is expired</p>
                <button class="promo apply" :class="{ 'active' : validPromo }" @click="applyPromo()" >Apply Promo Code</button>
            </div>
            <div class="promoHeight" v-if="!coupon && !applied">
                <div></div>
                <button class="promo" @click="coupon = true">Add Promo Code</button>
            </div>
            <div class="promoHeight" v-if="applied">
                <p>Promo Code ({{ promoValue }})</p>
                <p class="price">${{ discount }}</p>
            </div>
            <div>
                <h4>Total</h4>
                <h4 class="price">${{ total }}</h4>
            </div>
        </div>
    </div>

    <div class="bodytext" v-if="paidFor && finalOrder.pbId">
        <h2 class="first sectTitle">// THANK YOU //</h2>
        <p style="width: fit-content; margin: 0 auto;">Your order is complete.</p>

        <div>
            <div class="cartItem head">
                <div>
                    <p><b>Order #: {{ finalOrder.pbId }}</b></p>
                    <p>Date: {{ finalOrder.date }}</p>
                </div>
            </div>
            <CartItem v-for="item in finalOrder.items" :key="item.songID + '-' + item.songName" :item="item" :page="true" :summary="true" />

            <div class="cartItem total">
                <div>
                    <p>Subtotal</p>
                    <p class="price">${{ finalOrder.subtotal }}</p>
                </div>
                <div class="promoHeight" v-if="applied">
                    <p>Promo Code Discount</p>
                    <p class="price">${{ finalOrder.discount }}</p>
                </div>
                <div>
                    <h4>Total</h4>
                    <h4 class="price">${{ finalOrder.total }}</h4>
                </div>
            </div>
        </div>

        <div class="btnbox">
            <NuxtLink :to="'/invoice/' + finalOrder.pbId">
            <button class="large payment">
                <img src="~/assets/images/license/invoice.svg" alt="download">
                <p>View Invoice</p>
            </button>
            </NuxtLink>
            <button class="large payment" @click="requestStems()">
                <img src="~/assets/images/license/Stems_icon.svg" alt="download">
                <p>Request Stems</p>
            </button>
        </div>

        <div class="bodytext">
            <div class="points">
                <img src="~/assets/images/license/audio-file_blue.svg" alt="Wavs">
                <p> You will receive download links for <b>mp3</b> and <b>wav</b> format files within 10 minites via Email. Please <NuxtLink :to="'/requests?type=other&order=' + orderId">contact us</NuxtLink> if you need other formats.</p>
            </div>
            <div class="points">
                <img src="~/assets/images/license/Stems_icon_blue.svg" alt="Stems">
                <p> Stems are available for most of our music upon request. Click on <b>'Request Stems'</b> above now, or request later from <NuxtLink :to="'/requests?type=stems&order=' + orderId">Request form</NuxtLink>.</p>
            </div>
            <div class="points">
                <img src="~/assets/images/license/email_icon_blue.svg" alt="Stems">
                <p> Download Links will expire in <b>7 days</b>. Please <NuxtLink :to="'/requests?type=other&order=' + orderId">contact us</NuxtLink> with your Order# to re-issue download links.</p>
            </div>
        </div>
    </div>
    <div ref="paypal" class="paypal" v-if="!paidFor"></div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios';
import baseURL from '~/assets/api-url.js'
import paypalID from '~/assets/paypal-clientID.js'

export default {
    name: 'Checkout',
    head() {
        return {
        title: 'Checkout || PatternBased',
        meta: [
        {
            hid: 'og:title',
            name: 'og:title',
            content: 'Checkout || PatternBased'
        },
        {
            hid: 'og:url',
            name: 'og:url',
            content: 'https://dev-catalog.patternbased.com/checkout'
        }
        ]
        }
    },
    data() {
        return {
            coupon: false,
            promoCode: '',
            applied: false,
            promoValue: '',
            promoMethod: '',
            promoNum: '',
            expired: false,
            loaded: false,
            paidFor: false,
            order: {},
            finalOrder: {},
            mp3Url: '',
        }
    },
    async asyncData() {
        let promoUrl = baseURL + '/promo'
        let promodata = await axios.get(promoUrl)
        let promos = await promodata.data

        return { promos }
    },
    mounted: function() {
        const script = document.createElement("script");
        script.src = paypalID;
        console.log(paypalID);
        script.addEventListener("load", this.setLoaded);
        document.body.appendChild(script);
    },
    computed: {
        ...mapState(['cart']),
        descriptions() {
            let string = '';
            for(let c = 0; c < this.cart.length; c++) {
                string = string + this.cart[c].license.name + ' for ' + this.cart[c].songName + ' by ' + this.cart[c].songBy + ' / '
            }
            return string
        },
        subtotal() {
            let subtotal = 0;
            for(let c = 0; c < this.cart.length; c++) {
                subtotal = subtotal + Number(this.cart[c].license.price)
            }
            return subtotal
        },
        total() {
            if( this.applied && !this.expired ) { return this.subtotal - this.discount }
            else { return this.subtotal }
        },
        validPromo() {
            if (this.promos.some(e => e.Code === this.promoCode)) {
                return true
            } else { return false }
        },
        discount() {
            if(this.promoMethod == '%') {
                return this.subtotal * ( this.promoNum / 100)
            } else if(this.promoMethod == '$') {
                return this.promoNum
            } else {
                return 0
            }
        },
        date() {
            if(this.order !== {}) {
                let ogstr = this.order.create_time
                const options = { year: "numeric", month: "long", day: "numeric" }
                return new Date(ogstr).toLocaleDateString(undefined, options)
            } else {
                return ''
            }
        },
        orderId() {
            if(this.order !== {}) {
                let str = 'PP-' + this.order.id
                return str
            } else {
                return ''
            }
        },
        orderedSongIds() {
            let ids = []
            for(let c = 0; c < this.cart.length; c++) {
                let id = { 
                    songID: this.cart[c].songID,
                    CatNum: this.cart[c].CatNum
                }
                ids[c] = id
            }
            return ids
        }
    },
    methods: {
        applyPromo() {
            this.promos.filter(promo => {
                if(promo.Code == this.promoCode) {
                    let now = new Date().getTime()
                    let exdate = promo.ExpMethod == 'Date' ? promo.ExpValue.split("/") : ''
                    let theDate = promo.ExpMethod == 'Date' ? new Date(exdate[2], exdate[0] - 1, exdate[1]).setHours(0,0,0,0) : ''

                    if(promo.ExpMethod == 'Counter' && promo.ExpValue > 0 || promo.ExpMethod == 'Date' && (now - theDate) < 0 || promo.ExpMethod == 'None') {
                        this.applied = true
                        console.log(promo.ExpMethod, promo.ExpValue, now, theDate )
                        if(promo.DiscMethod == 'Percent') {
                            this.promoValue = promo.DiscValue + '%'
                            this.promoMethod = '%'
                        } else if(promo.DiscMethod == 'USD') {
                            this.promoValue = '$' + promo.DiscValue
                            this.promoMethod = '$'
                        }
                        this.promoNum = promo.DiscValue
                    } else if (promo.ExpMethod == 'Date' && (now - theDate) > 0) {
                        console.log(promo.ExpMethod, promo.ExpValue, now, theDate )
                        this.expired = true
                    }
                }
            })
        },
    setLoaded: function() {
        this.loaded = true;
        window.paypal
            .Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                purchase_units: [{
                    description: 'Music License',
                    'intent': 'CAPTURE',
                    amount: {
                        currency_code: "USD",
                        value: this.total
                        }
                    }]
                });
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                this.data;
                this.paidFor = true;
                this.order = order;
                await this.postOrder(order)
                this.$store.commit('EMPTY_CART')
                setTimeout(()=>{
                    this.emailConf()
                }, 10000)
                this.$store.dispatch('orderPanel')
            },
            onError: err => {
                console.log(err);
            }
            })
            .render(this.$refs.paypal);
    },
        async postOrder(order) {
            let theorder = {
                    date: this.date,
                    pbId: this.orderId,
                    paymentId: order.id,
                    payer: order.payer,
                    purchase_units: order.purchase_units,
                    status: order.status,
                    items: this.cart,
                    description: this.descriptions,
                    total: this.total,
                    subtotal: this.subtotal,
                    discount: this.discount
                }
            this.finalOrder = theorder
            let url = baseURL + '/order'

            axios.post(url, theorder)
            .then((response) => {
                this.set_mp3Url(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        set_mp3Url(data){
            this.mp3Url = data
            // console.log(this.mp3Url)
        },
        async emailConf() {
            let url = baseURL + '/order-conf'
            axios.post(url, this.finalOrder)
            .then(function (response) {
                // console.log('email conf sent')
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        async requestStems() {
            let url = baseURL + '/stem-request'
            this.$store.dispatch('sentPanel')
            axios.post(url, this.finalOrder)
            .then(function (response) {
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        async downloadFiles(ids, type) {
            let url = baseURL + '/files'
            let da = { ids: ids, orderId: this.orderId, type: type }
            let zipName = 'PBCatalog_' + this.orderId + '_mp3.zip'
            axios.post(url, da, {responseType: 'arraybuffer'})
            .then(function (response) {
                const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/zip' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', zipName); 
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch(function (error) {
                console.log(error);
            });
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
    height: calc(100% - 80px);
    margin: 0;
    padding: 0 0 80px 0;
    overflow: auto;
}
.paypal {
    margin: 20px auto;
    text-align: center;
    transform: scale(0.8);
}
.cartItem.head {
    border-bottom: #666 solid 2px;
    padding: 20px 0;
}
.btnbox {
    display: flex;
    justify-content: center;
    margin: 20px auto;
}
button.payment {
    width: 240px;
    margin: 10px 5px;
    font-size: 1.1em;
}
button.payment img {
    width: 60px;
}
button.promo {
    margin: 5px 0;
}
button.promo.apply {
    pointer-events: none;
    opacity: 0.3;
}
button.promo.apply.active {
    pointer-events: unset;
    opacity: 1;
}
.points {
    display: flex;
    background: #eee;
    padding: 10px 20px;
    border-radius: 5px;
    color: #444;
    margin: 10px 0;
}
.points img {
    width: 60px;
    margin-right: 10px;
}
.points p {
    height: fit-content;
    margin: auto 0;
}
.points p a {
    color: #0092c5;
    font-weight: bold;
    border-bottom: #0092c5 1px solid;
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

@media(max-width: 960px) {
    .wrapper {
        height: calc(100% - 120px);
        padding: 0 0 120px 0;
    }
}

@media(max-width: 800px) {
    .paypal {
        transform: scale(0.9);
    }
    .cartItem.total div.promoHeight {
        display: block;
        text-align: right;
    }
    .btnbox {
    display: block;
    margin: 20px auto;
    }
    button.payment {
        width: 100%;
        margin: 10px 0;
        display: flex;
        justify-content: center;
    }
    button.payment img {
        width: 30px;
        margin-right: 10px;
    }
    button.payment p {
        line-height: 1.6em;
    }
}

</style>