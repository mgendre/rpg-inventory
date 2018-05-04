import {NgModule} from "@angular/core";
import {CharactersListComponent} from './characters-list.component';
import {RouterModule} from '@angular/router';
import {CHARACTERS_ROUTE} from './characters.route';
import {CharacterComponent} from "./character.component";
import {CharactersRootComponent} from "./characters-root.component";
import {CharacterEditComponent} from "./character-edit.component";
import {CharacterDataStoreService} from "./character-datastore";
import {AppCommonModule} from "../app-common-module";
import {CharacterInventoryComponent} from "./inventory/character.inventory.component";

@NgModule({
  imports: [
    RouterModule.forRoot([CHARACTERS_ROUTE], {useHash: true}),
    AppCommonModule
  ],
  exports: [
  ],
  providers: [
    CharacterDataStoreService
  ],
  declarations: [
    CharactersRootComponent,
    CharacterComponent,
    CharactersListComponent,
    CharacterEditComponent,
    CharacterInventoryComponent
  ]
})
export class CharactersModule {

}
