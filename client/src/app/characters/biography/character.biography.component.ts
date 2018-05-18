import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Character} from "../../api/characters-api.service";
import {CharacterDataStoreService} from "../character-datastore";
import {UploaderOptions, UploadFile, UploadInput, UploadOutput} from "ngx-uploader";
import {Media} from "../../shared/data/media";

@Component({
  selector: 'rpgi-character-biography',
  templateUrl: './character.biography.component.html',
  styleUrls: []
})
export class CharacterBiographyComponent implements OnInit, OnDestroy {

  character: Character = null;
  private storeSubscription: Subscription = null;

  constructor(
    private characterDataStore: CharacterDataStoreService
  ) {
  }

  portraitUploaded(media: Media) {
    alert(media.id);
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
