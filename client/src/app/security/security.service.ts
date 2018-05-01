import {Injectable} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Router} from '@angular/router';
import {reject} from "q";

@Injectable()
export class SecurityService {

  constructor(private http: HttpClient,
              private router: Router) {
    this.loadSecurity();
  }

  private authentication = new BehaviorSubject<UserInfo>(null);
  private authenticationSet = false;

  public getUserInfo(): Observable<UserInfo> {
    return this.authentication;
  }

  public login() {

  }

  public logout() {
    this.http.get<UserInfo>("/api/v1/account/logout").toPromise().then(() => {
      this.loadSecurity();
      this.router.navigate(['site']);
    });
  }

  public getSecurityContext() {
    return new Promise((resolve, reject) => {
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
    this.http.get<UserInfo>("/api/v1/account").toPromise().then((account) => {
      this.authenticationSet = true;
      this.authentication.next(account);
    });
  }
}

export class UserInfo {
  constructor(public authenticated: boolean,
              public username: string,
              public roles: string[]) {
  }
}
