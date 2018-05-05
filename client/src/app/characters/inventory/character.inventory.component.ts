import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Character} from "../../api/characters-api.service";
import {CharacterDataStoreService} from "../character-datastore";

@Component({
  selector: 'rpgi-character-inventory',
  templateUrl: './character.inventory.component.html',
  styleUrls: ['character.inventory.scss']
})
export class CharacterInventoryComponent implements OnInit, OnDestroy {

  character: Character = null;
  inventoryUiData = {
    type: 'root',
    categories: [
      {
        label: 'Character',
        type: 'location',
        categories: [
          {
            label: 'Fusil de sniper',
            type: 'category',
            items: [
              {
                type: 'item',
                label: 'Fusil de sniper, qualité normale'
              },
              {
                label: 'Munitions sniper'
              }
            ]
          },
          {
            label: 'Fusil de combat',
            type: 'category',
            items: [
              {
                type: 'item',
                label: 'Fusil de combat, qualité normale'
              },
              {
                type: 'item',
                label: 'Munitions combat'
              }
            ]
          }
        ],
        items: [
          {
            type: 'item',
            label: 'un item de fou'
          }
        ]
      },
      {
        label: 'Bag',
        type: 'location',
        categories: [
          {
            label: 'Bolt',
            type: 'category',
            items: [
              {
                type: 'item',
                label: 'Pistolet Bolter'
              },
              {
                label: 'Munitions bolt'
              }
            ]
          }
        ],
        items: []
      }
    ]
  };

  private storeSubscription: Subscription = null;

  constructor(
    private characterDataStore: CharacterDataStoreService
  ) {
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
}
