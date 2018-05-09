import {NgModule} from "@angular/core";
import {AppCommonModule} from "../../../app-common-module";
import {Dh2SheetComponent} from "./dh2.sheet.component";
import {Dh2SheetInfoComponent} from "./dh2.sheet.info.component";

@NgModule({
  imports: [
    AppCommonModule
  ],
  exports: [
    Dh2SheetComponent
  ],
  providers: [
  ],
  declarations: [
    Dh2SheetComponent,
    Dh2SheetInfoComponent
  ]
})
export class Dh2Module {
}

