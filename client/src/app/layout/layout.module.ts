import {NgModule} from "@angular/core";
import {NavigationComponent} from "./navigation.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
    FontAwesomeModule
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
