<template>
  <div>
    <div>
      <GlobalCliLeftNav />
    </div>
    <Nuxt />
    <GlobalCliNav :cart="cart" />

    <PlayerQueue v-if="queuePanel" />
    <PlayerSimilar v-if="similarPanel" />
    <PlayerBar :class="{ 'hidePlayer' : !playerBar }" />

    <PanelCart v-if="cartPanel" />

    <PanelSingleSong />
    <PanelLicense />
    <PanelFlash />
    <PanelLoadingGlobal v-if="loading" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import GlobalCliLeftNav from "~/components/global/cliLeftNav"
import GlobalCliNav from "~/components/global/cliNav"
import PlayerBar from "~/components/player/Bar"
import PlayerQueue from "~/components/player/Queue"
import PlayerSimilar from "~/components/player/Similar"
import PanelSingleSong from "~/components/panel/SingleSong"
import PanelFlash from "~/components/panel/Flash"
import PanelLicense from "~/components/panel/License"
import PanelCart from "~/components/cart/main"
import PanelLoadingGlobal from "~/components/panel/LoadingGlobal"

export default {
  components: {
    GlobalCliNav, GlobalCliLeftNav, PlayerBar, PlayerQueue, PlayerSimilar, PanelSingleSong, 
    PanelFlash, PanelLicense, PanelCart, PanelLoadingGlobal
  },
  computed: {
    ...mapState(['similarPanel', 'queuePanel', 'playerBar', 'licensePanel', 'cartPanel', 'cart', 'loading']),
  },
  mounted() {
      this.$store.commit('SET_WINDOWWIDTH', window.innerWidth)
  }
}
</script>

<style scoped>
.hidePlayer {
  visibility: hidden;
}
</style>