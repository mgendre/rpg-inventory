import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {RouterModule} from "@angular/router";
import {LOGIN_ROUTE} from "./login.route";
import {AppCommonModule} from "../app-common-module";

@NgModule({
  imports: [
    RouterModule.forRoot([LOGIN_ROUTE], {useHash: true}),
    AppCommonModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {

}
