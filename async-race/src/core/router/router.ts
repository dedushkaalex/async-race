import { BaseComponent } from '@core/base-component/BaseComponent';
import { Layout } from 'components/layout/layout.component';
import { NotFound } from 'components/screens/not-found/not-found.component';

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
        console.log(target);

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
    console.log(this.getCurrentPath(), path);

    if (this.getCurrentPath() !== path) {
      window.history.pushState({}, '', path);
      console.log(window.history);

      this.handleRouteChange();
    }
  }
  private handleRouteChange(): void {
    const path = this.getCurrentPath() || '/';

    let route = this.routes.find((r) => r.path === path);
    console.log(route);

    if (!route) {
      route = {
        path: this.getCurrentPath(),
        component: NotFound
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
    console.log(component);

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
