import {Route} from "@angular/router";
import {SiteComponent} from "./site.component";

export const SITE_ROUTE: Route = {
  path: 'site',
  component: SiteComponent,
  data: {
    authorities: []
  }
};
