<template>
  <div>
    <div>
      <GlobalCliLeftNav />
    </div>
    <Nuxt />
    <GlobalCliNav :cart="cart" />

    <!-- <transition name="slideFRBottom"> -->
      <PlayerQueue v-if="queuePanel" />
    <!-- </transition>
    <transition name="slideFRBottom"> -->
      <PlayerSimilar v-if="similarPanel" />
    <!-- </transition> -->

    <PlayerBar :class="{ 'hidePlayer' : !playerBar }" />

    <PanelCart v-if="cartPanel" />

    <PanelSingleSong />
    <PanelLicense />
    <PanelFlash />
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

export default {
  // transition: 'slideFRBottom',
  components: {
    GlobalCliNav, GlobalCliLeftNav, PlayerBar, PlayerQueue, PlayerSimilar, PanelSingleSong, 
    PanelFlash, PanelLicense, PanelCart
  },
  computed: {
    ...mapState(['similarPanel', 'queuePanel', 'playerBar', 'licensePanel', 'cartPanel', 'cart']),
  }
}
</script>

<style scoped>
.hidePlayer {
  visibility: hidden;
}
</style>