import {Component, Input} from '@angular/core';
import {InventoryItem} from "./character.inventory.component";

@Component({
  selector: 'rpgi-inventory-item',
  templateUrl: './character.inventory-item.component.html',
  styleUrls: ['character.inventory-item.component.scss']
})
export class CharacterInventoryItemComponent {
  @Input()
  item: InventoryItem;
}
