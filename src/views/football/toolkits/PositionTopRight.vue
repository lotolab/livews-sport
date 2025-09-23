<template>
  <div class="toolkit-container ptr" :style="rttBoxStyles">
    <div class="time-box" :style="{ height: `${scopeState.logoH + 6}px` }">
      <span class="timer">{{ timeText }}</span>
    </div>

    <BroadcasterLogo
      :logo-width="scopeState.logoW"
      :logo-height="scopeState.logoH"
      name="泰州电视台"
      :show-type="1"
      :logo="scopeState.logo"
    />
  </div>
</template>
<script lang="ts" setup>
import BroadcasterLogo from '../components/BroadcasterLogo.vue';

import { useToolkitsStore } from '@/store';

const scopeState = {
  logoW: 32,
  logoH: 32,
  logo: '/logos/tv_taizhou_logo.png'
};

const timeText = ref<string>('00:00');

const toolkitsStore = useToolkitsStore();

const { rttBoxStyles } = storeToRefs(toolkitsStore);

// Some Logic code
</script>
<style scoped lang="scss">
.toolkit-container {
  float: right;
  // border: 1px solid red;
  display: flex;
  gap: 4px;
  overflow: hidden;
  align-items: stretch;
  // background: rgba(0, 0, 0, 0.05);

  position: absolute;
  z-index: 101;

  &.ptr {
    right: 0px;
    top: 0px;
  }

  .time-box {
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > div {
      width: 100%;
    }

    span.timer {
      font-weight: 600;
      font-size: 16px;
      letter-spacing: 0.15em;
    }
  }
}
</style>
