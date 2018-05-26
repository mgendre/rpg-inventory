import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UploaderOptions, UploadFile, UploadInput, UploadOutput, UploadProgress} from "ngx-uploader";
import {Media} from "../../data/media";

@Component({
  selector: 'rpgi-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  options: UploaderOptions;
  files: UploadFile[] = [];
  dragOver: boolean = false;
  uploadInput: EventEmitter<UploadInput> = new EventEmitter<UploadInput>();
  loading = false;
  progress: UploadProgress;

  @Output() onUploadSuccess = new EventEmitter<Media>();

  @Input() type: String;

  private onUploadDone() {
    this.loading = false;
    this.files = [];
    this.progress = null;
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      this.loading = true;
      const event: UploadInput = {
        type: 'uploadAll',
        url: `/api/v1/media/upload/${this.type}`,
        method: 'POST'
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
      this.progress = output.file.progress;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (output.type === 'done') {
      const media = new Media();
      media.contentType = output.file.response.contentType;
      media.filename = output.file.response.filename;
      media.id = output.file.response.id;
      this.onUploadSuccess.emit(media);
      this.onUploadDone();
    } else if (output.type === 'rejected' || output.type === 'cancelled') {
      this.onUploadDone();
    }
  }
}
