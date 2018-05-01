import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {SecurityService, UserInfo} from "./security.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(public securityService: SecurityService,
              public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.securityService.getSecurityContext().then((ctx: UserInfo) => {
      return ctx.authenticated
    });
  }
}
