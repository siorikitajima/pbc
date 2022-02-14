<template>
<div class="wrapper">
    <div>
        <h3>{{ license.name }} // ${{ license.price }}<br/>
        <span v-if="license.subtype">( {{ license.subtype }} )</span></h3>
        <p>{{ license.typeDesc }}</p>
        <button class="exlarge license" @click="addToCart(license)">Add To Cart</button>
    </div>
    
    <p><b>Permitted Content:</b><br/> {{ license.permitted }}</p>
    <p><b>Non-Permitted Content:</b><br/> {{ license.nonPermitted }}</p>
    <p><b># of Spots:</b><br/> {{ license.spots }}</p>
    <p v-if="license.usage"><b>Usage:</b><br/> {{ license.usage }}</p>
    <p v-if="license.lifespan"><b>Lifespan:</b><br/> {{ license.lifespan }}</p>
    <p v-if="license.notes"><b>Notes:</b><br/> {{ license.notes }}</p>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'licenseDetail',
    props: [ 'license' ],
    emits: [ 'addToCart' ],
    computed: {
        ...mapState(['licenseSong'])
    },
    methods: {
        slctSubType(subtype) {
            this.$store.commit('UPDATE_LICENSE_SUBTYPE', subtype)
            this.$emit('licenseStep')
        },
        addToCart(license) {
            let data = {
                license:license,
                songID: this.licenseSong[0].ID,
                songName: this.licenseSong[0].Title,
                songBy: this.licenseSong[0].ArtistName,
                AlbumTitle: this.licenseSong[0].AlbumTitle,
                CatNum: this.licenseSong[0].CatNum
            }
            this.$emit('addToCart', data)
            this.$store.dispatch('cartPanel')
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
    .wrapper div {
        width: 100%;
        padding: 20px 0 10px 0;
        background: #eee;
        margin-bottom: 20px;
    }
    .wrapper h3, .wrapper p {
        margin-bottom: 10px;
    }

    .wrapper h3 span {
        font-weight: normal;
    }
    button.license {
        padding: 14px;
        margin-top: 10px;
        cursor: pointer;
    }

</style>