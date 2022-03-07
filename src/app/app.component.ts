import { Component } from '@angular/core';
import { PokemonCatalogueService } from './services/pokemon-catalogue.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pokemon-trainer';
  constructor(
    private userService: UserService,
    private pokemonCatalogueService: PokemonCatalogueService
  ) {}

  ngOnInit(): void {
    this.pokemonCatalogueService.findAllPokemon();
      
  }
}
