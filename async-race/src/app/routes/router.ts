import { NotFound } from 'pages/NotFound/NotFound';
import { ROUTES, Routes } from 'shared/config/routes-data';

export class Router {
  private router = ROUTES;
  private currentRouter: Routes<keyof HTMLElementTagNameMap> | null;
  constructor() {
    this.currentRouter = null;
    this.handleRouteChange();
  }

  public getCurrentPath(): string {
    return window.location.pathname;
  }

  private handleRouteChange(): void {
    const path = this.getCurrentPath() || '/';
    let route = this.router.find((r) => r.path === path);
    if (!route) {
      route = {
        path: this.getCurrentPath(),
        component: NotFound
      };
    }
    this.currentRouter = route;
    this.render();
  }

  public render(): void {
    if (this.currentRouter === null) {
      throw new Error('error');
    }
    const { component } = this.currentRouter;
    // eslint-disable-next-line prettier/prettier
    (document.querySelector('#app') as HTMLElement).innerHTML =
      component.node.outerHTML;
  }
}
