import {NgModule} from "@angular/core";
import {APIModule} from '../api/api.module';
import {CommonModule} from '@angular/common';
import {CharactersListComponent} from './characters-list.component';
import {RouterModule} from '@angular/router';
import {CHARACTERS_ROUTE} from './characters.route';
import {CharacterComponent} from "./character.component";
import {CharactersRootComponent} from "./characters-root.component";
import {CharacterEditComponent} from "./character-edit.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    RouterModule.forRoot([CHARACTERS_ROUTE], {useHash: true}),
    ReactiveFormsModule,
    CommonModule,
    APIModule
  ],
  exports: [
  ],
  providers: [
  ],
  declarations: [
    CharactersRootComponent,
    CharacterComponent,
    CharactersListComponent,
    CharacterEditComponent
  ]
})
export class CharactersModule {

}
