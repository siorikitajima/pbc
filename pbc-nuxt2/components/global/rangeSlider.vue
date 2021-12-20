<template>
<div>
<div class="panelScreen" @click="$emit('close')"></div>
    <div class="rangeSlider">
        <div class='range-slider'>
            <div class="sliderTitle">
                <div><b>Select Songs</b></div>
                <div>#{{songFrom}} - #{{songTo}}</div>
            </div>
            <input type="range" min="1" :max="songCount" step="1" v-model="songFrom">
            <input type="range" min="1" :max="songCount" step="1" v-model="songTo">
        </div>
        <div class="setIcon panelNav active" @click="setTheRange()">
            {{ type }}
        </div>
        <div class="closeIcon panelNav" @click="$emit('close')">
            CANCEL
        </div>
    </div>
</div>
</template>

<script>

export default {
    name: 'GlobalRangeSelector',
    props: ['songCount', 'type'],
    emits: [ 'setRange', 'close'],
    data() {
        return {
            songFrom: 1,
            songTo: 10
        }
    },
    methods: {
        setTheRange() {
            let fromN = (this.songFrom > this.songTo) ? Number(this.songTo) : Number(this.songFrom -1)
            let toN = (this.songFrom > this.songTo) ? Number(this.songFrom -1) : Number(this.songTo)
            let data = {
                type: this.type,
                from: fromN,
                to: toN
            }
            this.$emit('setRange', data)
            this.$emit('close')
        }
    }
}
</script>

<style scoped>

.rangeSlider {
    width: calc(100% - 20px);
    background:#333;
    height: fit-content;
    position: fixed;
    bottom: 100px;
    padding: 30px 10px;
    left: 0;
    z-index: 2200;
    color: #888;
}
.range-slider {
    width: 300px;
    margin: 10px auto 30px auto;
    font-size: 1.1em;
}
.range-slider input {
    background: #222;
    display: block;
    width: 300px;
}
.panelNav {
    width: fit-content;
    height: fit-content;
    background: none;
    border-radius: 5px;
    padding: 10px 20px;
    /* position: fixed; */
    display: inline-block;
    color: #0092c5;
    margin: 0 10px;
    border: #0092c5 1px solid;
}
.panelNav.active {
    color: #222;
    background: #0092c5;
}
.panelNav.closeIcon, .panelNav.setIcon {
    bottom: 150px;
    right: 20px;
}
@media (min-width: 800px) {
.rangeSlider {
    width: fit-content;
    bottom: unset;
    padding: 30px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
}
}
/* .rangeSelector div {
    display: flex;
    justify-content: space-between; */
/* }
.rangeSelector input {
    width: 60px;
    height: 40px;
    margin: auto 0;
    font-size: 1.2em;
    color: #ddd;
    border: none;
    text-align: center;
    padding: 0;
    font-weight: bold;
}
.rangeSelector img {
    width: 40px;
    height: 40px;
    padding: 10px;
    cursor: pointer;
} */

/* .trackCount {
    color: #fff;
    margin-top: 10px;
    font-size: 1.1em;
}
.trackCount.dark {
    font-size: 1.2em;
    margin: 20px;
}
.trackCount span {
    font-size: 0.9em;
}

@media (max-width: 600px) {
    .rangeSelector {
        display: none;
    }
    .resultIcon .trackCount {
        color: #222;
        font-size: 1.4em;
    }
} */
</style>