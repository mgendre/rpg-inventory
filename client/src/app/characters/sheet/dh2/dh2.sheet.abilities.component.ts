import {Component, Input} from '@angular/core';

@Component({
  selector: 'rpgi-dh2-sheet-abilities',
  templateUrl: './dh2.sheet.abilities.component.html',
  styleUrls: []
})
export class Dh2SheetAbilitiesComponent {
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
    if (!this._sheet.abilities) {
      this._sheet.abilities = {
        list: []
      };
    }
  }
}
