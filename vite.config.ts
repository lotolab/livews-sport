import {
  defineConfig,
  loadEnv,
  type ConfigEnv,
  type ProxyOptions,
  type UserConfig
} from 'vite';

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
  const defaultApi = env.VITE_BASE_API ?? '/';
  const proxyTarget = env.VITE_SERVICE_PROXY_TARGET ?? '';

  const proxies: Array<ProxyOptions & { key: string }> = [
    {
      key: `^${defaultApi}`,
      target: proxyTarget,
      ws: true,
      changeOrigin: true,
      rewrite: (p: string) => {
        return p.replace(new RegExp(`^${defaultApi}`), '');
      }
    }
  ];

  const wsTarget = env.VITE_WS_PROXY_TARGET;
  if (wsTarget?.length) {
    const key = import.meta.env.VITE_WS_BASE || '/wsapi';

    proxies.unshift({
      key: `^${key}`,
      target: wsTarget,
      changeOrigin: true,
      ws: true,
      rewrite: (p: string) => {
        return p.replace(new RegExp(`^${key}`), '');
      }
    });
  }

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
      proxy: proxies.reduce(
        (prev, curr) => {
          const { key, ...rest } = curr;
          if (prev[key]) {
            return prev;
          }
          prev[key] = rest;
          return prev;
        },
        {} as Record<string, string | ProxyOptions>
      )
    }
  };
});
