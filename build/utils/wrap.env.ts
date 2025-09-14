import pkg from '../../package.json'

export function wrapperEnv(envConf: Recordable): ImportMetaEnv {
  const appInfo : APP_INFO = {
    title: envConf.VITE_APP_TITLE || pkg.name,
    name: envConf.VITE_APP_NAME || pkg.name,
    version:  pkg.version,
    author: envConf.VITE_APP_AUTHOR || pkg.author,
    watermarkContent:'老頭魚',
  }
  const ret: Recordable = {
    VITE_BUILD_COMPRESS: 'none',
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: false,
    VITE_APP_SHOW_WATERMARK:true,
    VITE_APP_WATERMARK_CONTENT:'老頭魚',
    VITE_OWNER_COMPANY: 'lotolab',
    VITE_OFFICAIL_WEBSITE: 'https://www.lotolab.com',
  };



  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName];
    if (typeof realName === 'string') {
      realName = (realName as string).replace(/\\n/g, '\n');
      realName =
        realName === 'true' ? true : realName === 'false' ? false : realName;
    }

    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }

    ret[envName] = realName;

    if (envName !== 'VITE_PROXY') {
      process.env[envName] = realName;
    }
  }


  ret.__APP_INFO__ = appInfo

  return ret as unknown as ImportMetaEnv;
}
