import './expandGlobal.mjs';
import process from 'node:process';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { execSync } from 'node:child_process';
import chalk from 'chalk';
import fse from 'fs-extra';
import { format } from 'date-fns';
import AdmZip from 'adm-zip';

const COMMANDS = {
  build: 'pnpm build',
  gitHash: 'git rev-parse --short HEAD',
  gitBranch: 'git rev-parse --abbrev-ref HEAD'
};

const releaseName = 'liveui-sport';
let envConfig = {
  license: 'BSD 3-Clause License',
  WSP_ROOT: process.cwd(),
  DISTZIP_BASE: path.resolve(process.cwd(), 'dist-zip'),
  BUILD_DIST: path.resolve(process.cwd(), 'dist'),
  releaseLog: path.resolve(process.cwd(), 'dist-zip', 'RELEASE_LOG.md')
};

main()
  .then((file) => {
    console.log('✨✨✨✨' + chalk.greenBright(`打包完成......\n\t${file}`));
    console.log('✨✨✨✨');
  })
  .catch((err) => console.error(err));

async function main() {
  envConfig = await prepareEnvConfig();
  await applicationBuilding(envConfig);

  const zipfile = await buildReleaseZip(envConfig);
  await writeBuildLog(zipfile);

  //copy latest
  const releaseLatest = path.resolve(
    envConfig.DISTZIP_BASE,
    `${releaseName}.latest.zip`
  );
  await fse.copyFileSync(zipfile, releaseLatest);
  return zipfile;
}

function applicationBuilding(envConfig) {
  console.log(chalk.blueBright(`开始编译 :${envConfig.appName}`));
  const ret = execSync(COMMANDS.build, { stdio: 'inherit', encoding: 'utf-8' });
  if (ret) {
    throw new Error(`${envConfig.appName} 编译失败`, { cause: ret });
  }
  console.log(chalk.greenBright(`${envConfig.appName} 编译完成.`));
}

function prepareEnvConfig() {
  const pkgJson = globalThis.loadJSON('../../package.json', import.meta.url);
  const buildTime = new Date();

  const { name = 'Liveui-Sport', author, version } = pkgJson;
  const { DISTZIP_BASE, releaseLog, license } = envConfig;

  const branch = execSync(COMMANDS.gitBranch).toString().trim();
  const hash = execSync(COMMANDS.gitHash).toString().trim();

  if (!fse.existsSync(DISTZIP_BASE)) {
    fse.ensureDirSync(DISTZIP_BASE);
    fse.writeFileSync(
      path.resolve(DISTZIP_BASE, '.gitkeep'),
      `# gitkeep \n dist-zip`,
      { encoding: 'utf-8' }
    );
  }

  if (!fse.existsSync(releaseLog)) {
    fse.writeFileSync(
      releaseLog,
      `# ${name.toUpperCase()}\n\n> ${license} ${author}\n`,
      { encoding: 'utf-8' }
    );
  }

  return {
    ...envConfig,
    buildTime,
    appName: name,
    appVersion: version,
    appAuthor: author,
    branch,
    hash,
    releaseProdName: `${name}_${format(buildTime, 'MMdd')}_${hash}`
  };
}

function buildReleaseZip(envConfig) {
  const {
    appName,
    branch,
    hash,
    buildTime,
    appVersion,
    releaseProdName,
    DISTZIP_BASE,
    BUILD_DIST
  } = envConfig;
  console.log(chalk.blueBright(`開始打包...`));

  fse.writeFileSync(
    path.resolve(BUILD_DIST, `${appName}.txt`),
    `# ${appName.toUpperCase()}\n\tBuildTime: ${format(buildTime, 'yyyy-MM-dd HH:mm:ss')}\n\tVersion: ${appVersion}\n\tBuildTag: ${hash} [${branch}]\n`,
    { encoding: 'utf-8' }
  );

  const zipfile = path.resolve(DISTZIP_BASE, `${releaseProdName}.zip`);
  const zip = new AdmZip();
  zip.addLocalFolder(BUILD_DIST);

  zip.writeZip(zipfile);

  console.log(chalk.greenBright(`打包完成...`));

  return zipfile;
}

function writeBuildLog(zipfile) {
  const {
    releaseLog,
    appName,
    appVersion,
    buildTime,
    license,
    appAuthor,
    branch,
    hash
  } = envConfig;

  const log = fse.readFileSync(releaseLog, { encoding: 'utf-8' });
  let lines = log.split('\n');

  if (lines.length > 3) lines = lines.slice(3);

  const ts = format(buildTime, 'yyyy-MM-dd HH:mm:ss');
  const versionContent = `# ${appName.toUpperCase()}

> ${license} ${appAuthor}

## Version ${appVersion} - ${ts}

- ${path.parse(zipfile).name}
- Branch: ${branch}[ ${hash} ]

----
`;

  console.log(chalk.greenBright(`記錄打包日誌...`));
  fse.writeFileSync(releaseLog, versionContent + lines.join('\n'), {
    encoding: 'utf-8'
  });
}
