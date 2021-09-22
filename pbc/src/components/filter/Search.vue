<template>
  <input type="text" v-model="search" @change="updateSearch">
</template>

<script>
import { ref } from '@vue/reactivity'

export default {
    event: 'search',
    setup() {
    const search = ref('')
    const updateSearch = () => {
            this.$emit('search', this.search)
        }
    return { search, updateSearch }
    }
}
</script>

<style>

</style>