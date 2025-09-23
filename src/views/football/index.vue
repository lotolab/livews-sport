<template>
  <div class="fb-index">
    <div class="lt-container">
      <common-livebar />
    </div>
    <!-- First load card info -->
    <first-load-card />
    <ptr-box />
  </div>
</template>

<script lang="ts" setup>
import { PtrBox } from './toolkits/index';

const FirstLoadCard = defineAsyncComponent(() => import('./FirstLoad.vue'));
const CommonLivebar = defineAsyncComponent(
  () => import('./widgets/CommonLivebar.vue')
);
</script>
<style lang="scss">
.fb-index {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0px;
  margin: 0px;
  background: transparent;
  position: relative;

  .lt-container {
    position: absolute;
    z-index: 100;
    background: transparent;
  }
}
</style>
