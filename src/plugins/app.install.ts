import type { App } from 'vue';
import { setupElIcons } from './element-plus';

export default {
  install(app: App) {
    setupElIcons(app);
  }
};
