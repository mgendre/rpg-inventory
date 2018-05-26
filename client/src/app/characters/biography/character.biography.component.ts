import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Character} from "../../api/characters-api.service";
import {CharacterDataStoreService} from "../character-datastore";
import * as _ from "lodash";
import {LoaderService} from "../../shared/ui/loader/loader.service";

@Component({
  selector: 'rpgi-character-biography',
  templateUrl: './character.biography.component.html',
  styleUrls: ['./character.biography.component.scss']
})
export class CharacterBiographyComponent implements OnInit, OnDestroy {

  character: Character = null;
  bio: any = null;
  originalBio: any = null;
  editMode = false;

  private storeSubscription: Subscription = null;

  constructor(
    private characterDataStore: CharacterDataStoreService,
    private loaderService: LoaderService
  ){}

  save() {
    this.loaderService.setLoading(true);
    this.characterDataStore.saveBiography(this.bio).then(() => {
      this.editMode = false;
      this.loaderService.setLoading(false);
    }).catch(() => {
      this.loaderService.setLoading(false);
    });
  }

  cancel() {
    this.bio = _.cloneDeep(this.originalBio);
    this.editMode = false;
  }

  edit() {
    this.editMode = true;
  }

  portraitUploaded(media) {
    this.bio.portraitMediaId = media.id;
  }

  pictureUploaded(media) {
    this.bio.pictureMediaId = media.id;
  }

  ngOnInit(): void {
    this.storeSubscription = this.characterDataStore.getCharacterStore().subscribe((chr) => {
      this.character = null;
      if (chr) {
        this.character = chr.character;

        this.bio = chr.biography;
        if (!this.bio) {
          this.bio = {};
        }

        this.originalBio = _.cloneDeep(this.bio);
      }
    });
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
