import {NgModule} from "@angular/core";
import {AppCommonModule} from "../../../app-common-module";
import {Dh2SheetComponent} from "./dh2.sheet.component";
import {Dh2SheetInfoComponent} from "./dh2.sheet.info.component";
import {Dh2SheetCharacteristicsComponent} from "./dh2.sheet.characteristics.component";
import {Dh2SheetMiscComponent} from "./dh2.sheet.misc.component";
import {Dh2SheetSkillsComponent, Dh2SkillComponent, Dh2SkillListComponent} from "./dh2.sheet.skills.component";
import {Dh2SheetTalentsComponent} from "./dh2.sheet.talents.component";
import {Dh2SheetAbilitiesComponent} from "./dh2.sheet.abilities.component";

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
    Dh2SheetMiscComponent,
    Dh2SheetSkillsComponent,
    Dh2SkillComponent,
    Dh2SkillListComponent,
    Dh2SheetTalentsComponent,
    Dh2SheetAbilitiesComponent
  ]
})
export class Dh2Module {
}

