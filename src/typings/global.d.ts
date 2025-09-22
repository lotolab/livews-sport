/* eslint-disable */
// @ts-nocheck
declare global {
  interface APP_INFO {
    title: string;
    name: string;
    version: string;
    author: string;
    watermarkContent: string;
    [k: string]: any;
  }

  interface Window {
    __APP_INFO__: APP_INFO;
    wsConfig: {
      readonly wsURL: string;
      readonly topic?: string;
      readonly gameid: string;
      [k: string]: any;
    };
  }

  type SelectionItem = {
    id?: string | number;
    label: string;
    value: string | number;
    extra?: any;
    [k: string]: any;
  };
}

export {};
