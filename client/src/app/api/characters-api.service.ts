import {Injectable} from '@angular/core';

import {HttpClient} from "@angular/common/http";

@Injectable()
export class CharactersApiService {

  constructor(private http: HttpClient) {
  }

  public findConnectedUserCharacters() {
    return this.http.get<Character[]>('/api/v1/characters').toPromise();
  }

  public get(id: number) {
    return this.http.get<Character>(`/api/v1/characters/${id}`).toPromise();
  }

  public save(character: Character): Promise<Character> {
    return this.http.post<Character>(`/api/v1/characters`, character).toPromise();
  }

  public saveInventory(characterId: number, inventory: any): Promise<any> {
    return this.http.post<any>(`/api/v1/characters/${characterId}/inventory`, inventory).toPromise();
  }

  public getInventory(characterId: number): Promise<any> {
    return this.http.get<any>(`/api/v1/characters/${characterId}/inventory`).toPromise();
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
