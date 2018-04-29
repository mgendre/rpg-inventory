import {HttpClientModule} from "@angular/common/http";
import {SecurityService} from "./security.service";
import {NgModule} from "@angular/core";

@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
  ],
  providers: [
    SecurityService
  ]
})
export class SecurityModule {

}
