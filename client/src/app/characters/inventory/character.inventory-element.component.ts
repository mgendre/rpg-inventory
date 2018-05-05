import {Component, Input} from '@angular/core';

@Component({
  selector: 'rpgi-inventory-element',
  templateUrl: './character.inventory-element.component.html',
  styleUrls: ['character.inventory.scss']
})
export class CharacterInventoryElementComponent {
  @Input('element-data')
  elementData = null;

}
