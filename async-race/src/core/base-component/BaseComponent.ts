type Props<T extends keyof HTMLElementTagNameMap> = {
  tagName?: T;
  classList?: string[];
  textContent?: string;
  children?: BaseComponent<keyof HTMLElementTagNameMap>[];
};

export class BaseComponent<T extends keyof HTMLElementTagNameMap = 'div'> {
  public readonly node: HTMLElementTagNameMap[T];
  constructor({
    tagName,
    classList = [],
    textContent = '',
    children = []
  }: Props<T>) {
    this.node = document.createElement(
      tagName ?? 'div'
    ) as HTMLElementTagNameMap[T];
    this.node.classList.add(...classList);
    this.node.textContent = textContent;
    if (children.length) {
      this.append(...children);
    }
  }

  public append<U extends keyof HTMLElementTagNameMap>(
    ...children: Array<BaseComponent<U>>
  ): void {
    this.node.append(...children.map((component) => component.node));
  }

  public addClass(className: string): void {
    this.node.classList.add(className);
  }

  public removeClass(className: string): void {
    this.node.classList.remove(className);
  }

  public destroy(): void {
    this.node.remove();
  }

  public addTextContent(text: string): void {
    this.node.textContent = text;
  }

  public setAttribute(attribute: string, value: string): void {
    this.node.setAttribute(attribute, value);
  }

  public removeAttribute(attribute: string): void {
    this.node.removeAttribute(attribute);
  }

  public toggleClass(className: string): void {
    this.node.classList.toggle(className);
  }

  public addListener(
    event: string,
    listener: (e: Event) => void,
    options: AddEventListenerOptions | boolean = false
  ): void {
    this.node.addEventListener(event, listener, options);
  }

  public clear(el: BaseComponent): void {
    el.node.textContent = '';
  }

  public destroyChildren(): void {
    [...this.node.children].forEach((el) => {
      el.remove();
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public static clearContent<T extends keyof HTMLElementTagNameMap>(
    el: BaseComponent<T>
  ): void {
    el.node.textContent = '';
  }
}
