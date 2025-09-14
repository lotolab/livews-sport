import chalk from 'chalk';

export class Logger {
  static log(prefix: string = '', ...data: any[]) {
    globalThis.console.log(`${chalk.cyan([`${prefix}`])}`, ...data);
  }

  static debug(...data: any[]) {
    globalThis.console.error(...data);
  }
}