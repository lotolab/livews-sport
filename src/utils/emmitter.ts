import { TinyEmitter } from 'tiny-emitter';

export type EmitterCallback = (...args: any[]) => void;

const instance = new TinyEmitter();

/**
 *
 */
export const emmitter = {
  on: (ev: string, callback: EmitterCallback, ctx?: any) =>
    instance.on(ev, callback, ctx),
  once: (ev: string, callback: EmitterCallback, ctx?: any) =>
    instance.once(ev, callback, ctx),
  emit: (ev: string, ...args: any) => instance.emit(ev, ...args),
  off: (ev: string, callback?: EmitterCallback) => instance.off(ev, callback)
};
