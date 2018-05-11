import {Component, Input} from '@angular/core';

@Component({
  selector: 'rpgi-dh2-sheet-defence',
  templateUrl: './dh2.sheet.defence.component.html',
  styleUrls: ['dh2.sheet.defence.component.scss']
})
export class Dh2SheetDefenceComponent {
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
    if (!this._sheet.defence) {
      this._sheet.defence = {
      };
    }
  }
}
