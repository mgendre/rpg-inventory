import {Route} from "@angular/router";
import {AuthenticationGuard} from '../security/authentication-guard.service';
import {CharactersListComponent} from "./characters-list.component";
import {CharacterComponent} from "./character.component";
import {CharactersRootComponent} from "./characters-root.component";
import {CharacterEditComponent} from "./character-edit.component";
import {CharacterInventoryComponent} from "./inventory/character.inventory.component";
import {CharacterBiographyComponent} from "./biography/character.biography.component";
import {CharacterSheetComponent} from "./sheet/character.sheet.component";
import {CharacterStoryComponent} from "./story/character.story.component";

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
          path: 'biography',
          component: CharacterBiographyComponent
        },
        {
          path: 'inventory',
          component: CharacterInventoryComponent
        },
        {
          path: 'sheet',
          component: CharacterSheetComponent
        },
        {
          path: 'story',
          component: CharacterStoryComponent
        }
      ]
    },
    {
      path: ':id/edit',
      component: CharacterEditComponent
    }
  ]
};
