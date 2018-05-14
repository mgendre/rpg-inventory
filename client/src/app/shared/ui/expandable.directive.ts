import {Directive, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Directive({
  selector: '[rpgiExpandable]'
})
export class ExpandableDirective implements OnInit {
  @Input('rpgiExpandable') name;
  @Input() defaultExpanded = false;

  constructor() {
  }

  private expanded = new BehaviorSubject<boolean>(false);

  public setExpanded(expanded: boolean) {
    this.expanded.next(expanded);
    sessionStorage.setItem('rpgi-expandable-' + this.name, expanded ? 'true' : 'false');
  }

  public getExpandedSubject() {
    return this.expanded;
  }

  ngOnInit(): void {
    if (this.defaultExpanded === true) {
      this.setExpanded(this.defaultExpanded);
    }
    else if (this.name) {
      const val = sessionStorage.getItem('rpgi-expandable-' + this.name);
      if (val) {
        this.expanded.next(val === 'true');
      }
    }
  }
}
