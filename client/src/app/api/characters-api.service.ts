import {Injectable} from '@angular/core';

import {HttpClient} from "@angular/common/http";

@Injectable()
export class CharactersApiService {

  constructor(private http: HttpClient) {
  }

  public findConnectedUserCharacters() {
    return this.http.get<Character[]>('/api/v1/characters').toPromise();
  }
}

export class Character {
  constructor(
    public id: number,
    public userId: number,
    public name: string
  ){}
}
