<template>
  <div class="common-livebar">
    <div class="common-livebar-wrap">
      <div class="team-logo flex-center">
        <div class="logo home-logo"></div>
      </div>
      <div class="name-box flex-center">
        <label for="home">{{ homeName }}</label>
      </div>
      <div class="scores-box flex-center">
        <label for="home-score">{{ homeGoals }}</label>
        <div class="splitor w-[8px] h-[4px] bg-black mx-1.5"></div>
        <label for="away-score">{{ awayGoals }}</label>
      </div>
      <div class="name-box flex-center">
        <label for="home">{{ awayName }}</label>
      </div>
      <div class="team-logo flex-center">
        <div class="logo away-logo"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useGameFBStore } from '@/store';

defineOptions({
  name: 'CommonLivebar'
});

const gameStore = useGameFBStore();
const { liveStat, base } = storeToRefs(gameStore);

const homeName = computed(() => base.value.homeTeam);
const homeGoals = computed(() => liveStat.value.homeTeamGoals);
const awayName = computed(() => base.value.awayTeam);
const awayGoals = computed(() => liveStat.value.awayTeamGoals);

onMounted(() => {
  // emmitter.on(FootballEmitType.FBLiveBase, updateLiveBase);
  // emmitter.on(FootballEmitType.FBLiveStatics, updateLiveStatics);
});
onUnmounted(() => {
  // emmitter.off(FootballEmitType.FBLiveBase, updateLiveBase);
  // emmitter.off(FootballEmitType.FBLiveStatics, updateLiveStatics);
});
</script>
<style scoped lang="scss">
$commbar-width: 360px;
$scores-width: auto;
$name-base: 90px;
$logo-size: 32px;

.common-livebar {
  padding: 0;
  margin: 0;
  position: relative;
  width: auto;
  overflow: hidden;
  box-sizing: border-box;
  background: transparent;
  font-family: 'D-DIN';

  :deep(label) {
    text-wrap: nowrap;
  }

  .box-bg {
    background-image: linear-gradient(
      to right,
      rgba(#50cc7f, 0.85) 0%,
      rgba(#f5d100, 0.65) 100%
    );
    background-color: rgb(118, 218, 255);
  }

  .label-box {
    background: rgba(#060c21, 0.75);
    color: #ffffff;
  }

  &-wrap {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    padding: 4px 6px;
    min-width: $commbar-width;
    // background: rgba(#060c21, 0.85);
    color: #fff;

    overflow: hidden;

    &::after,
    &::before {
      content: '';
      position: absolute;
    }

    & > div:not(:first-child) {
      margin-left: 3px;
    }

    .name-box {
      // @extend .label-box;
      @extend .box-bg;
      flex: 1 0 $name-base;
      letter-spacing: 0.1em;
      font-weight: 500;
      font-size: 1.275rem;
      line-height: 1.5rem;

      label {
        text-shadow: 0px 0px 40px rgba(255, 255, 255, 0.7);
        white-space: nowrap;
      }
    }

    .scores-box {
      flex: 0 0 $scores-width;
      align-items: center;
      color: rgba(#060c21, 0.85);
      background-color: rgba(255, 255, 255, 0.55);
      label {
        font-size: 1.45rem;
        line-height: 1.5rem;
        font-weight: 600;
      }
    }

    .team-logo {
      @extend .box-bg;
      padding: 0px 12px;
      flex: 0 0 auto;
      & > .logo {
        width: $logo-size;
        height: $logo-size;

        &.home-logo {
          background: url('/logos/home-logo.png') no-repeat;
          background-size: cover;
        }

        &.away-logo {
          background: url('/logos/away-logo.png') no-repeat;
          background-size: cover;
        }
      }
    }
  }
}

@keyframes livebarRote {
  from {
    transform: rotateZ(0);
  }

  to {
    transform: rotateZ(360deg);
  }
}
</style>
