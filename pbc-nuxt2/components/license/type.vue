<template>
<div class="wrapper">
    <h4>// Select a License Type //</h4>
    <div class="licenseTypes">
        <div v-for="type in types" @click="slctType(type.typeSlug)" :key="type.id">
            <h5>{{ type.type }}</h5>
            <p>{{ type.typeDesc }}</p>
        </div>
        <div class="option custom" @click="openForm('custom')">
            <h5>Custom License</h5>
            <p>Please contact us for custom / bulk license.</p>
        </div>
        <div class="option full" @click="openForm('full')">
            <h5>Full Catalog License</h5>
            <p>We offer a full catalog license per project. </p>
        </div>
    </div>
</div>
</template>

<script>

export default {
    name: 'licenseType',
    props: [ 'types' ],
    emits: [ 'licenseStep', 'openForm' ],
    methods: {
        slctType(type) {
            this.$store.commit('UPDATE_LICENSE_TYPE', type)
            this.$emit('licenseStep')
        },
        openForm(type) {
            let data = { type: type, step: 2 }
            this.$emit('openForm', data)
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
        margin: 10px 0;
    }
    .licenseTypes {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: left;        
    }
    .licenseTypes div {
        width: calc((100% - 60px) / 3 - 40px);
        height: 100px;
        padding: 20px;
        margin: 10px;
        background: #eee;
        border-radius: 5px;
    }
    .licenseTypes div.option {
        background: #444;
        color: #fff;
    }
    .licenseTypes div.option.custom {
        background-image: url('~/assets/images/license/armand-khoury-4cBVro7SHLs-unsplash.jpg');
        background-size: cover;
    }
    .licenseTypes div.option.full {
        background-image: url('~/assets/images/license/dawson-perkins-WwoZT2s9h44-unsplash.jpg');
        background-size: cover;
    }

    @media(hover: hover) {
        .licenseTypes div:hover {
            background: #0092c5;
            transition-duration: 200ms;
            color: #fff;
        }
        .licenseTypes div.option:hover {
            opacity: 0.5;
            transition-duration: 200ms;
        }
    }
    .licenseTypes div p {
        font-size: 0.9em;
    }
    .licenseTypes div h5 {
        font-size: 1em;
        margin: 10px;
    }

@media(max-width: 800px) {
    .licenseTypes div {
        width: 100%;
        height: fit-content;
        padding: 20px 10px;
    }
    .licenseTypes div h5 {
        margin: 0;
    }
}

</style>