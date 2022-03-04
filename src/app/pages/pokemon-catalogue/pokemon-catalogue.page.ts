import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.css']
})
export class PokemonCataloguePage implements OnInit {

  get pokemon(): Pokemon[]{
    // console.log("app-pokemon-catalogue",this.pokemonCatalogueService.pokemon);
    
    return this.pokemonCatalogueService.pokemon;
  }
  get loading(): boolean {
    return this.pokemonCatalogueService.loading;

  }
  get error(): string{
    return this.pokemonCatalogueService.error;
  }
  
  constructor(private readonly pokemonCatalogueService: PokemonCatalogueService) { }

  ngOnInit(): void {
    this.pokemonCatalogueService.findAllPokemon()
  }

}
