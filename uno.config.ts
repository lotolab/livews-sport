import {
  defineConfig,
  presetTypography,
  presetWind3,
  presetWebFonts,
  presetIcons
} from 'unocss';

import fs from 'fs';
import presetRemToPx from '@unocss/preset-rem-to-px';

import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';

// 本地SVG图标目录
const iconsDir = './src/assets/svg';

// 读取本地 SVG 目录，自动生成 safelist
const generateSafeList = () => {
  try {
    return fs
      .readdirSync(iconsDir)
      .filter((file) => file.endsWith('.svg'))
      .map((file) => `i-svg:${file.replace('.svg', '')}`);
  } catch (error) {
    console.error('无法读取图标目录:', error);
    return [];
  }
};

export default defineConfig({
  theme: {
    colors: {
      // TODO
    },
    breakpoints: Object.fromEntries(
      [640, 768, 1024, 1280, 1536, 1920, 2560].map((size, index) => [
        ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'][index],
        `${size}px`
      ])
    )
  },
  presets: [
    presetWind3(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        //...
      }
    }),

    presetIcons({
      prefix: ['i-'],
      extraProperties: {
        display: 'inline-block',
        width: '1.2em',
        height: '1.2em',
        'vertical-align': '-0.15em'
      },
      collections: {
        // svg 是图标集合名称，使用 `i-svg:图标名` 调用
        svg: FileSystemIconLoader(iconsDir, (svg) => {
          // 如果 `fill` 没有定义，则添加 `fill="currentColor"`
          return svg.includes('fill="')
            ? svg
            : svg.replace(/^<svg /, '<svg fill="currentColor" ');
        }),
        mdi: () => import('@iconify-json/mdi/icons.json').then((i) => i.default)
      }
    }),
    presetRemToPx()
  ],
  rules: [],
  safelist: generateSafeList(),
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex justify-center items-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'flex-x-start': 'flex items-center justify-start',
    'flex-x-between': 'flex items-center justify-between',
    'flex-x-end': 'flex items-center justify-end'
  }
});
