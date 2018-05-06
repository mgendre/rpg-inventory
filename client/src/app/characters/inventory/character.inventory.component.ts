import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Character} from "../../api/characters-api.service";
import {CharacterDataStoreService} from "../character-datastore";
import * as _ from "lodash";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CharacterInventoryItemEditComponent} from "./character.inventory-item-edit.component";
import {InventoryItem} from "./inventory-data";

@Component({
  selector: 'rpgi-character-inventory',
  templateUrl: './character.inventory.component.html',
  styleUrls: ['character.inventory.scss']
})
export class CharacterInventoryComponent implements OnInit, OnDestroy {

  character: Character = null;
  inventoryUiData = null;
  editMode = false;

  private storeSubscription: Subscription = null;
  private idCounter = 1000;
  private originalInventory = null;

  constructor(
    private characterDataStore: CharacterDataStoreService,
    private elementRef: ElementRef,
    private modalService: NgbModal
  ) {
  }


  // -------------------------------------------------------------------------------------------------------------------
  // SAVE AND GET
  // -------------------------------------------------------------------------------------------------------------------

  private toServerItem(item) {
    return {
      label: item.label,
      reference: item.reference,
      comments: item.command,
      weight: item.weight,
      count: item.count
    };
  }

  private toServerRepresentation(inventory) {
    const serverData = {
      categories: []
    };
    inventory.categories.forEach((storage) => {
      const serverStorage = {
        items: [],
        categories: [],
        label: storage.label
      };
      serverData.categories.push(serverStorage);
      storage.items.forEach((item) => {
        serverStorage.items.push(this.toServerItem(item));
      });
      storage.categories.forEach((category) => {
        const serverCategory = {
          items: [],
          label: category.label
        };
        serverStorage.categories.push(serverCategory);
        category.items.forEach((item) => {
          serverCategory.items.push(this.toServerItem(item));
        });
      });
    });
    return serverData;
  }

  private fromServerRepresentation(serverInventory) {
    const inventory = {
      type: 'root',
      id: 'element-root',
      categories: []
    };

    if(serverInventory.inventory && serverInventory.inventory.categories) {
      serverInventory.inventory.categories.forEach((serverStorage) => {
        const storage = {
          label: serverStorage.label,
          items: [],
          categories: [],
          type: 'location',
          id: 'location-' + (++this.idCounter)
        };
        inventory.categories.push(storage);

        if(serverStorage.items) {
          serverStorage.items.forEach((serverItem) => {
            serverItem.id = 'item-' + (++this.idCounter);
            serverItem.type = 'item';
            storage.items.push(serverItem);
          });
        }
        if (serverStorage.categories) {
          serverStorage.categories.forEach((serverCategory) => {
            const category = {
              label: serverCategory.label,
              items: [],
              categories: [],
              type: 'category',
              id: 'category-' + (++this.idCounter)
            };
            storage.categories.push(category);

            if(serverCategory.items) {
              serverCategory.items.forEach((serverItem) => {
                serverItem.id = 'item-' + (++this.idCounter);
                serverItem.type = 'item';
                category.items.push(serverItem);
              });
            }
          });
        }
      })
    }
    return inventory;
  }

  save() {
    const serverData = this.toServerRepresentation(this.inventoryUiData);
    this.characterDataStore.saveInventory({
      id: this.originalInventory ? this.originalInventory.id : null,
      inventory: serverData
    }).then(() => {
      this.editMode = false;
    });
  }

  cancel() {
    this.inventoryUiData = this.fromServerRepresentation({... this.originalInventory});
    this.editMode = false;
    this.updateInventoryInternalData();
  }

  edit() {
    this.editMode = true;
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
      this.updateInventoryInternalData();
    });
  }
  editCategory(modal, storage, item) {
    this.categoryName = item.label;
    this.modalService.open(modal).result.then(() => {
      item.label = this.categoryName;
      this.updateInventoryInternalData();
    });
  }
  deleteCategory(storage, item) {
    const idx = _.findIndex(storage.categories, {id: item.id});
    if (idx >= 0) {
      storage.categories.splice(idx, 1);
      this.updateInventoryInternalData();
    }
  }

  // ITEM MANAGEMENT

  addItem(storage) {
    const modalRef = this.modalService.open(CharacterInventoryItemEditComponent);
    modalRef.componentInstance.item = {
      id: 'item-' + (++this.idCounter),
      label: null,
      weight: 0,
      count: 1,
      comments: null,
      type: 'item'
    };
    modalRef.result.then((item: InventoryItem) => {
      storage.items.push(item);
      this.updateInventoryInternalData();
    });
  }

  editItem(item) {
    const modalRef = this.modalService.open(CharacterInventoryItemEditComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then((edited: InventoryItem) => {
      // Merge...
      item.label = edited.label;
      item.comments = edited.comments;
      item.weight = edited.weight;
      item.count = edited.count;
      item.reference = edited.reference;
      this.updateInventoryInternalData();
    });
  }

  deleteItem(parent, item) {
    const idx = _.findIndex(parent.items, {id: item.id});
    if (idx >= 0) {
      parent.items.splice(idx, 1);
    }
    this.updateInventoryInternalData();
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

    this.updateInventoryInternalData();
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

  private updateInventoryInternalData() {
    this.computeInventoryTotalWeight(this.inventoryUiData);
  }

  private computeInventoryTotalWeight(inventory) {
    if (inventory && inventory.categories) {
      inventory.categories.forEach((storage) => {
        if (storage) {
          storage.totalWeight = 0;
          if (storage.items){
            storage.items.forEach((item) => {
              if (item.count && item.weight) {
                storage.totalWeight += item.count * item.weight;
              }
            });
          }
          if (storage.categories){
            storage.categories.forEach((cat) => {
              if (cat && cat.items) {
                cat.items.forEach((item) => {
                  if (item.count && item.weight) {
                    storage.totalWeight += item.count * item.weight;
                  }
                });
              }
            });
          }
        }
      });
    }
  }

  dragEnd() {
    setTimeout(() => {
      this.rebuildHierarchy();
    }, 100)
  }


  ngOnInit(): void {
    this.storeSubscription = this.characterDataStore.getCharacterStore().subscribe((chr) => {
      this.character = null;
      if (chr) {
        this.character = chr.character;
        this.originalInventory = _.cloneDeep(chr.inventory);

        this.inventoryUiData = this.fromServerRepresentation(_.cloneDeep(chr.inventory));
        this.updateInventoryInternalData();
      }
    });
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

}

