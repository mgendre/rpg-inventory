import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {ExpandableDirective} from "./expandable.directive";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'rpgi-expandable-content',
  template: `
    <div class="expandable-content" 
                [ngClass]="{'hidden': !removeMode && !expanded}"
                *ngIf="!removeMode || expanded">
      <ng-content></ng-content>
    </div>
  `
})
export class ExpandableContentComponent implements OnInit, OnDestroy {

  expanded = true;

  @Input() removeMode = false;

  private subscription: Subscription;

  constructor(
    private expandable: ExpandableDirective
  ) {
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
