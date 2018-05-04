import {NgModule} from "@angular/core";
import {NavigationComponent} from "./navigation.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {SecurityModule} from "../security/security.module";
import {AppCommonModule} from "../app-common-module";

library.add(fas, far);

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
