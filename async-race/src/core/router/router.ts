/* eslint-disable new-cap */
import { BaseComponent } from '@core/base-component/BaseComponent';
import { Layout } from '@layout/layout.component';
import { NotFoundScreen } from '@screens/not-found/notFoundScreen';

import { ROUTES, TRoutes } from './routes.data';

export class Router {
  private routes;
  private currentRoute: TRoutes | null;
  private layout: Layout | null = null;
  constructor() {
    this.routes = ROUTES;
    this.currentRoute = null;

    window.addEventListener('popstate', () => {
      this.handleRouteChange();
    });

    this.handleRouteChange();
    this.handleLinks();
  }

  public getCurrentPath(): string {
    return window.location.pathname;
  }

  private handleLinks(): void {
    document.addEventListener('click', (e: Event) => {
      const target = (e.target as HTMLAnchorElement).closest('a');
      if (target) {
        e.preventDefault();

        const link = target.href.match(/\/([^\\/]+)$/g) || '/';
        if (link) {
          this.navigate(link[0]);
        } else {
          this.navigate(link);
        }
      }
    });
  }

  private navigate(path: string): void {
    if (this.getCurrentPath() !== path) {
      window.history.pushState({}, '', path);

      this.handleRouteChange();
    }
  }
  private handleRouteChange(): void {
    const path = this.getCurrentPath() || '/';

    let route = this.routes.find((r) => r.path === path);

    if (!route) {
      route = {
        path: this.getCurrentPath(),
        component: NotFoundScreen
      };
    }
    this.currentRoute = route;
    this.render();
  }

  public render(): void {
    if (!this.currentRoute) {
      return;
    }
    const component = new this.currentRoute.component();

    if (!this.layout) {
      this.layout = new Layout(component.render());
      (document.getElementById('app') as HTMLDivElement).append(
        this.layout.render()
      );
    } else {
      BaseComponent.clear(this.layout.layoutNode);
      this.layout.layoutNode.append(component.render());
    }
  }
}
