import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {APIModule} from "./api/api.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule,
    APIModule,
    HttpClientModule
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule,
    APIModule,
    HttpClientModule
  ],
  providers: [
  ],
  declarations: [
  ]
})
export class AppCommonModule {

}
