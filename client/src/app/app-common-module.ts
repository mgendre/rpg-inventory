import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {APIModule} from "./api/api.module";
import {HttpClientModule} from "@angular/common/http";
import {NgxDnDModule} from "@swimlane/ngx-dnd";

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule,
    APIModule,
    HttpClientModule,
    NgxDnDModule
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule,
    APIModule,
    HttpClientModule,
    NgxDnDModule
  ],
  providers: [
  ],
  declarations: [
  ]
})
export class AppCommonModule {

}
