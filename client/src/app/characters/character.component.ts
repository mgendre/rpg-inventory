import {Component, OnDestroy, OnInit} from '@angular/core';
import {Character} from '../api/characters-api.service';
import {CharacterDataStoreService} from "./character-datastore";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'rpgi-character',
  templateUrl: './character.component.html',
  styleUrls: []
})
export class CharacterComponent implements OnInit, OnDestroy {

  character: Character = null;

  private routeSubscription: Subscription = null;
  private storeSubscription: Subscription = null;

  constructor(
    private route: ActivatedRoute,
    private characterDataStore: CharacterDataStoreService
  ){}

  ngOnInit(): void {
    this.storeSubscription = this.characterDataStore.getCharacterStore().subscribe((chr) => {
      this.character = null;
      if (chr) {
        this.character = chr.character;
      }
    });
    this.routeSubscription = this.route.params.subscribe(params => {
      if (params.id) {
        this.characterDataStore.loadCharacter(params.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.storeSubscription.unsubscribe();
  }
}
