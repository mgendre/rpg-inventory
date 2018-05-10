import {NgModule} from '@angular/core';
import {ReadWriteComponent} from "./ui/forms/read-write.component";
import {CommonModule} from "@angular/common";
import {ReadWriteGroupComponent} from "./ui/forms/read-write-group.component";
import {EditableListComponent} from "./ui/forms/editable-list.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ReadWriteComponent,
    ReadWriteGroupComponent,
    EditableListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ReadWriteComponent,
    ReadWriteGroupComponent,
    EditableListComponent
  ],
  providers: [
  ]
})
export class SharedModule {
}
