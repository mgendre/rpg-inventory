import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {SecurityService, UserInfo} from "../security/security.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'rpgi-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements AfterViewInit, OnDestroy {

  private securitySubscription: Subscription;

  authentication: UserInfo = null;

  constructor(
    private securityService: SecurityService
  ){}

  ngAfterViewInit(): void {
    this.securitySubscription = this.securityService.getUserInfo().subscribe((auth) => {
      this.authentication = auth;
    });
  }

  ngOnDestroy(): void {
    this.securitySubscription.unsubscribe();
  }

  public logout() {
    this.securityService.logout();
  }
}
