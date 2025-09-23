<template>
  <div
    class="broadcaster-logo"
    :style="{ minHeight: `calc(${logoStyle.height} + 22px)` }"
  >
    <div v-if="showType === 1 || showType > 2" class="logo">
      <img :src="imgSrc" :style="logoStyle" />
    </div>
    <div v-if="showType > 1" class="broacaster-name">
      <span>{{ name }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import defultImg from '@/assets/logos/loto1999-logo.png';
const props = defineProps({
  showType: {
    // 1:show logo,
    type: Number,
    default: 1
  },
  logoWidth: {
    type: [Number, String],
    default: '60'
  },
  logoHeight: {
    type: [Number, String],
    default: '60'
  },
  name: {
    type: String,
    default: ''
  },
  logo: {
    type: String,
    required: false
  }
});

const logoStyle = computed(() => {
  return {
    width: /^[\d]+(\.[\d]+)?/.test(props.logoWidth + '')
      ? `${props.logoWidth}px`
      : props.logoWidth,
    height: /^[\d]+(\.[\d]+)?/.test(props.logoHeight + '')
      ? `${props.logoHeight}px`
      : props.logoHeight
  };
});

const imgSrc = computed(() => props.logo || defultImg);
</script>
<style scoped lang="scss">
.broadcaster-logo {
  font-family: 'D-DIN';
  display: 'inline-flex';
  .logo {
    text-align: center;
    justify-content: center;
  }

  .broacaster-name {
    font-family: 'D-DIN';
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0px;
    right: 0;
    font-size: 12px;
    letter-spacing: 0.15em;
  }
}
</style>
