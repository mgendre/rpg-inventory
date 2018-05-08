import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Character} from "../../api/characters-api.service";
import {CharacterDataStoreService} from "../character-datastore";
import * as _ from "lodash";

@Component({
  selector: 'rpgi-character-sheet',
  templateUrl: './character.sheet.component.html',
  styleUrls: []
})
export class CharacterSheetComponent implements OnInit, OnDestroy {

  character: Character = null;
  sheet: any = null;
  originalSheet: any = null;
  editMode = false;

  private storeSubscription: Subscription = null;

  constructor(
    private characterDataStore: CharacterDataStoreService
  ){}

  save() {
    this.characterDataStore.saveSheet(this.sheet).then(() => {
      this.editMode = false;
    });
  }

  cancel() {
    this.sheet = _.cloneDeep(this.originalSheet);
    this.editMode = false;
  }

  edit() {
    this.editMode = true;
  }

  ngOnInit(): void {
    this.storeSubscription = this.characterDataStore.getCharacterStore().subscribe((chr) => {
      this.character = null;
      if (chr) {
        this.character = chr.character;

        this.sheet = chr.sheet;
        if (!this.sheet) {
          this.sheet = {
            data: {},
            id: null
          };
          if (!this.sheet.data) {
            this.sheet.data = {};
          }
        }
        this.originalSheet = _.cloneDeep(this.sheet);
      }
    });
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
