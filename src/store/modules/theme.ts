import { defineStore } from 'pinia';
import { PiniaModuleEnum } from '../store.constants';
import { computed, ref } from 'vue';
import type { ScreenSize } from '@/core/types';
import { defaultScreenSize } from '@/core/extends';

const grate = 0.6180339887;
export const useThemeStore = defineStore(
  PiniaModuleEnum.theme,
  () => {
    const themeSettings = ref<ThemeSetting>({
      themeMode: 'light',
      layout: 'defaults',
      showWatermark: Boolean(import.meta.env.VITE_APP_SHOW_WATERMARK),
      watermarkContent: import.meta.env.VITE_APP_WATERMARK_CONTENT || ''
    });

    const screenSize = ref<ScreenSize>({ ...defaultScreenSize });

    const goldenHeight = computed(() =>
      Math.floor(screenSize.value.height * (1 - grate) - 120)
    );
    const goldenWidth = computed(() =>
      Math.floor(screenSize.value.width * (1 - grate) + 100)
    );

    const layoutMode = computed(() => themeSettings.value.layout);

    const themeMode = computed(() => themeSettings.value.themeMode);

    const updateSomeSettings = (some: Partial<ThemeSetting>) => {
      themeSettings.value = Object.assign(themeSettings.value, some);
    };

    return {
      screenSize,
      themeSettings,
      //getters
      layoutMode,
      themeMode,
      goldenHeight,
      goldenWidth,
      //actions
      updateSomeSettings
    };
  },
  {
    persist: [
      {
        pick: ['themeSettings'],
        storage: sessionStorage
      }
    ]
  }
);
