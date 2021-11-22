<template>
<div>
    <div v-if="sentPanel" class="sentPanelCoutainer" >
        <h3>Thank you for your request</h3>
        <p>Talk to you soon!</p>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'SentPanel',
    computed: {
        ...mapState(['sentPanel'])
    }
}
</script>

<style scoped>
.sentPanelCoutainer {
    width: 240px;
    height: fit-content;
    background: #222;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    padding: 40px;
    z-index: 3000;
    text-align: center;
}
.sentPanelCoutainer h3, .sentPanelCoutainer p {
    color: #ddd;
    margin: 10px auto;
}
</style>