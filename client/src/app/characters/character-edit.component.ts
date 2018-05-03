import {Component, OnDestroy, OnInit} from '@angular/core';
import {Character, CharactersApiService} from '../api/characters-api.service';
import {Location} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'rpgi-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: []
})
export class CharacterEditComponent implements OnInit, OnDestroy {

  character: Character = null;
  isCreation = false;
  originalCharacter = null;

  characterForm: FormGroup;

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
      this.characterApiService.get(this.characterId).then((char) => {
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
    this.characterApiService.save(this.character).then(() => {
      this.cancel();
    });
  }

  cancel() {
    this.location.back();
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.characterId = null;
      if (params.id) {
        this.characterId = +params.id;
      }
      this.loadCharacter();
    });

    this.characterForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
        ])
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
