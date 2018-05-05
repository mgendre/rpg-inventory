import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Character} from "../../api/characters-api.service";
import {CharacterDataStoreService} from "../character-datastore";
import * as _ from "lodash";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'rpgi-character-inventory',
  templateUrl: './character.inventory.component.html',
  styleUrls: ['character.inventory.scss']
})
export class CharacterInventoryComponent implements OnInit, OnDestroy {

  character: Character = null;

  private storeSubscription: Subscription = null;

  private idCounter = 1000;

  constructor(
    private characterDataStore: CharacterDataStoreService,
    private elementRef: ElementRef,
    private modalService: NgbModal
  ) {
  }

  // -------------------------------------------------------------------------------------------------------------------
  // ACTIONS
  // -------------------------------------------------------------------------------------------------------------------

  // STORAGE MANAGEMENT

  storageName: string;
  addStorage(modal) {
    this.storageName = null;
    this.modalService.open(modal).result.then(() => {
      this.inventoryUiData.categories.push({
        id: 'location-' + (++this.idCounter),
        type: 'location',
        label: this.storageName,
        categories: [],
        items: []
      });
    });
  }
  editStorage(modal, item) {
    this.storageName = item.label;
    this.modalService.open(modal).result.then(() => {
      item.label = this.storageName;
    });
  }
  deleteStorage(item) {
    const idx = _.findIndex(this.inventoryUiData.categories, {id: item.id});
    if (idx >= 0) {
      this.inventoryUiData.categories.splice(idx, 1);
    }
  }

  // CATEGORY MANAGEMENT

  categoryName: string;
  addCategory(modal, storage) {
    this.categoryName = null;
    this.modalService.open(modal).result.then(() => {
      storage.categories.push({
        id: 'category-' + (++this.idCounter),
        type: 'category',
        label: this.categoryName,
        categories: [],
        items: []
      });
    });
  }
  editCategory(modal, storage, item) {
    this.categoryName = item.label;
    this.modalService.open(modal).result.then(() => {
      item.label = this.categoryName;
    });
  }
  deleteCategory(storage, item) {
    const idx = _.findIndex(storage.categories, {id: item.id});
    if (idx >= 0) {
      storage.categories.splice(idx, 1);
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // DRAG AND DROP SUPPORT
  // -------------------------------------------------------------------------------------------------------------------

  private rebuildHierarchy() {
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

  private rebuildInventoryHierarchy(elementByIds, idsHierarchy, parentElement)  {
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

  private inventoryElementToMap(inventoryElement, map) {
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

  private getInventoryIdsHierarchy(element: any) {
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
            label: 'SUper item',
            weight: 0.5,
            reference: 'p123',
            comments: 'pen 5, reliable',
            count: 3
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
  public weight: number;
  public comments: string;
  public reference: string;
  public count: number;
}
