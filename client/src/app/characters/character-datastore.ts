import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Character, CharactersApiService} from "../api/characters-api.service";

@Injectable()
export class CharacterDataStoreService {

  private characterStore = new BehaviorSubject<FullCharacter>(null);
  private characterId: number;

  constructor(private charactersApi: CharactersApiService) {
  }

  public loadCharacter(id) {
    const newChar = new FullCharacter();
    this.characterId = id;
    this.characterStore.next(null);
    this.charactersApi.get(id).then((char) => {
      this.charactersApi.getInventory(id).then((inventory) => {
        newChar.character = char;
        newChar.inventory = inventory;
        this.characterStore.next(newChar);
      });
    });
  }

  public saveInventory(inventory: any) {
    this.charactersApi.saveInventory(this.characterId, inventory).then((inventory) => {
      const chr = this.characterStore.getValue();
      chr.inventory = inventory;
      this.characterStore.next(chr);
    });
  }

  public getCharacterStore(): BehaviorSubject<FullCharacter> {
    return this.characterStore;
  }
}

export class FullCharacter {
  public character: Character = null;
  public inventory: any = null;
}
