import {Component, EventEmitter, Host, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ReadWriteGroupComponent} from "./read-write-group.component";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'rpgi-editable-list',
  template: `
    <div class="editable-list">
      <div class="item" *ngFor="let item of items; let i=index; trackBy:trackByIndex;">
        <input type="text" [(ngModel)]="items[i].text" *ngIf="writeMode" class="form-control"/>
        <label class="value-label" *ngIf="!writeMode">{{item.text}}</label>
        <span class="remove" *ngIf="writeMode" (click)="remove(i)">
          <fa-icon [icon]="['fas', 'minus-circle']"></fa-icon>
        </span>
      </div>
      <button class="btn btn-primary btn-sm" (click)="add()" *ngIf="writeMode">Add</button>
    </div>`,
  styleUrls: []
})
export class EditableListComponent {

  @Input() writeMode = false;

  @Input() items: any[] = [];

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  add() {
    this.items.push({text: ''});
  }

  remove(index) {
    this.items.splice(index, 1);
  }
}
