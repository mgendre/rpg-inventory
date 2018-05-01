import {HttpClientModule} from "@angular/common/http";
import {SecurityService} from "./security.service";
import {NgModule} from "@angular/core";
import {AuthenticationGuard} from "./authentication-guard.service";

@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
  ],
  providers: [
    SecurityService,
    AuthenticationGuard
  ]
})
export class SecurityModule {

}
