import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SecurityModule} from "./security/security.module";
import {LoginModule} from "./login/login.module";
import {RouterModule} from "@angular/router";
import {HomeModule} from "./home/home.module";
import {APP_ROUTE} from "./app.route";
import {LayoutModule} from "./layout/layout.module";
import {SiteModule} from "./site/site.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    SiteModule,
    LayoutModule,
    LoginModule,
    HomeModule,
    SecurityModule,
    RouterModule.forRoot([APP_ROUTE], {useHash: true})
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
