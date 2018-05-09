import {Component, Input} from '@angular/core';

@Component({
  selector: 'rpgi-dh2-sheet-info',
  templateUrl: './dh2.sheet.info.component.html',
  styleUrls: []
})
export class Dh2SheetInfoComponent {
  @Input()
  sheet: any;

  @Input()
  character: any;
}
