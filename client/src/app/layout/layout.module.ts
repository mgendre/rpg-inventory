import {NgModule} from "@angular/core";
import {NavigationComponent} from "./navigation.component";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {SecurityModule} from "../security/security.module";
import {AppCommonModule} from "../app-common-module";

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    AppCommonModule,
    SecurityModule
  ],
  exports: [
    NavigationComponent
  ],
  providers: [
  ],
  declarations: [
    NavigationComponent
  ]
})
export class LayoutModule {

}
