import {NgModule} from "@angular/core";
import {APIModule} from '../api/api.module';
import {CommonModule} from '@angular/common';
import {CharactersListComponent} from './characters-list.component';
import {RouterModule} from '@angular/router';
import {CHARACTERS_ROUTE} from './characters.route';
import {CharacterComponent} from "./character.component";
import {CharactersRootComponent} from "./characters-root.component";

@NgModule({
  imports: [
    RouterModule.forRoot([CHARACTERS_ROUTE], {useHash: true}),
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
    CharactersListComponent
  ]
})
export class CharactersModule {

}
