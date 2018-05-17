import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {APIModule} from "./api/api.module";
import {HttpClientModule} from "@angular/common/http";
import {NgxDnDModule} from "@swimlane/ngx-dnd";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from "./shared/shared.module";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";

import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, fab);

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    APIModule,
    HttpClientModule,
    NgxDnDModule,
    NgbModule.forRoot(),
    SharedModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    APIModule,
    HttpClientModule,
    NgxDnDModule,
    NgbModule,
    SharedModule,
    ConfirmationPopoverModule
  ],
  providers: [
  ],
  declarations: [
  ]
})
export class AppCommonModule {

}
