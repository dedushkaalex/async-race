import { BaseComponent } from '@core/base-component/BaseComponent';

import { Header } from './header/header.component';

export class Layout {
  public children: BaseComponent<keyof HTMLElementTagNameMap>;
  public layoutNode: BaseComponent<'main'>;
  public node: DocumentFragment;

  constructor(children: BaseComponent<keyof HTMLElementTagNameMap>) {
    this.children = children;
    this.layoutNode = new BaseComponent<'main'>({
      tagName: 'main'
    });
    this.node = document.createDocumentFragment();
  }
  public render(): DocumentFragment {
    const headerComponent = new Header().node;
    this.node.append(headerComponent, this.layoutNode.node);
    this.createLayoutNodeContent();

    return this.node;
  }

  public createLayoutNodeContent(): void {
    this.layoutNode.append(this.children);
  }
}
