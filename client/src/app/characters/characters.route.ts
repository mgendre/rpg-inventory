import {Route} from "@angular/router";
import {AuthenticationGuard} from '../security/authentication-guard.service';
import {CharactersListComponent} from "./characters-list.component";
import {CharacterComponent} from "./character.component";
import {CharactersRootComponent} from "./characters-root.component";

export const CHARACTERS_ROUTE: Route = {
  path: 'characters',
  component: CharactersRootComponent,
  canActivate: [AuthenticationGuard],
  children: [
    {
      path: 'list',
      component: CharactersListComponent
    },
    {
      path: ':id',
      component: CharacterComponent
    }
  ]
};
