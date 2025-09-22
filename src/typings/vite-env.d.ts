/// <reference types="vite/client" />

declare type Recordable<T = any> = Record<string, T>;

interface ImportMetaEnv {
  VITE_PORT: number;
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_AUTHOR: string;
  readonly VITE_APP_SHOW_WATERMARK?: boolean;
  readonly VITE_APP_WATERMARK_CONTENT: string;
  readonly VITE_OWNER_COMPANY: string;
  readonly VITE_OFFICAIL_WEBSITE?: string;
  readonly __APP_INFO__: Recordable;

  /**
   * Http OR ws Proxy
   * VITE_BASE_API : /v1
   * WS will use /v1/ws
   *
   *
   */
  readonly VITE_BASE_API: string;
  readonly VITE_WS_API?: string;
  readonly VITE_SERVICE_PROXY_TARGET: string;
  /**
   * VITE_WS_PROXY_TARGET use VITE_WS_API
   */
  readonly VITE_WS_PROXY_TARGET: string;
  readonly VITE_WS_GAMEID: string;
}

interface ImportEnv {
  readonly env: ImportMetaEnv;
}
