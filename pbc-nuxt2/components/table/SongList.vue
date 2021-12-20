<template>
<div class="tableWrapper">
    <div class="tableHeader">
        <p>SONG / ARTIST / DURATION</p>
        <p>FLOW</p>
        <p>KEY / BPM</p>
        <p>RTM</p>
        <p>SPD</p>
        <p>EXP</p>
        <p>MOD</p>
        <p>ORG</p>
    </div>
    <div v-for="fltdsong in fltdsongs || []" :key="fltdsong.ID">
        <TableASong :song="fltdsong" :dist="dist" />
        <!-- @openThis="passSingle($event)" @showPanel="passPanel($event)" @queueAction="passQueue($event)" />  -->
    </div>
</div>
</template>

<script>
export default {
    name: 'SongList',
    props: ['fltdsongs', 'dist', 'song'],
    // emits: ['passThis', 'openPanel', 'queueAction'],
    setup(props) {
        const dist = ref(props.dist)
        return { dist }
    // },
    // methods: {
    //     passSingle(data) {
    //         this.$emit('passThis', data)
    //     },
    //     passPanel(data) {
    //         this.$emit('openPanel', data)
    //     },
    //     passQueue(data) {
    //         this.$emit('queueAction', data)
    //     }
    }
}
</script>

<style scoped>
.tableHeader {
    width: 790px;
    padding: 5px 10px;
    color: #ffffff88;
    background: #444444;
    margin: 0 auto;
    font-size: 0.8em;
    display: flex;
    justify-content: left;
}
.tableHeader p {
    display: block;
    text-align: center;
    width: 42px;
}
.tableHeader p:nth-of-type(1) {
    width: 200px;
    margin-left: 65px;
}
.tableHeader p:nth-of-type(2) {
    width: 140px;
}
.tableHeader p:nth-of-type(3) {
    width: 180px;
    text-align: left;
}
.tableWrapper {
    margin-bottom: 60px;
}
@media (hover: none) {
    .tableHeader p[data-v-6e8afc8f]:nth-of-type(3) {
        width: 120px;
    }
}
@media (max-width: 900px) {
.tableHeader {
    height: 5px;
    padding: 0 5px;
    max-width: 90%;
}
.tableHeader p {
    display: none;
}
}
</style>