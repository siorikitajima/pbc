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
        <TableASong :song="fltdsong" :dist="dist" @openThis="passSingle($event)" @showPanel="passPanel($event)" @queueAction="passQueue($event)" /> 
    </div>
</div>
</template>

<script>
export default {
    name: 'SongList',
    props: ['fltdsongs', 'dist', 'song'],
    emits: ['passThis', 'openPanel', 'queueAction'],
    setup(props) {
        const dist = ref(props.dist)
        return { dist }
    },
    methods: {
        passSingle(data) {
            this.$emit('passThis', data)
        },
        passPanel(data) {
            this.$emit('openPanel', data)
        },
        passQueue(data) {
            this.$emit('queueAction', data)
        }
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
    justify-content: space-between;
}
.tableHeader p {
    display: block;
}
.tableWrapper {
    margin-bottom: 60px;
}
</style>