# Env

## env

```env
# Common public Environments
VITE_GLOB_APP_NAME=liveui-sport
BASE_URL=
VITE_BASE_API=/api
VITE_APP_FOOTER_CONENT=
VITE_VERIFY_ENABLE=false
VITE_SERVICE_MOCK_ENABLED= false
VITE_APP_TITLE= '直播設置中心'

#
VITE_APP_SHOW_WATERMARK=true
VITE_APP_WATERMARK_CONTENT='老頭魚直播插件'
```

## env.development

```env
# DEV envs
VITE_PORT=8945

# Service Proxy
VITE_BASE_API='/api'
VITE_SERVICE_PROXY_TARGET='http://127.0.0.1:19865/v1'

# WS Proxy
VITE_WS_BASE='/wsapi
VITE_WS_PROXY_TARGET=

```

## .env.production

```env
# Common public Environments
VITE_GLOB_APP_NAME=live-sport
VITE_APP_TITLE= '直播設置中心'

VITE_APP_SHOW_WATERMARK=true
VITE_APP_WATERMARK_CONTENT='老頭魚直播插件'

# watermark
VITE_APP_SHOW_WATERMARK=true
VITE_APP_WATERMARK_CONTENT='老頭魚直播插件系統'

# Build
VITE_BASE_API=api
VITE_BASE_URL=
VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE=false
VITE_BUILD_COMPRESS='gzip,brotli'

# WS Proxy
VITE_WS_BASE='/fb'
```