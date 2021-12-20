<template>
<div class="wrapper">
    <h4>// Select a License Category //</h4>
    <ul class="categorys">
        <li @click="slctCategory('films')">Films &#38; Show</li>
        <li @click="slctCategory('ads')">Commercials &#38; Projects</li>
        <li @click="slctCategory('art')">Arts &#38; Experiences</li>
        <li @click="slctCategory('personal')">Personal</li>
        <li @click="slctCategory('other')">Other Media</li>
    </ul>
</div>
</template>

<script>

export default {
    name: 'LicenseCategory',
    emits: [ 'licenseStep' ],
    methods: {
        slctCategory(category) {
            this.$store.commit('UPDATE_LICENSE_CATEGORY', category)
            this.$emit('licenseStep')
        }
    }
}
</script>

<style scoped>
    .wrapper {
        width: 100%;
        border-top: #ddd 1px solid;
        text-align: center;
        padding-top: 20px;
    }
    .wrapper h4 {
        color: #ccc;
    }
    ul.categorys {
        list-style: none;
        padding: 0;
    }
    ul.categorys li {
        padding: 10px;
        background: #eee;
        margin: 10px 0;
    }
    ul.categorys li:hover {
        background: #0092c5;
        color: #fff;
        transition-duration: 200ms;
    }
</style>