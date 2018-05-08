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

    Promise.all([
      this.charactersApi.get(id).then((char) => {
        newChar.character = char;
      }),
      this.charactersApi.getInventory(id).then((inventory) => {
        newChar.inventory = inventory;
      }),
      this.charactersApi.getSheet(id).then((sheet) => {
        newChar.sheet = sheet;
      })
    ]).then(() => {
      this.characterStore.next(newChar);
    });
  }

  public saveInventory(inventory: any) {
    return this.charactersApi.saveInventory(this.characterId, inventory).then((inventory) => {
      const chr = this.characterStore.getValue();
      chr.inventory = inventory;
      this.characterStore.next(chr);
    });
  }

  public saveSheet(sheet: any) {
    return this.charactersApi.saveSheet(this.characterId, sheet).then((sheet) => {
      const chr = this.characterStore.getValue();
      chr.sheet = sheet;
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
  public sheet: any = null;
}
