import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Character} from "../../api/characters-api.service";
import {CharacterDataStoreService} from "../character-datastore";
import {UploaderOptions, UploadFile, UploadInput, UploadOutput} from "ngx-uploader";

@Component({
  selector: 'rpgi-character-biography',
  templateUrl: './character.biography.component.html',
  styleUrls: []
})
export class CharacterBiographyComponent implements OnInit, OnDestroy {

  character: Character = null;
  options: UploaderOptions;
  files: UploadFile[] = [];
  dragOver: boolean;
  uploadInput: EventEmitter<UploadInput>;
  private storeSubscription: Subscription = null;

  constructor(
    private characterDataStore: CharacterDataStoreService
  ) {
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      // when all files added in queue
      const event: UploadInput = {
        type: 'uploadAll',
        url: '/api/v1/media/upload',
        method: 'POST'
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
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
