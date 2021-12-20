<template>
<div>
    <div v-if="flashPanel" class="copiedPageCoutainer" >
        <h3>{{ flashText }}</h3>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'PanelFlash',
    computed: {
        ...mapState(['flashPanel', 'flashText'])
    }
}
</script>

<style scoped>
.copiedPageCoutainer {
    width: fit-content;
    height: fit-content;
    background: #222;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    padding: 40px;
    z-index: 3000;
}
.copiedPageCoutainer h3 {
    color: #eee;
}
</style>