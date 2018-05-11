import {Component, Input} from '@angular/core';

@Component({
  selector: 'rpgi-dh2-sheet-movement',
  templateUrl: './dh2.sheet.movement.component.html',
  styleUrls: []
})
export class Dh2SheetMovementComponent {
  _sheet: any = false;
  get sheet(): any {
    return this._sheet;
  }

  @Input('sheet')
  set sheet(value: any) {
    this._sheet = value;
    this.initSheet();
  }

  @Input() editMode = false;

  private initSheet() {
    if (!this._sheet.movement) {
      this._sheet.movement = {};
    }
  }
}
