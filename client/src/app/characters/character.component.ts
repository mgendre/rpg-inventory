import {AfterViewInit, Component} from '@angular/core';
import {Character, CharactersApiService} from '../api/characters-api.service';

@Component({
  selector: 'rpgi-character',
  templateUrl: './character.component.html',
  styleUrls: []
})
export class CharacterComponent implements AfterViewInit {

  characters: Character[] = null;

  constructor(
    private characterApiService: CharactersApiService
  ){}

  ngAfterViewInit(): void {
    this.characterApiService.findConnectedUserCharacters().then((characters) => {
      this.characters = characters;
    });
  }
}
