import {NgModule} from "@angular/core";
import {CharactersComponent} from "./characters.component";
import {APIModule} from '../api/api.module';
import {CommonModule} from '@angular/common';
import {CharactersListComponent} from './characters-list.component';
import {RouterModule} from '@angular/router';
import {CHARACTERS_ROUTE} from './characters.route';

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
    CharactersComponent,
    CharactersListComponent
  ]
})
export class CharactersModule {

}
