import {Injectable, OnDestroy, OnInit} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Router} from '@angular/router';

@Injectable()
export class SecurityService {

  private securityUpdaterTimeout = null;

  constructor(private http: HttpClient,
              private router: Router) {
    this.keepSecurityUpToDate();
  }

  private authentication = new BehaviorSubject<UserInfo>(null);
  private authenticationSet = false;


  public getUserInfo(): Observable<UserInfo> {
    return this.authentication;
  }

  public login() {
    this.router.navigate(['login']);
  }

  public logout() {
    this.http.get<UserInfo>("/api/v1/account/logout").toPromise().then(() => {
      this.loadSecurity();
      this.router.navigate(['site']);
    });
  }

  public getSecurityContext() {
    return new Promise((resolve) => {
      if (this.authenticationSet) {
        resolve(this.authentication.getValue());
      }
      else {
        const subscription = this.authentication.subscribe((val) => {
          if (this.authenticationSet) {
            resolve(val);
            subscription.unsubscribe();
          }
        });
      }
    });
  }

  private loadSecurity() {
    return this.http.get<UserInfo>("/api/v1/account").toPromise().then((account) => {
      if (!this.authenticationSet) {
        this.authenticationSet = true;
        this.authentication.next(account);
      }
      else {
        // We must make a diff between existing and new state...
        const wasAuthenticated = this.authentication.getValue().authenticated;
        if (wasAuthenticated !== account.authenticated) {
          if (wasAuthenticated && !account.authenticated) {
            this.login();
          }
          this.authentication.next(account);
        }
      }
      return account;
    });
  }

  private keepSecurityUpToDate() {
    const timeoutMs = 10000;
    this.loadSecurity().then(() => {
      this.securityUpdaterTimeout = setTimeout(() => {
        this.keepSecurityUpToDate();
      }, timeoutMs)
    }).catch(() => {
      this.securityUpdaterTimeout = setTimeout(() => {
        this.keepSecurityUpToDate();
      }, timeoutMs)
    });
  };

}
export class UserInfo {
  constructor(public authenticated: boolean,
              public username: string,
              public roles: string[]) {
  }
}
