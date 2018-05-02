import {Route} from "@angular/router";
import {CharactersComponent} from './characters.component';
import {AuthenticationGuard} from '../security/authentication-guard.service';

export const CHARACTERS_ROUTE: Route = {
  path: 'characters',
  component: CharactersComponent,
  canActivate: [AuthenticationGuard]
};
