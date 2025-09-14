# Env Examples

1. env

```Env
VITE_APP_NAME=live-manger
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

2. .env.development

```Env
# DEV envs
VITE_PORT=9528

# Service Proxy
VITE_BASE_API='/api'
VITE_SERVICE_PROXY_TARGET='http://127.0.0.1:19865/v1'
VITE_WS_PROXY_TARGET='ws://192.168.0.12:4321/'

```

3. Production

```Env
VITE_APP_TITLE=
VITE_APP_NAME=
```
