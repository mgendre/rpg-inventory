import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {CharactersApiService} from './characters-api.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [
    CharactersApiService
  ]
})
export class APIModule {

}
