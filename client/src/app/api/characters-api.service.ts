import {Injectable} from '@angular/core';

import {HttpClient} from "@angular/common/http";

@Injectable()
export class CharactersApiService {

  constructor(private http: HttpClient) {
  }

  public findConnectedUserCharacters() {
    return this.http.get<Character[]>('/api/v1/characters').toPromise();
  }

  public getCharacter(id: number) {
    return this.http.get<Character>(`/api/v1/characters/${id}`).toPromise();
  }
}

export class Character {
  constructor(
    public id: number,
    public userId: number,
    public name: string,
    public rpgType: string
  ){}

  public static emptyCharacter() {
    return new Character(null, null, null, 'DARK_HERESY_2')
  }
}
