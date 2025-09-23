#!/bin/bash 
basepath=$(cd `dirname $0`;pwd);
workspace=$(cd `dirname $0`;cd ..;pwd);

PROD_WSP=$(cd `dirname $0`;cd ../../livews-prod;pwd);

RELEASE_ZIP_NAME=liveui-sport.latest.zip

node ${basepath}/scripts/dist-zip.mjs

RELEASE_ZIP=${workspace}/dist-zip/${RELEASE_ZIP_NAME}

if [ ! -f "${RELEASE_ZIP}" ]; then
  echo -e "\033[31m${RELEASE_ZIP} not found,please build first. \033[0m"
  exit 1
else 

  echo -e "\033[31mCopy ${RELEASE_ZIP_NAME} TO \033[35m[${PROD_WSP}/packages]\033[0m"
  cp -rf ${RELEASE_ZIP} ${PROD_WSP}/packages/${RELEASE_ZIP_NAME}
  exit 0
fi

