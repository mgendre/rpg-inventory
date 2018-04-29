import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {RouterModule} from "@angular/router";
import {HOME_ROUTE} from "./home.route";

@NgModule({
  imports: [
    RouterModule.forRoot([HOME_ROUTE], {useHash: true})
  ],
  exports: [
  ],
  providers: [
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {

}
