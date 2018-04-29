import {Injectable} from '@angular/core';

import {HttpClient} from "@angular/common/http";

@Injectable()
export class SecurityService {

  constructor(private http: HttpClient) {
  }

  static auth: any = {};

  public isAuthenticated() : boolean {
    return false;
  }

  public getUserInfo(): Promise<UserInfo> {
    return this.http.get<UserInfo>("/api/v1/account").toPromise();
  }

  public login() {

  }

  public logout() {

  }
}

export class UserInfo {
  constructor(public authenticated: boolean,
              public username: string,
              public roles: string[]) {
  }
}
