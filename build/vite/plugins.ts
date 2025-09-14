import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { configCompressPlugin } from './compress.plugin';
import UnoCSS from 'unocss/vite';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export function setupVitePlugins(
  env: ImportMetaEnv,
  isBuild?: boolean
): PluginOption[] {
  const vitePlugins: PluginOption[] = [
    // Required
    vue(),
    vueJsx(),
    UnoCSS({
      configFile:path.resolve(process.cwd(),'unocss.config.ts')
    }),
    AutoImport({
      // 导入 Vue 函数，如：ref, reactive, toRef 等
      imports: ['vue', '@vueuse/core', 'pinia', 'vue-router', 'vue-i18n'],
      resolvers: [
        // 导入 Element Plus函数，如：ElMessage, ElMessageBox 等
        ElementPlusResolver({ importStyle: 'sass' })
      ],
      eslintrc: {
        enabled: !isBuild,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      vueTemplate: true,
      // 导入函数类型声明文件路径 (false:关闭自动生成)
      dts: isBuild ? false : 'auto-imports.d.ts'
    }),
        // 组件自动导入
    Components({
      resolvers: [
        // 导入 Element Plus 组件
        ElementPlusResolver({ importStyle: 'sass' })
      ],
      // 指定自定义组件位置(默认:src/components)
      dirs: ['src/components', 'src/ui'],
      // 导入组件类型声明文件路径 (false:关闭自动生成)
      // dts: isProduction ? false : true,
      dts: isBuild ? false : 'components.d.ts'
    }),
  ];

  if (isBuild) {
    // build will build compress
    const {
      VITE_BUILD_COMPRESS = 'none',
      VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
    } = env;
    vitePlugins.push(
      configCompressPlugin(
        VITE_BUILD_COMPRESS,
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      )
    );
  }

  return vitePlugins.filter((p) => p !== null);
}
