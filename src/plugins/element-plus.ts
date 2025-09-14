import type { App } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const translateKey = (camel: string = '') => {
  const s = camel.replace(/([A-Z])/g, '-$1').toLowerCase();

  return s.startsWith('-') ? s.slice(1) : s;
};

// 注册所有图标
export function setupElIcons(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
    // 兼容性
    app.component(`ein-${translateKey(key)}`, component);
  }
}
