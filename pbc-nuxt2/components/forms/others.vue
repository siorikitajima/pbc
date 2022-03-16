<template>
<div>
    <div class="note">
      <p>Say hi!</p>
    </div>
    <form @submit.prevent="submitForm" ref="thisForm">
    <div class="theforms">
        <label for="name">Name*</label>
        <input type="text" id="name" name="name" required >
    </div>
    <div class="theforms">
        <label for="email">Email*</label>
        <input type="email" id="email" name="email" required >
    </div>
    <div class="theforms">
        <label for="company">Company</label>
        <input type="text" id="company" name="company">
    </div>
    <div class="theforms">
        <label for="invoice">Order# <span class="agreement">(If you've already purchased license(s))</span></label>
        <input type="text" id="invoice" name="invoice" v-model="order">
    </div>
    <div class="theforms">
        <label for="message">Message*</label>
        <textarea type="text" id="message" name="message" required />
    </div>
    <div class="theforms">
            <p><input class="checkbox" type="checkbox" name="term" required>
            <span class="agreement">I agree that I have read PatternBased’s <a href="https://legal.patternbased.com/privacy-policy/">Privacy Policy</a>*.</span></p>
        <button class="large exlarge" type="submit">Send Request</button>
    </div>
    </form>
</div>
</template>

<script>
import axios from 'axios';
import baseURL from '~/assets/api-url.js'

export default {
    name: 'FormOthers',
    props: ['orderNum'],
    data(props) {
        return {
            order: props.orderNum
        }
    },
    methods: {
        async submitForm(event) {
            const {name, email, company, message, term} = Object.fromEntries(new FormData(event.target))
            let data = {
                inquiryType: 'Other',
                name: name,
                email: email,
                company: company,
                message: message,
                term: term
            }
            let formUrl = baseURL + '/form'
            this.showPanel()
            axios.post(formUrl, data)
            .then(function (response) { 
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            });
        },
        showPanel() {
            this.$store.dispatch('sentPanel')
            this.$refs.thisForm.reset()
        }
    }
}
</script>

<style>
.note {
    margin: 0 0 20px 0;
    padding: 10px;
    background: #eee;
    text-align: center;
}
.theforms {
    margin: 20px auto;
}

</style>