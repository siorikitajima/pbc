<template>
<div v-for="song in songs" :key="song">
    <ASong :song="song" /> 
</div>
</template>

<script>
import ASong from './ASong.vue'

export default {
    props: ['songs'],
    components: { ASong },
    // setup(props) {
    //     console.log('songs are read')
    // }
}
</script>

<style>

</style>