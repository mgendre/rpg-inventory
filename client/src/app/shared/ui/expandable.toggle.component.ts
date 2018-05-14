import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {ExpandableDirective} from "./expandable.directive";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'rpgi-expandable-title',
  template: `
  <span class="expandable-title">
    <a (click)="toggle()">
      <span class="toggle-title"><ng-content></ng-content></span>
      <fa-icon [icon]="['fas', 'chevron-up']" *ngIf="expanded"></fa-icon>
      <fa-icon [icon]="['fas', 'chevron-down']" *ngIf="!expanded"></fa-icon>
    </a>
  </span>
  `
})
export class ExpandableToggleComponent implements OnInit, OnDestroy {

  @Input() name = null;
  expanded = true;

  private subscription: Subscription;

  constructor(
    private expandable: ExpandableDirective
  ) {
  }

  toggle() {
    this.expanded = !this.expanded;
    this.expandable.setExpanded(this.expanded);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.expandable.getExpandedSubject().subscribe((expanded) => {
      this.expanded = expanded;
    });
  }


}
