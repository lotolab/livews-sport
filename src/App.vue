<script setup lang="ts">
import zhCnElMessages from 'element-plus/es/locale/lang/zh-cn';
import { useThemeStore } from './store';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const themeStore = useThemeStore();
const { themeMode ,themeSettings} = storeToRefs(themeStore);

const fontColor = computed(() =>
  themeMode.value === 'dark' ? 'rgba(255,255,255, .15)' : 'rgba(0,0,0, .15)'
);
</script>

<template>
  <el-config-provider :locale="zhCnElMessages">
    <el-watermark
      :font="{ color: fontColor }"
      :content="themeSettings.showWaterMark ? themeSettings.watermarkContent : ''"
      :z-index="9999"
      class="wh-full"
    >
      <router-view />
    </el-watermark>
  </el-config-provider>
</template>
