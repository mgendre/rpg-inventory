import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Character} from "../../api/characters-api.service";
import {CharacterDataStoreService} from "../character-datastore";
import * as _ from "lodash";

@Component({
  selector: 'rpgi-character-inventory',
  templateUrl: './character.inventory.component.html',
  styleUrls: ['character.inventory.scss']
})
export class CharacterInventoryComponent implements OnInit, OnDestroy {

  character: Character = null;

  private storeSubscription: Subscription = null;

  structure = null;

  constructor(
    private characterDataStore: CharacterDataStoreService,
    private elementRef: ElementRef
  ) {
  }

  // -------------------------------------------------------------------------------------------------------------------
  // DRAG AND DROP SUPPORT
  // -------------------------------------------------------------------------------------------------------------------

  rebuildHierarchy() {
    const inventoryCopy = {... this.inventoryUiData};
    const elementByIds = {};
    const hierarchy = this.getInventoryIdsHierarchy(this.elementRef.nativeElement.querySelector('.element-root'));
    this.inventoryElementToMap(inventoryCopy, elementByIds);

    // Remove children of all elements.. Children will be reset !
    _.forIn(elementByIds, (value) => {
      value.categories = [];
      value.items = [];
    });

    this.rebuildInventoryHierarchy(elementByIds, hierarchy, inventoryCopy);

    this.inventoryUiData = inventoryCopy;
  }

  rebuildInventoryHierarchy(elementByIds, idsHierarchy, parentElement)  {
    if (idsHierarchy) {
      let currentElement = parentElement;
      if (idsHierarchy.id) {
        // We found an element...
        const childId = idsHierarchy.id;
        currentElement = elementByIds[childId];
        if(parentElement) {
          if (currentElement.type === 'item') {
            parentElement.items.push(currentElement);
          }
          else {
            parentElement.categories.push(currentElement);
          }
        }
      }
      if (idsHierarchy.children) {
        idsHierarchy.children.forEach((childHierarchy) => {
          this.rebuildInventoryHierarchy(elementByIds, childHierarchy, currentElement);
        });
      }
    }
  }

  inventoryElementToMap(inventoryElement, map) {
    if (inventoryElement) {
      map[inventoryElement.id] = inventoryElement;
      if (inventoryElement.categories) {
        inventoryElement.categories.forEach((cat) => {
          this.inventoryElementToMap(cat, map);
        });
      }
      if (inventoryElement.items) {
        inventoryElement.items.forEach((item) => {
          this.inventoryElementToMap(item, map);
        });
      }
    }
  }

  getInventoryIdsHierarchy(element: any) {
    let id = null;
    let children = [];
    if (element.classList.contains('inventory-element')) {
      id = element.id;
    }
    if(element.children) {
      Array.from(element.children).forEach((child) => {
        children.push(this.getInventoryIdsHierarchy(child));
      });
    }
    return {
      id,
      children
    };
  }

  dragEnd() {
    setTimeout(() => {
      this.rebuildHierarchy();
    }, 10)
  }


  ngOnInit(): void {
    this.storeSubscription = this.characterDataStore.getCharacterStore().subscribe((chr) => {
      this.character = null;
      if (chr) {
        this.character = chr.character;
      }
    });
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }




  inventoryUiData = {
    type: 'root',
    id: 'element-root',
    categories: [
      {
        label: 'Character',
        type: 'location',
        id: 'location-1',
        categories: [
          {
            label: 'Fusil de sniper',
            type: 'category',
            id: 'cat-1',
            items: [
              {
                type: 'item',
                id: 'item-1',
                label: 'Fusil de sniper, qualité normale'
              },
              {
                id: 'item-2',
                type: 'item',
                label: 'Munitions sniper'
              }
            ]
          },
          {
            label: 'Fusil de combat',
            type: 'category',
            id: 'category-2',
            items: [
              {
                type: 'item',
                id: 'item-3',
                label: 'Fusil de combat, qualité normale'
              },
              {
                type: 'item',
                id: 'item-4',
                label: 'Munitions combat'
              }
            ]
          }
        ],
        items: [
          {
            type: 'item',
            id: 'item-5',
            label: 'un item de fou'
          }
        ]
      },
      {
        label: 'Bag',
        type: 'location',
        id: 'location-2',
        categories: [
          {
            label: 'Bolt',
            type: 'category',
            id: 'category-3',
            items: [
              {
                type: 'item',
                id: 'item-6',
                label: 'Pistolet Bolter'
              },
              {
                type: 'item',
                id: 'item-7',
                label: 'Munitions bolt'
              }
            ]
          }
        ],
        items: [
          {
            type: 'item',
            id: 'item-8',
            label: 'SUper item'
          }
        ]
      }
    ]
  };
}

export class InventoryElement {
  public id: number;
  public label: string;
  public categories: InventoryElement[];
  public items: InventoryItem[];
}

export class InventoryItem extends InventoryElement {

}
