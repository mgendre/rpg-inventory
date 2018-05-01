import {HttpClientModule} from "@angular/common/http";
import {SecurityService} from "./security.service";
import {NgModule} from "@angular/core";
import {AuthenticationGuard} from "./authentication-guard.service";
import {SecuredDirective} from "./secured.directive";

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [
    SecuredDirective
  ],
  exports: [
    SecuredDirective
  ],
  providers: [
    SecurityService,
    AuthenticationGuard
  ]
})
export class SecurityModule {

}
