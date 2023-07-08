import { StyleAttributes } from './dom-types';

export type ComponentAttributes = {
  [key: string]:
    | string
    | number
    | boolean
    | undefined
    | null
    | StyleAttributes
    | EventListenerOrEventListenerObject;
};
