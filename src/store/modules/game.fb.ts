import type { FBGameLiveBase, FBGameLiveStatistics } from '@/core/types';
import { PiniaModuleEnum } from '../store.constants';
import { initBase, initStat } from '@/core/extends';
import pinia from '../store';

/**
 *
 */
export const useGameFBStore = defineStore(
  PiniaModuleEnum.football,
  () => {
    const clientId = ref<string>('');
    const base = ref<FBGameLiveBase>({ ...initBase });

    const homeName = computed(() => base.value.homeTeam);
    const awayName = computed(() => base.value.awayTeam);

    const liveStat = ref<FBGameLiveStatistics>({ ...initStat });

    const updateLiveBase = (some: Partial<FBGameLiveBase>) => {
      base.value = {
        ...base.value,
        ...some
      };
    };

    const homeGoals = computed(() => liveStat.value.homeTeamGoals);
    const awayGoals = computed(() => liveStat.value.awayTeamGoals);

    const updateLiveStat = (some: Partial<FBGameLiveStatistics>) => {
      liveStat.value = {
        ...liveStat.value,
        ...some
      };
    };

    return {
      clientId,
      base,
      liveStat,
      // getters
      homeName,
      awayName,
      homeGoals,
      awayGoals,
      // actions
      updateLiveBase,
      updateLiveStat
    };
  },
  {
    persist: [
      {
        pick: ['base', 'liveStat'],
        storage: sessionStorage
      }
    ]
  }
);

export function useGameFBStoreHook() {
  return useGameFBStore(pinia);
}
