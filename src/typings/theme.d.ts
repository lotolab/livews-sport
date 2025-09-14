/* eslint-disable */
// @ts-nocheck
declare global {
  type LayoutMode = 'defaults' | 'authen' | string;
  type ThemeMode = 'dark' | 'light' | '';

  interface ThemeSetting {
    layout: LayoutMode;
    showWatermark: boolean;
    watermarkContent: string;
    themeMode: ThemeMode;
    [k: string]: any;
  }

  interface AppInfo {
    name: string;
    author: string;
    [k: string]: any;
  }
}

export {};
