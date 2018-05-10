import {Component, EventEmitter, Host, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ReadWriteGroupComponent} from "./read-write-group.component";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'rpgi-editable-list',
  template: `
    <div class="editable-list">
      <div class="item" *ngFor="let item of items; let i=index; trackBy:trackByIndex;">
        <input type="text" [(ngModel)]="items[i]" *ngIf="writeMode" class="form-control"/>
        <label class="value-label" *ngIf="!writeMode">{{item}}</label>
        <span class="remove" *ngIf="writeMode" (click)="remove(i)">X</span>
      </div>
      <button class="btn btn-primary btn-sm" (click)="add()" *ngIf="writeMode">Add</button>
    </div>`,
  styleUrls: []
})
export class EditableListComponent {

  @Input() writeMode = false;

  @Input() items: string[] = [];

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  add() {
    this.items.push('');
  }

  remove(index) {
    this.items.splice(index, 1);
  }
}
