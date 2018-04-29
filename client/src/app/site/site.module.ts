import {NgModule} from "@angular/core";
import {SiteComponent} from "./site.component";
import {RouterModule} from "@angular/router";
import {SITE_ROUTE} from "./site.route";

@NgModule({
  imports: [
    RouterModule.forRoot([SITE_ROUTE], {useHash: true})
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
