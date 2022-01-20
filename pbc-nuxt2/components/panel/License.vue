<template>
<div>
  <div v-if="licensePanel" class="licensePanelScreen" @click="closeLicenseP"></div> 
    <div v-if="licensePanel" class="licensePanelWrapper">
        <LicenseSong :song="licenseSong[0]" />

        <div class="selectedList" v-if="step1" @click="reselect(1)">
            <p>License Category : <span>{{ categoryName }}</span></p>
        </div>
        <LicenseCategory v-else @licenseStep="licenseStep(1)" />

        <div class="selectedList" v-if="step1 && step2" @click="reselect(2)">
            <p>License Type : <span>{{ typeName[0] }}</span></p>
        </div>
        <LicenseType v-if="step1 && !step2 && fltLicense.length > 1" :types="fltLicense" @licenseStep="licenseStep(2)" @openForm="openForm($event)" />

        <div class="selectedList" v-if="step1 && step2 && step3" @click="reselect(3)">
            <p>License Sub-Type : <span>{{ subTypeName }}</span></p>
        </div>
        <LicenseSubType v-if="step1 && step2 && !step3 && fltLicense2.length > 1" :subtypes="fltLicense2" @licenseStep="licenseStep(3)" @openForm="openForm($event)" />

        <LicenseDetail v-if="step1 && step2 && step3 && !custom && !full || step1 && step2 && !step3 && fltLicense2.length == 1 && fltLicense2[0].name && !custom && !full || step1 && !step2 && fltLicense.length == 1 && fltLicense[0].name && !custom && !full" :license="slctLicense[0] || fltLicense2[0] || fltLicense[0]" :song="licenseSong[0]" @addToCart="addToCart($event)" />

        <LicenseForm v-if="customForm" :category="categoryName" :type="typeName[0] || ''" :subType="subTypeName || ''" @sentForm="closeLicenseP" />
        <LicenseFullForm v-if="fullForm" :category="categoryName" :type="typeName[0] || ''" :subType="subTypeName || ''" @sentForm="closeLicenseP" />

        <div class="closeIcon panelNav" @click="closeLicenseP">
            <img :src="require('~/assets/images/global/Close_Icon_dark.svg')" alt="Close">
        </div>

    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'PanelLicense',
    data() {
        return {
            step1: false,
            step2: false,
            step3: false,
            custom: false,
            full: false
        }
    },
    computed: {
        ...mapState(['licensePanel', 'licenseData', 'licenseSong', 'licenseDB']),
        categoryName() {
            if (this.licenseData.category == 'films') {
                return 'Films & Show'
            } else if (this.licenseData.category == 'ads') {
                return 'Commercials & Projects'
            } else if (this.licenseData.category == 'art') {
                return 'Arts & Experiences'
            } else if (this.licenseData.category == 'personal') {
                return 'Personal'
            } else if (this.licenseData.category == 'other') {
                return 'Other Media'
            }
        },
        typeName() {
            if(this.custom && this.step2 && !this.step3 ) { return ['Custom License']}
            else if(this.full && this.step2 && !this.step3 ) { return ['Full Catalog License']}
            let typeNames = []
            for(let l = 0; l < this.licenseDB.length; l++) {
                if(this.licenseDB[l].typeSlug == this.licenseData.type) {
                    let aname = this.licenseDB[l].type
                    let exist = typeNames.some(name => {
                        return name == aname })
                    if(!exist) {
                    typeNames.push(aname)
                    } 
                }
            }
            return typeNames
        },
        subTypeName() {
            if(this.custom && this.step3 ) { return 'Custom License'}
            else if(this.full && this.step3 ) { return 'Full Catalog License'}
            for(let l = 0; l < this.licenseDB.length; l++) {
                    if(this.licenseDB[l].typeSlug == this.licenseData.type && this.licenseDB[l].subtypeSlug == this.licenseData.subType) {
                    return this.licenseDB[l].subtype
                    } 
                }
        },
        fltLicense() {
            let filtNames = []
            for(let l = 0; l < this.licenseDB.length; l++) {
                if(this.licenseDB[l].categorySlug == this.licenseData.category) {
                    let aname = this.licenseDB[l].typeSlug
                    let exist = filtNames.some(name => {
                        return name.typeSlug == aname })
                    if(!exist) {
                    filtNames.push(this.licenseDB[l])
                    } 
                }
            }
            return filtNames
        },
        fltLicense2() {
            let filtNames2 = []
            for(let l = 0; l < this.licenseDB.length; l++) {
                if(this.licenseDB[l].typeSlug == this.licenseData.type) {
                    let aname = this.licenseDB[l].subtypeSlug
                    let exist = filtNames2.some(name => {
                        return name.subtypeSlug == aname })
                    if(!exist) {
                    filtNames2.push(this.licenseDB[l])
                    } 
                }
            }
            return filtNames2
        },
        slctLicense() {
            return this.licenseDB.filter( license => {
                return license.typeSlug == this.licenseData.type && license.subtypeSlug == this.licenseData.subType
            })
        },
        customForm() {
            if (this.step1 && this.step2 && !this.step3 && this.fltLicense2.length == 1 && !this.fltLicense2[0].name || this.step1 && !this.step2 && this.fltLicense.length == 1 && !this.fltLicense[0].name || this.custom) 
            { return true }
            else { return false } 
        },
        fullForm() {
            if (this.full) 
            { return true }
            else { return false } 
        }
    },
    methods: {
    closeLicenseP() {
        this.$store.commit('CLOSE_LICENSE_PANEL')
        this.step1 = false
        this.step2 = false
        this.step3 = false
        this.custom = false
        this.full = false
    },
    licenseStep(n) {
        if(n == 1) { this.step1 = true }
        else if(n == 2) { this.step2 = true }
        else if(n == 3) { this.step3 = true }
    },
    openForm(data) {
        if( data.type == 'custom') {
            this.custom = true
        } else if ( data.type == 'full' ) {
            this.full = true
        }
        if( data.step == 2 ) {
            this.step2 = true
        } else if ( data.step == 3 ) {
            this.step3 = true
        }
    },
    reselect(n) {
        if(n == 1) { 
            this.step1 = false
            this.step2 = false
            this.step3 = false 
            this.$store.commit('UPDATE_LICENSE_ALL')
        } else if(n == 2) { 
            this.step2 = false 
            this.step3 = false
            this.$store.commit('UPDATE_LICENSE_TYPE', '')
            this.$store.commit('UPDATE_LICENSE_SUBTYPE', '')
        } else if(n == 3) { 
            this.step3 = false 
            this.$store.commit('UPDATE_LICENSE_SUBTYPE', '')
        }
        this.custom = false
        this.full = false
    },
    addToCart(data) {
        this.$store.commit('ADD_TO_CART', data)
        this.$store.commit('CLOSE_LICENSE_PANEL')
        this.step1 = false
        this.step2 = false
        this.step3 = false
    }
    }
}
</script>

<style scoped>

.licensePanelScreen {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: fixed;
    top: 0; left: 0;
    background: #00000033;
}
.licensePanelWrapper {
    width: 800px;
    height: fit-content;
    max-width: 100%;
    max-height: calc(100% - 180px);
    background: #fff;
    position: fixed;
    top: 20px;
    right: 20px;
    border-radius: 10px;
    padding: 40px;
    z-index: 2000;
    overflow-y: auto;
}
.panelNav {
    width: 30px;
    height: 30px;
    position: fixed;
    top: 40px;
    cursor: pointer;
    }
.panelNav.closeIcon {
    right: 40px;
}
.selectedList {
    width: calc(100% - 20px);
    height: fit-content;
    padding: 5px 10px;
    margin: 0 0 10px 0;
    background: #444;
    color: #fff;
    position: relative;
    text-align: left;
}
.selectedList:hover {
    background: #0092C5;
    transition-duration: 200ms;
}
.selectedList::after {
    content: '';
    width: 24px;
    height: 24px;
    margin: 3px;
    background: url('~/assets/images/global/edit-icon_white.svg') no-repeat;
    position: absolute;
    top: 0;
    right: 0;
}
.selectedList p {
    font-size: 0.9em;
}
.selectedList p span {
    font-size: 1.2em;
    font-weight: bold;
}

@media(max-width: 800px) {
    .licensePanelWrapper {
        width: calc(100% - 20px);
        height: calc(100% - 130px);
        max-height: unset;
        max-width: unset;
        padding: 20px 10px 10px 10px;
        top: 0;
        right: 0;
        border-radius: 0;
        overflow-y: auto;
        text-align: center;
    }
    .panelNav {
        top: 10px;
        position: absolute;
    }
    .panelNav.closeIcon {
        right: 10px;
    }
}
</style>