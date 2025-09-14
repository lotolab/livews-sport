import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import type { App } from 'vue';

const pinia = createPinia();
pinia.use(
  createPersistedState({
    key: (id) => `__lttd${id}ccp__`
  })
);

export function setupStore(app: App) {
  app.use(pinia);

  return pinia;
}

export default pinia;
