/* eslint-disable @typescript-eslint/explicit-function-return-type */
export function Observable<T extends Record<string | symbol, unknown>>(
  object: T,
  notify: (stateProp: keyof T) => void
) {
  return new Proxy(object, {
    set(target: T, property: keyof T, value: T[keyof T]) {
      if (target[property] === value) {
        return true;
      }
      target[property] = value;

      notify(property);
      return true;
    }
  });
}
