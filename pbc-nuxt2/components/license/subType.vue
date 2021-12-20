<template>
<div class="wrapper">
    <h4>// Select a License Sub-Type //</h4>
    <div class="licenseTypes">
        <div v-for="type in subtypes" @click="slctSubType(type.subtypeSlug)" :key="type.id">
            <h5>{{ type.name }}<br/><span>( {{ type.subtype }} )</span></h5>
            <p>${{ type.price }}</p>
        </div>
        <div class="option" @click="openForm('custom')">
            <h5>Custom License</h5>
            <p>Please contact us for custom / bulk license.</p>
        </div>
        <div class="option" @click="openForm('full')">
            <h5>Full Catalog License</h5>
            <p>We offer a full catalog license per project. </p>
        </div>
    </div>
</div>
</template>

<script>

export default {
    name: 'licenseSubType',
    props: [ 'subtypes' ],
    emits: [ 'licenseStep', 'openForm' ],
    methods: {
        slctSubType(subtype) {
            this.$store.commit('UPDATE_LICENSE_SUBTYPE', subtype)
            this.$emit('licenseStep')
        },
        openForm(type) {
            let data = { type: type, step: 3 }
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
    }
    .licenseTypes div.option {
        background: #ddd;
        color: #444;
    }
    .licenseTypes div:hover {
        background: #0092c5;
        color: #fff;
    }
    .licenseTypes div p {
        font-size: 0.9em;
    }
    .licenseTypes div h5 {
        font-size: 1em;
        line-height: 1.4em;
        margin: 10px;
    }
    .licenseTypes div h5 span {
        font-weight: normal;
    }

</style>