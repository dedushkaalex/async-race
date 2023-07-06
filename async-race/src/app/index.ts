import '@shared/UIKit/style.scss';
import { GaragePage } from 'pages/Garage/Garage';

export class App {
  public GaragePage = new GaragePage();
  public readonly node = document.createDocumentFragment();
  constructor() {
    this.node.append(this.GaragePage.node);
  }

  public render(): DocumentFragment {
    return this.node;
  }
}
