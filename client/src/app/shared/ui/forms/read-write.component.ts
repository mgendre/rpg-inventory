import {Component, Host, Input, OnDestroy, OnInit} from '@angular/core';
import {ReadWriteGroupComponent} from "./read-write-group.component";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'rpgi-read-write',
  template: `
    <div class="rpgi-read-write">
      <ng-content class="write" *ngIf="writeMode"></ng-content>
      <div class="read value-label" *ngIf="!writeMode">{{readOnlyValue}}</div>
    </div>`,
  styleUrls: []
})
export class ReadWriteComponent implements OnInit, OnDestroy {
  writeMode = false;

  @Input()
  readOnlyValue: any;

  private subscription: Subscription = null;

  constructor(
    private group: ReadWriteGroupComponent
  ) {}

  ngOnInit(): void {
    this.subscription = this.group.getReadWriteState().subscribe((writeMode) => {
      this.writeMode = writeMode;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
