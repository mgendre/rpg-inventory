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

library.add(fas, far);

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
    FontAwesomeModule,
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
