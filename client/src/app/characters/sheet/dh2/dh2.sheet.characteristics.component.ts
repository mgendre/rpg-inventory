import {Component, Input} from '@angular/core';

@Component({
  selector: 'rpgi-dh2-sheet-characteristics',
  templateUrl: './dh2.sheet.characteristics.component.html',
  styleUrls: []
})
export class Dh2SheetCharacteristicsComponent {
  @Input()
  sheet: any;
}
