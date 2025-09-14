import { createApp } from 'vue';

import App from './App.vue';
import appInstall from './plugins/app.install';
import { setupRouter } from './router';

import './theme/index.scss';
// Unocss
import 'virtual:uno.css';
import { setupStore } from './store';
import { fbSocket } from './ws';

/**
 * Application endponit
 */
async function bootstrap() {
  const app = createApp(App);

  const store = setupStore(app);
  app.use(appInstall);

  // TODO something before load
  setupRouter(app);

  // Websocket init
  fbSocket.connectFootballSocket(store);
  app.mount('#app', true);
}

void bootstrap();
