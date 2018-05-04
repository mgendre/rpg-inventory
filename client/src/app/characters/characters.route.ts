import {Route} from "@angular/router";
import {AuthenticationGuard} from '../security/authentication-guard.service';
import {CharactersListComponent} from "./characters-list.component";
import {CharacterComponent} from "./character.component";
import {CharactersRootComponent} from "./characters-root.component";
import {CharacterEditComponent} from "./character-edit.component";
import {CharacterInventoryComponent} from "./inventory/character.inventory.component";

export const CHARACTERS_ROUTE: Route = {
  path: 'characters',
  component: CharactersRootComponent,
  canActivate: [AuthenticationGuard],
  children: [
    {
      path: '',
      component: CharactersListComponent
    },
    {
      path: 'new',
      component: CharacterEditComponent
    },
    {
      path: ':id',
      component: CharacterComponent,
      children: [
        {
          path: 'inventory',
          component: CharacterInventoryComponent
        }
      ]
    },
    {
      path: ':id/edit',
      component: CharacterEditComponent
    }
  ]
};
