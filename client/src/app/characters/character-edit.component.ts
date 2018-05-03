import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Character, CharactersApiService} from '../api/characters-api.service';
import {Location} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'rpgi-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: []
})
export class CharacterEditComponent implements AfterViewInit, OnInit, OnDestroy {

  character: Character = null;
  isCreation = false;
  originalCharacter = null;

  private routeSubscription: Subscription = null;
  private characterId: number = null;

  constructor(
    private route: ActivatedRoute,
    private characterApiService: CharactersApiService,
    private location: Location
  ) {
  }

  private loadCharacter() {
    if (this.characterId) {
      this.characterApiService.getCharacter(this.characterId).then((char) => {
        this.character = char;
        this.originalCharacter = {...char};
      });
    }
    else {
      // Create empty character
      this.isCreation = true;
      this.character = Character.emptyCharacter();
    }
  }

  save() {
    alert('save');
  }

  cancel() {
    this.location.back();
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.characterId = null;
      if (params.id) {
        this.characterId = +params.id;
      }
      this.loadCharacter();
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
