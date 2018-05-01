import {AfterViewInit, Directive, ElementRef, HostBinding, OnDestroy, Renderer2} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {SecurityService} from "./security.service";

@Directive({
  selector: '[rpgiSecured]'
})
export class SecuredDirective implements AfterViewInit, OnDestroy {

  private authenticationSubscription: Subscription;

  @HostBinding('class.rpgi-hidden') isHidden = true;

  constructor(private securityService: SecurityService){
  }

  ngAfterViewInit(): void {
    this.authenticationSubscription = this.securityService.getUserInfo().subscribe((ctx) => {
      if(ctx) {
        this.isHidden = !ctx.authenticated;
      }
    });
  }

  ngOnDestroy(): void {
    this.authenticationSubscription.unsubscribe();
  }
}
