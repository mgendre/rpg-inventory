import {Injectable} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Router} from '@angular/router';

@Injectable()
export class SecurityService {

  constructor(private http: HttpClient,
              private router: Router) {
    this.loadSecurity();
  }

  private authentication = new BehaviorSubject<UserInfo>(null);

  static auth: any = {};

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

  private loadSecurity() {
    this.http.get<UserInfo>("/api/v1/account").toPromise().then((account) => {
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
