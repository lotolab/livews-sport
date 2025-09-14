import pinia from '../store';
import { PiniaModuleEnum } from '../store.constants';

interface ErrorLog {
  type?: string;
  ts: string;
  gameid: string;
  message: string;
  err?: any;
}
export const useErrlog = defineStore(
  PiniaModuleEnum.errlog,
  () => {
    const max = 10;
    const logs = ref<ErrorLog[]>([]);

    const addLog = (log: Omit<ErrorLog, 'ts'>) => {
      if (logs.value.length >= max) {
        logs.value.pop();
      }

      logs.value.unshift({ ...log, ts: new Date().toLocaleString() });
    };

    const cleanAll = () => {
      logs.value.splice(0, logs.value.length);
    };

    return {
      logs,
      addLog,
      cleanAll
    };
  },
  {
    persist: []
  }
);

export function useErrlogHook() {
  return useErrlog(pinia);
}
