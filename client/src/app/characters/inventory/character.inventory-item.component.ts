import {Component, Input} from '@angular/core';
import {InventoryItem} from "./inventory-data";

@Component({
  selector: 'rpgi-inventory-item',
  templateUrl: './character.inventory-item.component.html',
  styleUrls: ['character.inventory.scss']
})
export class CharacterInventoryItemComponent {
  @Input()
  item: InventoryItem;
}
