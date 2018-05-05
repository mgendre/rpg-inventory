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
import {CharacterBiographyComponent} from "./biography/character.biography.component";
import {CharacterStoryComponent} from "./story/character.story.component";
import {CharacterSheetComponent} from "./sheet/character.sheet.component";
import {CharacterInventoryItemComponent} from "./inventory/character.inventory-item.component";
import {CharacterInventoryItemEditComponent} from "./inventory/character.inventory-item-edit.component";

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
    CharacterInventoryComponent,
    CharacterInventoryItemComponent,
    CharacterInventoryItemEditComponent,
    CharacterBiographyComponent,
    CharacterStoryComponent,
    CharacterSheetComponent
  ],
  entryComponents: [
    CharacterInventoryItemEditComponent
  ]
})
export class CharactersModule {
}
