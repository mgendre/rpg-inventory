import {Component, Input} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'rpgi-read-write-group',
  template: `
    <ng-content class="rpgi-read-write-group"></ng-content>`,
  styleUrls: []
})
export class ReadWriteGroupComponent {
  _writeMode: boolean = false;
  get writeMode(): boolean {
    return this._writeMode;
  }

  @Input('writeMode')
  set writeMode(value: boolean) {
    this._writeMode = value;
    this.readWriteState.next(value);
  }

  private readWriteState = new BehaviorSubject<boolean>(false);

  public getReadWriteState() {
    return this.readWriteState;
  }
}
