import {Route} from "@angular/router";
import {HomeComponent} from "./home.component";
import {AuthenticationGuard} from "../security/authentication-guard.service";

export const HOME_ROUTE: Route = {
  path: 'home',
  component: HomeComponent,
  canActivate: [AuthenticationGuard]
};
