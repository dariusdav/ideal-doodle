import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { environment } from 'src/environments/environment';

const {apiPokemonPicture} = environment;
@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent implements OnInit {


  @Input() pokemon? : Pokemon
  
  
  public get id() : string {
    const arr = this.pokemon!!.url.split("/");
    return arr[arr.length-2];
  }
  
  public get picture() : string {
    return apiPokemonPicture + this.id + ".png";
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
