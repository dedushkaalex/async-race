// import { Store } from '@core/Store/store';
import { BaseComponent } from '@core/base-component';

import { Header } from './header/header';
import { Pagination } from './pagination/pagination';

export class Layout {
  // public store = Store.getInstance();
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
    const paginationComponent = new Pagination().node;
    this.node.append(
      headerComponent,
      this.layoutNode.node,
      paginationComponent
    );
    this.createLayoutNodeContent();

    return this.node;
  }

  public createLayoutNodeContent(): void {
    this.layoutNode.append(this.children);
  }
}
