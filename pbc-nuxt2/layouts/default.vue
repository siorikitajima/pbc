<template>
  <div>
    <div>
      <GlobalCliLeftNav />
    </div>
    <!-- <div v-else>
      <FilterIcons />
    </div> -->
    <GlobalCliNav />
    <Nuxt />

    <transition name="slideFRBottom">
    <PlayerQueue v-show="$store.state.queuePanel" />
    </transition>
    <transition name="slideFRBottom">
    <PlayerSimilar v-show="$store.state.similarPanel" />
    </transition>

    <PlayerBar />

    <PanelSingleSong />
    <PanelCopied />
  </div>
</template>

<script>
import GlobalCliLeftNav from "~/components/global/cliLeftNav"
import GlobalCliNav from "~/components/global/cliNav"
import PlayerBar from "~/components/player/Bar"
import PlayerQueue from "~/components/player/Queue"
import PlayerSimilar from "~/components/player/Similar"
import PanelSingleSong from "~/components/panel/SingleSong"
import PanelCopied from "~/components/panel/Copied"

export default {
  components: {
    GlobalCliNav, GlobalCliLeftNav, PlayerBar, PlayerQueue, PlayerSimilar, PanelSingleSong, PanelCopied
  }
}
</script>