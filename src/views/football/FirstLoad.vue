<template>
  <div class="firstload wh-100">
    <div
      class="firstload-middle-box"
      :style="{
        height: `${goldenHeight}px`,
        width: `${goldenWidth}px`
      }"
    >
      <div
        class="row-game pb-2 pt-1 px-4 text-7.5 flex justify-left items-center space-x-2"
      >
        <div class="game-logo">
          <i class="i-svg:goal"></i>
        </div>
        <span>江蘇文旅群眾娛樂賽</span>
        <span>第27輪</span>
      </div>
      <div class="row-logo"></div>
      <div class="row-team flex-x-center items-center">
        <div class="home-team flex-1 text-center">
          <label for="home" class="team-name">{{ homeName }}</label>
        </div>
        <div class="mid-vs px-10 flex-0">
          <img
            :src="vsLogo"
            :style="{
              width: '115px'
            }"
          />
        </div>
        <div class="away-team flex-1 text-center">
          <label for="away" class="team-name">{{ awayName }}</label>
        </div>
      </div>
      <div class="row-scores flex justify-evenly items-center">
        <span class="scores home-scores">{{ homeGoals }}</span>
        <span class="scores scores-splitor w-[100px] text-center">:</span>
        <span class="scores away-scores">{{ awayGoals }}</span>
      </div>

      <div ref="footerRef" class="footer-container flex justify-start">
        <div class="football-box football-font">
          <i class="i-svg:football football"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useGameFBStore, useThemeStore } from '@/store';
import vsLogo from '@/assets/img/vs-logo.png';

import gsap from 'gsap';

const tl = gsap.timeline({ repeat: -1 });
const footerRef = ref<HTMLDivElement>();

const themeStore = useThemeStore();
const gameFBStore = useGameFBStore();
const { homeName, homeGoals, awayName, awayGoals } = storeToRefs(gameFBStore);
const { goldenHeight, goldenWidth } = storeToRefs(themeStore);

function moveLeft() {
  let start = 400;
  // padding-x  football width 2.25rem
  const px2 = 8 + 36;

  if (footerRef.value?.getBoundingClientRect()?.width) {
    start = footerRef.value.getBoundingClientRect().width - px2;
  }

  tl.fromTo(
    '.football-box',
    { duration: 1000, x: start },
    { duration: 20, x: -10 },
    '-=0.05'
  );
}

onMounted(() => {
  nextTick(() => {
    moveLeft();
  });
});
</script>
<style scoped lang="scss">
.firstload {
  font-family: 'D-DIN';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 99;

  display: flex;
  justify-content: center;
  align-items: center;

  &-middle-box {
    position: relative;
    // border: 1px solid red;
    padding: 20px 32px;
    display: block;
    box-sizing: border-box;
    background: rgba(#060c21, 0.35);
    color: #ffffff;
    // opacity: 0.9;

    $borderOffset: -8px;

    /*一个溢出的盒子作为边框，添加背景后形成光源效果*/
    &::before {
      content: '';
      position: absolute;
      top: $borderOffset;
      left: $borderOffset;
      right: $borderOffset;
      bottom: $borderOffset;
      background: #ffffff;
      z-index: -1;
      border-radius: 12px;
    }
    /*另一个溢出的盒子，模糊形成光晕效果*/
    &::after {
      content: '';
      position: absolute;
      top: $borderOffset;
      left: $borderOffset;
      right: $borderOffset;
      bottom: $borderOffset;
      background: #ffffff;
      z-index: -2;
      filter: blur(80px);
      border-radius: 6px;
    }

    &::after,
    &::before {
      /*三色渐变，中间为背景色，融入背景*/
      background: linear-gradient(235deg, #89ff00, #060c21, #00bcd4);
      opacity: 0.65;
    }
  }

  :deep(label.team-name) {
    line-height: 4rem;
    font-size: 3.75rem;
    letter-spacing: 0.15em;
    font-weight: 400;
    font-family: D-DIN;
    text-shadow: 0px 0px 40px rgba(255, 255, 255, 0.7);
    white-space: nowrap;
  }

  :deep(span.scores) {
    line-height: 2.8rem;
    font-size: 2.75rem;
    font-weight: 800;
    text-shadow: 0px 0px 32px rgba(255, 255, 255, 0.85);
  }

  div.footer-container {
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    bottom: -5px;
    padding: 0 8px 1px 8px;

    i.football {
      width: 2.45em;
      height: 2.45em;
      transform: rotate(0);
      animation: rorate 2s linear infinite;
    }
  }
}

@keyframes rorate {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate3d(45deg, 15deg, 8deg);
  }
}
</style>
