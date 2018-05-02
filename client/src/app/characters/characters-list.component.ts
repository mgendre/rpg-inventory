import {AfterViewInit, Component} from '@angular/core';
import {Character, CharactersApiService} from '../api/characters-api.service';

@Component({
  selector: 'rpgi-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: []
})
export class CharactersListComponent implements AfterViewInit {

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
