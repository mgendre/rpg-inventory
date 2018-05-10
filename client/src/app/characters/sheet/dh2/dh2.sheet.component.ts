import {Component, Input} from '@angular/core';

@Component({
  selector: 'rpgi-dh2-sheet',
  templateUrl: './dh2.sheet.component.html',
  styleUrls: []
})
export class Dh2SheetComponent {
  _sheet: boolean = false;
  get sheet(): any {
    return this._sheet;
  }

  @Input('sheet')
  set sheet(value: any) {
    this._sheet = value;
    this.initSheet();
  }

  @Input()
  character: any;

  @Input()
  editMode: boolean = false;

  private initSheet() {
    if (!this.sheet.info) {
      this.sheet.info = {};
    }
    if (!this.sheet.characteristics) {
      this.sheet.characteristics = {};
    }
    if (!this.sheet.misc) {
      this.sheet.misc = {};
    }
  }
}
