import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Character, CharactersApiService} from "../api/characters-api.service";

@Injectable()
export class CharacterDataStoreService {

  private characterStore = new BehaviorSubject<FullCharacter>(null);

  constructor(private charactersApi: CharactersApiService) {
  }

  public loadCharacter(id) {
    const newChar = new FullCharacter();
    this.characterStore.next(null);
    this.charactersApi.get(id).then((char) => {
      newChar.character = char;
      this.characterStore.next(newChar);
    });
  }

  public getCharacterStore(): BehaviorSubject<FullCharacter> {
    return this.characterStore;
  }
}

export class FullCharacter {
  public character: Character = null;
}
