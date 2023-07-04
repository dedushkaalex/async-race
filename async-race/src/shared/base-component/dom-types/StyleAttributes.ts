export type RemoveIndex<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
    ? never
    : K]: T[K];
};
// eslint-disable-next-line @typescript-eslint/ban-types
export type ExcludeMethods<T> = Pick<
  T,
  { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]
>;
export type StyleAttributes = Partial<
  ExcludeMethods<
    RemoveIndex<Omit<CSSStyleDeclaration, 'length' | 'parentRule'>>
  >
>;
