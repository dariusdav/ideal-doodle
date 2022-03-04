import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-catch-pokemon-button',
  templateUrl: './catch-pokemon-button.component.html',
  styleUrls: ['./catch-pokemon-button.component.css']
})
export class CatchPokemonButtonComponent implements OnInit {

  @Input() pokemonName: string ="";

  get loading(){
    return this.favoriteService.loading;
  }

  constructor(
    private readonly favoriteService: FavoriteService
  ) { }

  ngOnInit(): void {
  }

  onCatch() : void {
    this.favoriteService.addToCaught(this.pokemonName).subscribe({
      next: (response: User) =>{
        console.log("next ,", response);
        
      },
      error: (error: HttpErrorResponse) =>{
        console.log(error.message);
        
      },
    })
  }
}
