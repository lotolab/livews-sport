import { defaultRightTopTime } from '@/core/extends';
import { PiniaModuleEnum } from '../store.constants';
import {
  deepConvertPixel,
  mergeToolkitSetting,
  type ToolkitSetting
} from '@lotolab/live-common';

/**
 *
 */
export const useToolkitsStore = defineStore(
  PiniaModuleEnum.toolkits,
  () => {
    const rtTimeBox = ref<ToolkitSetting>({
      ...defaultRightTopTime
    });
    const rttBoxStyles = computed(() => {
      const { show, cssProperties = {} } = rtTimeBox.value;
      let css = deepConvertPixel(cssProperties);
      return {
        ...css,
        opacity: show ? 1 : 0
      };
    });

    // actions
    const updateBoxSettings = (
      boxName: string,
      some: Partial<ToolkitSetting>
    ) => {
      switch (boxName) {
        case 'rtTimeBox':
          rtTimeBox.value = mergeToolkitSetting(some, rtTimeBox.value);
          break;
        default:
          throw new Error(`boxName unsupportted!`);
      }
    };

    return {
      //computed
      rttBoxStyles,
      //actions
      updateBoxSettings
    };
  },
  {
    persist: []
  }
);
