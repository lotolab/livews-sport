import { defineConfig, loadEnv, type ConfigEnv, type UserConfig } from 'vite';

import { Logger, wrapperEnv } from './build/utils';
import { setupVitePlugins } from './build/vite/plugins';
import { fileURLToPath } from 'node:url';

// https://vite.dev/config/
export default defineConfig((userConfig: ConfigEnv): UserConfig => {
  const { command, mode } = userConfig;
  const isBuild = command === 'build';

  const viteEnv = loadEnv(mode, process.cwd()) as unknown as ImportMetaEnv;

  const env = wrapperEnv(viteEnv);
  Logger.log('Load ENV :', isBuild, env);

  const port = env.VITE_PORT ?? 9527;
  const apiPrefixPath = env.VITE_BASE_API ?? '/';
  // const proxyTarget = env.VITE_SERVICE_PROXY_TARGET ?? '';

  // const proxies: Array<ProxyOptions & { key: string }> = [
  //   {
  //     key: `^${defaultApi}`,
  //     target: proxyTarget,
  //     ws: true,
  //     changeOrigin: true,
  //     rewrite: (p: string) => {
  //       return p.replace(new RegExp(`^${defaultApi}`), '');
  //     }
  //   }
  // ];

  // const wsTarget = env.VITE_WS_PROXY_TARGET;
  // if (wsTarget?.length) {
  //   const key = env.VITE_WS_BASE || '/wsapi';

  //   proxies.unshift({
  //     key: `^${key}`,
  //     target: wsTarget,
  //     changeOrigin: true,
  //     ws: true,
  //     rewrite: (p: string) => {
  //       return p.replace(new RegExp(`^${key}`), '');
  //     }
  //   });
  // }

  return {
    css: {
      preprocessorOptions: {
        scss: {
          // api: 'modern-compiler', vite7 removed
          additionalData: `@use "@/theme/variables.scss" as *;`
        }
      }
    },
    esbuild: {},
    plugins: setupVitePlugins(env, isBuild),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '0.0.0.0',
      port: port,
      open: false,
      hmr: { overlay: false },
      proxy: {
        // WS
        '/socket.io': {
          target: 'http://127.0.0.1:8818', //env.VITE_WS_PROXY_TARGET,
          changeOrigin: true,
          secure: false,
          ws: true,
          rewriteWsOrigin: true
          // rewrite: (p) => {
          //   // globalThis.console.log(p);
          //   return p.replace(/^\/socket.io/, '');
          // }
        },
        [`^${apiPrefixPath}`]: {
          target: env.VITE_SERVICE_PROXY_TARGET,
          changeOrigin: true,
          ws: true,
          rewrite: (p) => {
            console.log(p);
            return p.replace(new RegExp(`^${apiPrefixPath}`), '');
          }
        }
      }
    }
  };
});
