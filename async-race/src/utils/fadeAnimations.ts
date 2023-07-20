import '@components/loader/loader.scss';

export type Callback<T> = (data?: T) => void;
export const fadeIn = (
  element: HTMLElement,
  timeout: number,
  callback?: Callback<HTMLElement>
): void => {
  setTimeout(() => {
    if (callback) {
      callback();
    }
    element.style.opacity = `1`;
    element.style.transition = `opacity ${timeout}ms cubic-bezier(0.86, 0, 0.07, 1)`;
  }, timeout);
};

export const fadeOut = (element: HTMLElement, timeout: number): void => {
  console.log('fadeOut');
  element.textContent = ``;
  element.style.opacity = `0`;
  element.style.transition = `opacity ${timeout}ms cubic-bezier(0.86, 0, 0.07, 1)`;
};
