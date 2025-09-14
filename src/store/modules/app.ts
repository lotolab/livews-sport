import { defineStore } from 'pinia';
import { PiniaModuleEnum } from '../store.constants';
import { ref } from 'vue';

export const useAppStore = defineStore(
  PiniaModuleEnum.app,
  () => {
    const appInfo = ref<AppInfo>({
      name: import.meta.env.VITE_APP_NAME,
      author: import.meta.env.VITE_APP_AUTHOR
    });

    return {
      appInfo
    };
  },
  {
    persist: false
  }
);
