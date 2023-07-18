/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
declare module '*.css';
declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '@screens';
declare interface PromiseConstructor {
  allSettled(
    promises: Array<Promise<any>>
  ): Promise<
    Array<{ status: 'fulfilled' | 'rejected'; value?: any; reason?: any }>
  >;
}
