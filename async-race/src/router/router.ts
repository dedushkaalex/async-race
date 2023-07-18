/* eslint-disable new-cap */
import { Store } from '@core/Store/store';
import { BaseComponent } from '@core/base-component';
import { Layout } from '@layout/layout';
import { NotFoundScreen } from '@screens/not-found/notFoundScreen';
import { ROUTES, TRoutes } from 'router/routes.data';

export class Router {
  public store = Store.getInstance();
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

  public static getCurrentPath(): string {
    return window.location.pathname;
  }

  private handleLinks(): void {
    document.addEventListener('click', (e: Event) => {
      const target = (e.target as HTMLAnchorElement).closest('a');
      if (target) {
        e.preventDefault();

        const link = target.href.match(/\/([^\\/]+)$/g) || '/';
        console.log(link);

        if (link) {
          this.navigate(link[0]);
          this.store.state.pageName = link[0];
        } else {
          this.navigate(link);
          this.store.state.pageName = link;
        }
        console.log(this.store.state);
      }
    });
  }

  private navigate(path: string): void {
    if (Router.getCurrentPath() !== path) {
      window.history.pushState({}, '', path);

      this.handleRouteChange();
    }
  }
  private handleRouteChange(): void {
    const path = Router.getCurrentPath() || '/';

    let route = this.routes.find((r) => r.path === path);

    if (!route) {
      route = {
        path: Router.getCurrentPath(),
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
      console.log(2);

      this.layout = new Layout(component.render());
      (document.getElementById('app') as HTMLDivElement).append(
        this.layout.render()
      );
    } else {
      BaseComponent.clearContent(this.layout.layoutNode);
      this.layout.layoutNode.append(component.render());
    }
  }
}
