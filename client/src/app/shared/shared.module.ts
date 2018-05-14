import {NgModule} from '@angular/core';
import {ReadWriteComponent} from "./ui/forms/read-write.component";
import {CommonModule} from "@angular/common";
import {ReadWriteGroupComponent} from "./ui/forms/read-write-group.component";
import {EditableListComponent} from "./ui/forms/editable-list.component";
import {FormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ExpandableDirective} from "./ui/expandable.directive";
import {ExpandableToggleComponent} from "./ui/expandable.toggle.component";
import {ExpandableContentComponent} from "./ui/expandable.content.component";

@NgModule({
  declarations: [
    ReadWriteComponent,
    ReadWriteGroupComponent,
    EditableListComponent,
    ExpandableDirective,
    ExpandableToggleComponent,
    ExpandableContentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    ReadWriteComponent,
    ReadWriteGroupComponent,
    EditableListComponent,
    ExpandableDirective,
    ExpandableToggleComponent,
    ExpandableContentComponent
  ],
  providers: [
  ]
})
export class SharedModule {
}
