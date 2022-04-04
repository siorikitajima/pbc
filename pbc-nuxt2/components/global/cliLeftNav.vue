<template>
<div>
    <div id="navLeft" class="cornerNavs">
        <NuxtLink to="/">
            <img @click="$store.commit('SHOW_LOADING')" class="navIcons active filters" :src="require('~/assets/images/header/Search_Icon.svg')" alt="Search">
        </NuxtLink>
    </div>
</div>
</template>

<script>
export default {
    name: 'CliLeftNav'
}
</script>

<style>

</style>