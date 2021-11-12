<template>
<div>
    <div v-if="copyURL" class="copiedPageCoutainer" >
        <h3>URL COPIED</h3>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'CopiedPanel',
    computed: {
        ...mapState(['copyURL'])
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
    color: #ddd;
}
</style>