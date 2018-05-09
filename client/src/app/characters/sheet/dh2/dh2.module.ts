import {NgModule} from "@angular/core";
import {AppCommonModule} from "../../../app-common-module";
import {Dh2SheetComponent} from "./dh2.sheet.component";
import {Dh2SheetInfoComponent} from "./dh2.sheet.info.component";
import {Dh2SheetCharacteristicsComponent} from "./dh2.sheet.characteristics.component";
import {Dh2SheetMiscComponent} from "./dh2.sheet.misc.component";

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
    Dh2SheetInfoComponent,
    Dh2SheetCharacteristicsComponent,
    Dh2SheetMiscComponent
  ]
})
export class Dh2Module {
}

