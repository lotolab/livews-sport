<template>
  <component :is="layouts[layoutMode]" />
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/store';
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue';

const layouts: any = {
  defaults: defineAsyncComponent(() => import('./main/defaults.vue'))
};

const themeStore = useThemeStore();
const { layoutMode } = storeToRefs(themeStore);
</script>
<style lang="scss" scoped></style>
