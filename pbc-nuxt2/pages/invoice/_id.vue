<template>
<div class="wrapper">

        <div class="bodytext invoice">
            <h2 class="sectTitle">// INVOICE //</h2>

            <div v-if="invoice">
                <div class="cartItem head">
                    <div class="invoiceHead">
                        <div class="headerL">
                            <p><b>To:</b> {{ invoice[0].name }}</p>
                            <p> {{ invoice[0].email }}</p>
                            <p> <br/>Order #: {{ invoice[0].orderIdPB }}</p>
                            <p>Paid in full: {{ invoice[0].date }}</p>
                        </div>
                        <div class="headerR">
                            <p><img src="~/assets/images/header/PatternBased_Icon.svg" alt="PatternBased" style="width: 20px; margin: auto 5px -5px auto"><b>PatternBased Corp</b><br/>
                            www.patternbased.com<br/>
                            48999 Paradise Ave.<br/>
                            Morongo Valley, CA, 92256, USA<br/>
                            info@patternbased.com
                            </p>
                        </div>
                    </div>
                </div>
                <div class="cartItem">
                    <div v-for="(item, index) in invoice[0].items" :key="index">
                        <p><b>{{ item.license.name }}</b> <i>{{ item.songName }}</i> by {{ item.songBy }}</p>
                        <p class="price">$ {{ item.license.price }}</p>
                    </div>
                </div>

                <div class="cartItem total">
                    <div>
                        <p>Subtotal</p>
                        <p class="price">${{ invoice[0].subtotal }}</p>
                    </div>
                    <div class="promoHeight" v-if="invoice[0].discount !== '0'">
                        <p>Promo Code Discount</p>
                        <p class="price">${{ invoice[0].discount }}</p>
                    </div>
                    <div>
                        <h4>Total</h4>
                        <h4 class="price">${{ invoice[0].total }}</h4>
                    </div>
                </div>

                <div class="cartItem footer">
                    <p>All amounts shown are in USD.<br/>
                    This is a computer generated invoice. No signature is required.</p>
                    <p> <br/><a class="btn" href="https://legal.patternbased.com/privacy-policy/">Privacy Policy</a> <a class="btn" href="https://legal.patternbased.com/license-agreement/">License Agreement</a><br/>
                    © Copyright 2021 PatternBased Corp</p>
                </div>
            </div>
        </div>

    <button class="large download" @click="downloadPDF(invoice[0].orderIdPB)">
        <p><img src="~/assets/images/global/download_white.svg" alt="PatternBased" style="width: 40px; margin: auto 5px -12px auto">
            Download Invoice</p>
    </button>
</div>
</template>

<script>
import axios from 'axios';
import baseURL from '~/assets/api-url.js'

export default {
    name: 'Invoice',
    head() {
        return {
        title: 'Invoice || PatternBased',
        meta: [
        {
            hid: 'og:title',
            name: 'og:title',
            content: 'Invoice || PatternBased'
        }
        ]
        }
    },
    params: [ 'id' ],
    async asyncData( {params} ) {
        let theId = params.id
        let invoiceUrl = baseURL + '/order/' + theId
        let invoicedata = await axios.get(invoiceUrl)
        let invoice = await invoicedata.data
        return { invoice, theId }
    },
    methods: {
        downloadPDF(id) {
            let downloadUrl = baseURL + '/download-invoice/' + id
            window.open(downloadUrl, '_blank')
        }
    }
}
</script>

<style scoped>

h2 {
    width: fit-content;
    font-size: 1.2em;
    width: 100%;
    padding: 20px 0;
    text-align: center;
    background: url('~/assets/images/global/queue-header.png') repeat;
    background-size: 40%;
    color: #fff;
}
.wrapper {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: auto;
}
.invoice {
    margin: 80px auto 40px auto;
    padding: 20px;
    background: #fff;
    border: #ccc 1px solid;
    box-shadow: 0 0 20px #ccc;
}
.cartItem {
    width: calc(100% - 20px);
    height: fit-content;
    padding: 20px 10px;
    /* display: flex;
    justify-content: space-between; */
    border-bottom: #ccc solid 1px;
}
.cartItem.footer {
    border-bottom: none;
    background: #eee;
    width: 100%;
    padding: 20px 0;
    text-align: center;
}
.cartItem.footer a.btn {
    margin: 0 10px;
    border-bottom: #666 1px solid;
}
.cartItem.head {
    border-bottom: #666 solid 2px;

}
.cartItem div {
    display: flex;
    justify-content: space-between;
}
.cartItem div.invoiceHead div {
    display: block;
}
.cartItem div.invoiceHead div.headerR {
    text-align: right;
}
.cartItem div.promoHeight {
    height: 30px;
    margin-bottom: 5px;
}

.cartItem.total {
    border-top: #666 solid 2px;
    border-bottom: none;
}
.cartItem h4 {
    margin: 5px 0;
}
.cartItem p {
    font-size: 0.9em;
    line-height: 1.5em;
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

button.download {
    width: 300px;
    margin: 10px auto;
    font-size: 1.1em;
    display: block;
    padding-bottom: 18px;
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
</style>