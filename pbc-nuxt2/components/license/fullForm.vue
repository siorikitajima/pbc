<template>
<div>
    <div class="note">
      <p>We offer a full catalog license per project. Tell us about your project for a quote.</p>
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
        <label for="project">Project Name</label>
        <input type="text" id="project" name="project">
    </div>
    <div class="theforms">
        <label for="url">URL</label>
        <input type="text" id="url" name="url">
    </div>
    <div class="theforms">
        <label for="details">Details*</label>
        <textarea type="text" id="details" name="details" required />
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
import { mapState } from 'vuex'

export default {
    name: 'LicenseFullForm',
    props: [ 'category', 'type', 'subType' ],
    emits: ['sentForm'],
    computed: {
        ...mapState(['licenseSong'])
    },
    methods: {
        async submitForm(event) {
            const {name, email, company, project, url, details, term} = Object.fromEntries(new FormData(event.target))
            let data = {
                inqueryType: 'FullCatalogLicense',
                category: this.category,
                type: this.type,
                subType: this.subType,
                songID: this.licenseSong[0].ID,
                songName: this.licenseSong[0].Title,
                songBy: this.licenseSong[0].ArtistName,
                name: name,
                email: email,
                company: company,
                project: project,
                url: url,
                details: details,
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
            this.$store.commit('CLOSE_LICENSE_PANEL')
            this.$emit('sentForm')
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