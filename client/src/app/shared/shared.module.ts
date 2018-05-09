import {NgModule} from '@angular/core';
import {ReadWriteComponent} from "./ui/forms/read-write.component";
import {CommonModule} from "@angular/common";
import {ReadWriteGroupComponent} from "./ui/forms/read-write-group.component";

@NgModule({
  declarations: [
    ReadWriteComponent,
    ReadWriteGroupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ReadWriteComponent,
    ReadWriteGroupComponent
  ],
  providers: [
  ]
})
export class SharedModule {
}
