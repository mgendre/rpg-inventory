import {Component, Input} from '@angular/core';

@Component({
  selector: 'rpgi-dh2-sheet-misc',
  templateUrl: './dh2.sheet.misc.component.html',
  styleUrls: []
})
export class Dh2SheetMiscComponent {
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
    if (!this._sheet.misc) {
      this._sheet.misc = {};
    }
    if (!this._sheet.misc.mentalDisorders) {
      this._sheet.misc.mentalDisorders = [];
    }
    if (!this._sheet.misc.malignances) {
      this._sheet.misc.malignances = [];
    }
    if (!this._sheet.misc.mutations) {
      this._sheet.misc.mutations = [];
    }
    if (!this._sheet.misc.aptitudes) {
      this._sheet.misc.aptitudes = [];
    }
  }
}
