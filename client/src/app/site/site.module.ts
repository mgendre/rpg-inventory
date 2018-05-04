import {NgModule} from "@angular/core";
import {SiteComponent} from "./site.component";
import {RouterModule} from "@angular/router";
import {SITE_ROUTE} from "./site.route";
import {AppCommonModule} from "../app-common-module";

@NgModule({
  imports: [
    RouterModule.forRoot([SITE_ROUTE], {useHash: true}),
    AppCommonModule
  ],
  exports: [
  ],
  providers: [
  ],
  declarations: [
    SiteComponent
  ]
})
export class SiteModule {

}
